"use client";

import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";
import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useSubscription } from "@clerk/nextjs/experimental";

export default function PrivacyPage() {
  const { data: subscription } = useSubscription();

  const hasCreatorPlan = subscription?.subscriptionItems?.some(
    (item) => item.plan?.slug === "creator" || item.plan?.name === "Creator"
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-white/70 backdrop-blur-xl">
        <div className="relative container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-10 rounded-xl gradient-glow flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Video className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text tracking-tight">
              Descriptium
            </span>
          </Link>
        
          {/* Navigation - absolutely centered */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
            {["home", "features", "demo", "pricing"].map((link) => (
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
            <ClerkLoaded>
              <SignedIn>
                {hasCreatorPlan ? (
                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg"
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/#pricing">
                    <Button
                      size="sm"
                      className="font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg"
                    >
                      Get Started
                    </Button>
                  </Link>
                )}
              </SignedIn>
              
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    size="sm"
                    className="font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg"
                  >
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
              
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* Background Glow */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-24 left-1/4 size-[500px] bg-primary/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-24 right-1/4 size-[500px] bg-secondary/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 size-[400px] bg-accent/15 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title */}
          <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 2026
            </p>
          </div>

          {/* Policy Card */}
          <div className="bg-white/80 backdrop-blur-xl border-2 border-primary/20 shadow-2xl rounded-3xl p-10 md:p-14 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            {[
              {
                title: "1. Introduction",
                text: "At Descriptium, we respect your privacy. This Privacy Policy explains how we collect, use, protect, and share information when you use our AI-powered video description platform.",
              },
              {
                title: "2. Information We Collect",
                text: "We collect only what is necessary to provide the service, including account info, uploaded content, subscription details, and basic analytics.",
              },
              {
                title: "3. How We Use Your Data",
                text: "Your information is used to generate descriptions, secure the platform, provide support, and improve performance.",
              },
              {
                title: "4. AI & Model Training Policy",
                text: "We do not sell personal data. Uploaded content may be processed to generate results, but private uploads are not used to train public AI models without consent.",
              },
              {
                title: "5. Data Retention",
                text: "Uploaded videos and outputs are stored only as long as needed. Content may be deleted automatically after processing unless saved by you.",
              },
              {
                title: "6. Third-Party Services",
                text: "We rely on trusted providers like Clerk (auth) and ClerkBilling (payments). They only access what is required to operate the service.",
              },
              {
                title: "7. Cookies & Tracking",
                text: "We use cookies for login sessions, preferences, and performance. You can disable cookies in your browser settings.",
              },
              {
                title: "8. Your Rights",
                text: "You may request access, deletion, correction, or portability of your data depending on your region (EU, UK, California).",
              },
              {
                title: "9. Updates",
                text: "We may update this Privacy Policy as laws evolve. Continued use means you accept the revised version.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="space-y-3 hover:scale-[1.01] transition-transform duration-300"
              >
                <h2 className="text-2xl font-bold text-primary">
                  {item.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}

            {/* Contact */}
            <div className="pt-6 border-t border-border/40 text-center space-y-3">
              <h2 className="text-2xl font-bold gradient-text">
                Contact Us
              </h2>
              <p className="text-muted-foreground">
                Questions about privacy? Reach us anytime:
              </p>
              <p className="font-semibold text-primary text-lg">
                descriptium@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="size-8 rounded-xl gradient-glow flex items-center justify-center">
                  <Video className="size-4 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">
                  Descriptium
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered video descriptions for modern creators
              </p>
              <p className="text-sm text-muted-foreground">
                Less time writing, More time creating
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/#demo"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Demo
                </Link>
                <Link
                  href="/#features"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Support & Contact</h4>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Email Support
              </Link>
            </div>
          </div>

          <div className="border-t border-border/40 mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2026 Descriptium. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
