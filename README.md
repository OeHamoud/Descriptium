# [Descriptium]()

![image alt](https://github.com/OeHamoud/Descriptium/blob/e5b7f395803e0f7bf9a220dee80f0baa07b599c2/main.png)

Descriptium is a fully deployed AI SaaS that automatically generates optimized video descriptions from uploaded videos. Upload a video, pick your tone and target platform, and the AI transcribes and writes a ready-to-use description in under 2 minutes.

## [⚙️ How It Works]()
- User uploads a video
- FFmpeg extracts the audio
- OpenAI Whisper transcribes it
- GPT generates a polished, platform-specific description
- User copies and publishes

Fully automated. Under 2 minutes. Works for YouTube, TikTok, Instagram, LinkedIn, and more.

## [🤑 Monetisation — Already Configured]()

Two live pricing tiers ready to take payments from day one:
- Creator Plan — €8/month (unlimited usage, 1-day free trial)
- Business/API Plan — Custom pricing (for agencies & developers)
  
## [👨‍💻 Tech Stack]()
- Frontend: Next.js 16 + TypeScript + Tailwind CSS v4
- Backend: Python FastAPI (fully async)
- Auth & Billing: Clerk (configured, plans live)
- AI: OpenAI Whisper (transcription) + GPT (description generation)
- Infrastructure: Docker + Nginx + SSL via Let's Encrypt
## [❔ How to Setup]()
### Clone the repository:
    git clone https://github.com/OeHamoud/Descriptium.git
    cd descriptium
### Setup Api Keys
there are 2 .env files that need to be setup

- app/frontend/.env

- app/backend/.env

### Build and start all services using Docker Compose:
    docker compose up -d --build
### Open your browser:
Frontend: http://localhost:3000

Backend API: http://localhost:8000

Nginx handles SSL automatically via Certbot for production domains.
## [🐳 Docker Compose Overview]()
```
services:
  backend:
    build: ./backend
    container_name: descriptium-backend
    env_file:
      - ./backend/.env
    volumes:
      - uploads_data:/app/uploads
      - audio_data:/app/audio
      - sqlite_data:/app/sqlite
    expose:
      - "8000"
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      args:
        - NEXT_PUBLIC_API_URL=https://descriptium.com/api
    container_name: descriptium-frontend
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://descriptium.com/api
    expose:
      - "3000"
    depends_on:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:1.25-alpine
    container_name: descriptium-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - certbot_www:/var/www/certbot
      - letsencrypt:/etc/letsencrypt
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    container_name: descriptium-certbot
    volumes:
      - certbot_www:/var/www/certbot
      - letsencrypt:/etc/letsencrypt
    entrypoint: >
      sh -c "trap exit TERM; while :; do certbot renew --webroot -w /var/www/certbot; sleep 12h & wait $${!}; done"

volumes:
  uploads_data:
  audio_data:
  sqlite_data:
  letsencrypt:
  certbot_www:
  ```
## Why This Is Open Source

Descriptium was originally built as a fully functional SaaS product, but for some reason i deceided to Open Source it.

This project is being released to:

- Show a real-world SaaS architecture — not a demo, but a complete, deployable system
- Provide a production-grade reference for developers building AI products

Your Dearest Arab,

OeHamoud
