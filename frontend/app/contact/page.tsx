"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Video,
  Sparkles,
  Mail,
  ArrowRight,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import { useSubscription } from "@clerk/nextjs/experimental";

export default function ContactPage() {

  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { data: subscription, isLoading } = useSubscription();

  const hasCreatorPlan = subscription?.subscriptionItems?.some(
    (item) =>
      item.plan?.slug === "creator" ||
      item.plan?.name === "Creator"
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ================= HEADER ================= */}
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

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {["home", "features", "demo", "pricing"].map((link) => (
              <Link
                key={link}
                href={`#${link}`}
                className="relative text-sm font-medium text-foreground/70 hover:text-primary transition-colors
                           after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0
                           after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
            
            
              <ClerkLoaded>
                <SignedIn>
                  {hasCreatorPlan ? (
                  <Link href="/dashboard">
                    <Button size="sm" className="font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg">
                      Dashboard
                    </Button>
                  </Link>
                  ) : (
                    <Link href="/#pricing">
                      <Button size="sm" className="font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg">
                        Get Started
                      </Button>
                    </Link>
                )}
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="sm" className="font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg">
                      Get Started
                    </Button>
                  </SignInButton>
                </SignedOut>
              </ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-24 left-1/4 size-[520px] bg-primary/20 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-20 right-1/4 size-[520px] bg-secondary/20 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 size-[420px] bg-accent/15 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
              {/* Left Side */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Sparkles className="size-4" />
                  Contact Sales & Support
                </div>

                {/* TITLE (kept exactly) */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  Let’s talk{" "}
                  <span className="gradient-text">Descriptium</span>
                </h1>

                {/* Bottom text (kept exactly) */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                  Need help, want an API plan, or just have a question?
                  <br />
                  Drop us a message and we’ll reply fast ⚡
                </p>

                {/* Extra trust indicators */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-primary" />
                    Fast replies
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 text-primary" />
                    Worldwide creators
                  </div>
                </div>
              </div>

              {/* Right Side Contact Box */}
              <Card className="relative overflow-hidden border-2 border-primary/25 shadow-2xl rounded-3xl">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />

                <div className="relative p-10 md:p-14 space-y-10 text-center">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="size-24 rounded-3xl gradient-glow flex items-center justify-center shadow-xl">
                      <Mail className="size-12 text-white" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold gradient-text">
                      descriptium@gmail.com
                    </h2>
                    <p className="text-muted-foreground text-base">
                      The fastest way to reach us.
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 text-sm text-foreground/70">
                    {[
                      "Support & bug help",
                      "Business / API inquiries",
                      "Creator plan questions",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="size-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <a href="mailto:descriptium@gmail.com">
                    <Button
                      size="lg"
                      className="w-full text-lg gradient-glow font-semibold hover:opacity-90 transition-all hover:scale-[1.02] shadow-xl"
                    >
                      Contact Us by Email
                      <ArrowRight className="ml-2 size-6" />
                    </Button>
                  </a>

                  {/* Small note */}
                  <p className="text-xs text-muted-foreground">
                    We usually respond within 24 hours ⚡
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
}
