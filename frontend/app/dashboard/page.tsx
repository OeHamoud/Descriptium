'use client'

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
  useUser,
} from "@clerk/nextjs"
import { useSubscription } from "@clerk/nextjs/experimental"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { VideoUploadForm } from "@/components/video-upload-form"
import { Video } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { isLoaded } = useUser()
  const { data: subscription, isLoading: subLoading } = useSubscription()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded || subLoading) return

    const hasCreator = subscription?.subscriptionItems?.some(
      (item) => item.plan?.slug === "creator" || item.plan?.name === "Creator"
    )

    if (!hasCreator) {
      router.replace("/#pricing")
    }
  }, [isLoaded, subLoading, subscription, router])

  if (!isLoaded || subLoading) return null

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-background">
          {/* Header */}
              <header className="sticky top-0 z-50 border-b border-border/40 bg-white/70 backdrop-blur-xl">
          <div className="relative container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="size-10 rounded-xl gradient-glow flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Video className="size-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text tracking-tight">Descriptium</span>
            </Link>
          
            {/* Navigation - absolutely centered */}
            <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
              {["home", "features", "demo"].map((link) => (
                <Link
                  key={link}
                  href={`/#${link}`}
                  className="relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors
                             after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0
                             after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              ))}
            </nav>
            
            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button size="sm" className="font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg">
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

          <main>
            <VideoUploadForm />
          </main>
        </div>
      {/* Footer */}
      <footer className="border-t border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="size-8 rounded-xl gradient-glow flex items-center justify-center">
                  <Video className="size-4 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">Descriptium</span>
              </Link>
              <p className="text-sm text-muted-foreground">AI-powered video descriptions for modern creators</p>
              <p className="text-sm text-muted-foreground">Less time writing, More time creating</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#demo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Demo
                </Link>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
                
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Support & Contact</h4>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Email Support</Link>
            </div>
          </div>

          <div className="border-t border-border/40 mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2026 Descriptium. All rights reserved.
          </div>
        </div>
      </footer>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
    </>
  )
}
