"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Loader2, Copy, CheckCircle2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type ProcessingState = "idle" | "uploading" | "processing" | "success" | "error"
type Tab = "description"

export function VideoUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [tone, setTone] = useState("Humorous")
  const [platform, setPlatform] = useState("YouTube")
  const [state, setState] = useState<ProcessingState>("idle")

  const [generatedDescription, setGeneratedDescription] = useState("")
  const [refinedDescription, setRefinedDescription] = useState("")

  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("description")
  const { toast } = useToast()

  const isUploading = state === "uploading"
  const isProcessing = state === "uploading" || state === "processing"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    if (selected.size > 250 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Select a video < 250MB",
        variant: "destructive",
      })
      return
    }
    setFile(selected)
  }

  const handleSubmit = async () => {
    if (!file) return
    setState("uploading")

    try {
      const formData = new FormData()
      formData.append("video", file)
      formData.append("tone", tone)
      formData.append("platform", platform)

      // Send user refinements only if any
      if (refinedDescription.trim()) {
        formData.append("refinement", refinedDescription.trim())
      }

      const api =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

      setState("processing")
      const response = await fetch(`${api}/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()

      setGeneratedDescription(data.generated_description)
      // Do NOT auto-fill refinedDescription
      setState("success")
      toast({ title: "Success", description: "Description generated!" })
    } catch {
      setState("error")
      toast({
        title: "Error",
        description: "Processing failed",
        variant: "destructive",
      })
    }
  }

  // ✅ FIXED: Copy should copy generatedDescription, not refinedDescription
  const handleCopy = async () => {
    if (!generatedDescription) return
    await navigator.clipboard.writeText(generatedDescription)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: "Copied!", description: "Description copied to clipboard" })
  }

  return (
    <section className="relative w-full min-h-screen py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 ">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid md:grid-cols-2 gap-8 h-full">
          {/* Left Pane - Upload */}
          <Card className="p-12 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all flex flex-col justify-between h-full">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center md:text-left animate-in fade-in slide-in-from-bottom-4">
                AI Video Description Generator
              </h2>
              <p className="text-center md:text-left text-muted-foreground animate-in fade-in slide-in-from-bottom-4 delay-100">
                Upload your video, select platform and tone, and get an
                AI-generated description instantly.
              </p>

              <div
                className={`relative border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-300 ${
                  isUploading
                    ? "opacity-70"
                    : "hover:scale-105 hover:shadow-lg"
                }`}
              >
                <Upload className="size-16 text-primary mb-6 animate-pulse" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                {file ? (
                  <span className="font-semibold text-lg animate-in fade-in">
                    {file.name}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-lg animate-pulse">
                    Click or drag to upload a video
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="p-5 rounded-xl border border-border text-lg font-medium hover:border-primary transition-colors"
                >
                  {["YouTube", "Instagram", "TikTok", "Twitter", "LinkedIn"].map(
                    (p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="p-5 rounded-xl border border-border text-lg font-medium hover:border-primary transition-colors"
                >
                  {[
                    "Humorous",
                    "Educational",
                    "Serious",
                    "Motivational",
                    "Casual",
                    "Professional",
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fine-tune textarea — stays independent */}
            <Textarea
              value={refinedDescription}
              onChange={(e) => setRefinedDescription(e.target.value)}
              placeholder="Fine tune your description here..."
              className="resize-none"
            />

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!file || isProcessing}
              className="w-full text-lg py-5 gradient-glow hover:opacity-90 transition-opacity flex justify-center items-center gap-3"
            >
              {isProcessing ? (
                <Loader2 className="animate-spin size-6" />
              ) : (
                <Upload className="size-6" />
              )}
              {state === "uploading"
                ? "Uploading..."
                : state === "processing"
                ? "Grab a coffee while we process your video ☕🎬..."
                : "Generate Description"}
            </Button>
          </Card>

          {/* Right Pane */}
          <Card className="p-8 md:p-12 bg-white/90 shadow-2xl rounded-3xl flex flex-col h-full animate-in fade-in slide-in-from-right duration-500">
            <div className="flex border-b border-border/50 mb-4">
              <button
                className={`flex-1 py-3 text-center font-semibold transition-all ${
                  activeTab === "description"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
            </div>

            {activeTab === "description" && (
              <div className=" flex-col h-[500px]">
                {/* ✅ FIXED: Output shows generatedDescription */}
                <Textarea
                  value={
                    generatedDescription ||
                    "Your generated description will appear here..."
                  }
                  readOnly
                  className="flex-1 font-mono text-base resize-none animate-in fade-in h-full"
                />

                <Button
                  variant="tertiary"
                  className="w-full mt-5 hover:scale-105 transition-transform"
                  onClick={handleCopy}
                  disabled={!generatedDescription}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="size-8" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-8" /> Copy
                    </>
                  )}
                </Button>
              </div>
            )}

            <Button
              variant="tertiary"
              className="w-full mt-13 hover:scale-105 transition-transform"
              onClick={() => {
                setFile(null)
                setTone("Humorous")
                setPlatform("YouTube")
                setGeneratedDescription("")
                setRefinedDescription("")
                setState("idle")
              }}
            >
              Reset
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
