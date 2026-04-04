"use client";
import Link from "next/link";
import { Video, Sparkles, Zap, Target, Upload, Globe, Play, CheckCircle2 } from "lucide-react";


export default function logo() {

return(
<header className="sticky top-0 z-50 border-b border-border/40 bg-white/70 backdrop-blur-xl">
        <div className="relative container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-40 rounded-[30%] gradient-glow flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Video className="size-20 text-white" />
            </div>
          </Link>
    </div>
</header>
)}