from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
import uuid
import asyncio
import whisper
import aiosqlite
import shutil

# ---------------- CONFIG ----------------

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DB_PATH = os.getenv("DB_PATH", "videos.db")

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not set")

client = OpenAI(api_key=OPENAI_API_KEY)

UPLOAD_DIR = "uploads"
AUDIO_DIR = "audio"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

if not shutil.which("ffmpeg"):
    raise RuntimeError("ffmpeg not found")

# ---------------- AI MODELS ----------------

whisper_model = whisper.load_model("base", device="cpu")
whisper_lock = asyncio.Semaphore(1)

# ---------------- FASTAPI ----------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # REQUIRED for browser uploads
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DATABASE ----------------

async def get_db():
    db = await aiosqlite.connect(DB_PATH)
    await db.execute("""
        CREATE TABLE IF NOT EXISTS videos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            videofilename TEXT,
            videofile TEXT,
            audiofilename TEXT,
            audiofile TEXT,
            status TEXT,
            transcript TEXT,
            final_generatedai_description TEXT
        )
    """)
    await db.commit()
    return db

# ---------------- HELPERS ----------------

async def extract_audio(video_path: str, audio_path: str):
    process = await asyncio.create_subprocess_exec(
        "ffmpeg", "-y", "-i", video_path,
        "-ac", "1", "-ar", "16000", audio_path,
        stdout=asyncio.subprocess.DEVNULL,
        stderr=asyncio.subprocess.PIPE
    )
    _, stderr = await process.communicate()
    if process.returncode != 0:
        raise RuntimeError(stderr.decode())

async def transcribe(audio_path: str) -> str:
    async with whisper_lock:
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None,
            whisper_model.transcribe,
            audio_path
        )
    return result["text"].strip()

# ---------------- AI DESCRIPTION ----------------

def generate_description_sync(prompt: str) -> str:
    response = client.responses.create(
        model="gpt-5-nano",
        input=[{"role": "user", "content": prompt}]
    )
    return response.output_text.strip() or "Description could not be generated."

async def generate_description(transcript: str, tone: str, platform: str, refinement: str = "") -> str:
    prompt = (
        f"You generate ONLY a video description. No explanations. No questions. No extra text. Generate a {tone} video description for {platform} based on this transcript:\n\n{transcript}"
    )
    if refinement:
        prompt += f"\n\nAlso apply this refinement to the description: {refinement}"

    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(None, generate_description_sync, prompt)

# ---------------- VIDEO UPLOAD ENDPOINT ----------------

@app.post("/upload")
async def upload_video(
    video: UploadFile,
    tone: str = Form(...),
    platform: str = Form(...),
    refinement: str = Form("")  # <-- optional fine-tune text
):
    video_ext = os.path.splitext(video.filename)[1]
    video_name = f"{uuid.uuid4()}{video_ext}"
    audio_name = f"{uuid.uuid4()}.wav"

    video_path = os.path.join(UPLOAD_DIR, video_name)
    audio_path = os.path.join(AUDIO_DIR, audio_name)

    db = await get_db()

    try:
        with open(video_path, "wb") as f:
            while True:
                chunk = await video.read(1024 * 1024)
                if not chunk:
                    break
                f.write(chunk)

        cursor = await db.execute(
            "INSERT INTO videos (videofilename, videofile, status) VALUES (?, ?, ?)",
            (video.filename, video_path, "UPLOADED")
        )
        video_id = cursor.lastrowid
        await db.commit()

        await extract_audio(video_path, audio_path)
        await db.execute(
            "UPDATE videos SET audiofilename=?, audiofile=?, status=? WHERE id=?",
            (audio_name, audio_path, "AUDIO_EXTRACTED", video_id)
        )
        await db.commit()

        transcript = await transcribe(audio_path)
        await db.execute(
            "UPDATE videos SET transcript=?, status=? WHERE id=?",
            (transcript, "TRANSCRIBED", video_id)
        )
        await db.commit()

        description = await generate_description(transcript, tone, platform, refinement)
        await db.execute(
            "UPDATE videos SET final_generatedai_description=?, status=? WHERE id=?",
            (description, "COMPLETED", video_id)
        )
        await db.commit()

        return {
            "video_id": video_id,
            "generated_description": description
        }

    finally:
        await db.close()
