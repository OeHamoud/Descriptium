"use client";
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Sparkles, Zap, Target, Upload, Globe, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CreatorPlanButton from "@/components/CreatorPlanButton";
import { useSubscription } from "@clerk/nextjs/experimental";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { data: subscription, isLoading } = useSubscription();

  const hasCreatorPlan = subscription?.subscriptionItems?.some(
    (item) =>
      item.plan?.slug === "creator" ||
      item.plan?.name === "Creator"
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-white/70 backdrop-blur-xl">
        <div className="relative container mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="size-9 rounded-xl gradient-glow flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Video className="size-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text tracking-tight">Descriptium</span>
          </Link>

          {/* Nav links - absolutely centered */}
          <nav className="hidden sm:flex items-center gap-6 md:gap-8 absolute left-1/2 -translate-x-1/2">
            {["home", "features", "demo", "pricing"].map((link) => (
              <Link
                key={link}
                href={`#${link}`}
                className="relative text-xs sm:text-sm font-medium text-foreground/70 hover:text-primary transition-colors
                           after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0
                           after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3 ml-auto">
            <ClerkLoaded>
              <SignedIn>
                {hasCreatorPlan ? (
                <Link href="/dashboard">
                  <Button size="sm" className="text-xs sm:text-sm font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg px-3 sm:px-4">
                    Dashboard
                  </Button>
                </Link>
                ) : (
                  <Link href="/#pricing">
                    <Button size="sm" className="text-xs sm:text-sm font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg px-3 sm:px-4">
                      Get Started
                    </Button>
                  </Link>
              )}
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="sm" className="text-xs sm:text-sm font-semibold gradient-glow hover:opacity-90 transition-all hover:scale-[1.03] shadow-lg px-3 sm:px-4">
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT SIDE */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold border border-primary/20">
                <Sparkles className="size-3 sm:size-4" />
                AI-Powered Video descriptions
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Turn videos into <span className="gradient-text">viral-ready</span> descriptions
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                Upload your video, select your platform and tone, and let AI generate the perfect description in seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="text-sm sm:text-base w-full sm:w-auto gradient-glow">
                    <Sparkles className="mr-2 size-4" /> Start Creating Free
                  </Button>
                </Link>

                <Link href="#demo" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="text-sm sm:text-base w-full sm:w-auto bg-transparent">
                    <Play className="mr-2 size-4" /> Watch Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 pt-2 sm:pt-4 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" /> Lightning fast
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="size-4 text-primary" /> All platforms
                </div>
              </div>
            </div>

            {/* RIGHT SIDE MOCKUP */}
            <div className="relative">
              <div className="relative w-full rounded-3xl overflow-hidden p-4 sm:p-5 flex flex-col justify-center">

                {/* TOP FLOW - CENTERED */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">

                  {/* Upload */}
                  <div className="flex-1 max-w-[100px] sm:max-w-[130px] md:max-w-[160px] bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center space-y-2 sm:space-y-3">
                    <div className="mx-auto w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-primary/30 to-primary flex items-center justify-center">
                      <Upload className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base font-semibold leading-tight">Upload video</p>
                  </div>

                  <div className="text-primary text-lg sm:text-2xl md:text-3xl font-bold shrink-0">→</div>

                  {/* AI */}
                  <div className="flex-1 max-w-[100px] sm:max-w-[130px] md:max-w-[160px] bg-gradient-to-br from-primary/70 to-indigo-600 rounded-xl shadow-2xl p-4 sm:p-6 md:p-7 text-center space-y-2 sm:space-y-3 text-white">
                    <div className="mx-auto w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                      <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base font-semibold leading-tight">AI Generates</p>
                  </div>

                  <div className="text-primary text-lg sm:text-2xl md:text-3xl font-bold shrink-0">→</div>

                  {/* Viral */}
                  <div className="flex-1 max-w-[100px] sm:max-w-[130px] md:max-w-[160px] bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center space-y-2 sm:space-y-3">
                    <div className="mx-auto w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-secondary/30 to-secondary flex items-center justify-center">
                      <Target className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base font-semibold leading-tight">Viral Description</p>
                  </div>

                </div>

                <div className="border-t border-border/40 my-6 sm:my-8 md:my-10" />

                {/* Bottom Features */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm font-medium text-muted-foreground">

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <span>
                      Under <span className="text-primary font-semibold">2 min</span> turnaround
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <span>Boost engagement</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <span>Works on all platforms</span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <span>Works everywhere</span>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto px-4 py-16 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-balance">
              Everything you need to <span className="gradient-text">create amazing</span> descriptions
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge AI technology to give you professional results every time
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Zap, title: "Lightning Fast", description: "Instantly generate highly optimized, creator-ready video descriptions using cutting-edge AI.", gradient: "from-primary to-primary/70", color: "text-primary" },
              { icon: Target, title: "Platform Optimized", description: "Tailored descriptions for YouTube, Instagram, TikTok, and more with the perfect tone.", gradient: "from-secondary to-secondary/70", color: "text-secondary" },
              { icon: Sparkles, title: "AI-Powered", description: "Advanced AI ensures your descriptions are engaging, accurate, and conversion-optimized.", gradient: "from-accent to-accent/70", color: "text-accent" },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`p-6 sm:p-8 space-y-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white border-2 ${
                  hoveredFeature === index ? "border-primary" : "border-border/40"
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`size-12 sm:size-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="size-6 sm:size-8 text-white" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${feature.color}`}>{feature.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="px-4 py-16 md:py-24 lg:py-32 bg-gradient-to-b w-full">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-balance">
              See it in <span className="gradient-text">action</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/70">
              Transform your videos into viral-ready descriptions in 3 simple steps
            </p>
          </div>

          {/* Responsive video wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/33H-vAUuEV8?autoplay=0&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3"
              title="Descriptive Video Title"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-4 sm:pt-8">
            {[
              {
                step: "1",
                title: "Upload Video",
                description: "Drag & drop or select your video file",
                icon: Upload,
              },
              {
                step: "2",
                title: "Choose Settings",
                description: "Select platform, tone, and preferences",
                icon: Target,
              },
              {
                step: "3",
                title: "Get Description",
                description: "Copy optimized description instantly",
                icon: CheckCircle2,
              },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-3 sm:space-y-4">
                <div className="flex justify-center">
                  <div className="size-16 sm:size-20 rounded-2xl gradient-glow flex items-center justify-center shadow-lg">
                    <item.icon className="size-8 sm:size-10 text-white" />
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl font-bold gradient-text">{item.step}</div>
                <div className="text-base sm:text-lg font-bold text-foreground">{item.title}</div>
                <div className="text-xs sm:text-sm text-foreground/70">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mx-auto px-4 py-16 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">Choose your <span className="gradient-text"> preferred plan </span> that fits you best</h2>
            <p className="text-base sm:text-lg text-muted-foreground">Pick a plan that matches your needs and get started instantly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Creator Plan */}
            <Card className="p-6 sm:p-8 border-2 border-primary/30 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative space-y-6">
                <h3 className="text-3xl sm:text-4xl font-bold"><span className="gradient-text">Creator</span></h3>
                <div className="text-3xl sm:text-4xl font-bold">
                  €8<span className="text-base font-medium text-muted-foreground"> / month</span>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> Unlimited usage (fair-use)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> All features unlocked
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> 1-day free trial
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> Full customer support
                  </li>
                </ul>
                <CreatorPlanButton />
              </div>
            </Card>

            {/* Business / API Plan */}
            <Card className="p-6 sm:p-8 border-2 border-border/40 shadow-lg">
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl font-bold">Buisness / API</h3>
                <div className="text-2xl sm:text-3xl font-bold">Custom</div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> Custom API access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> Usage-based or flat pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" /> Custom built
                  </li>
                </ul>

                <Link href="/contact">
                  <Button variant="tertiary" className="w-full h-10 mt-1">Contact Sales</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:py-24 mt-4 sm:mt-8 mb-4 sm:mb-8">
        <Card className="max-w-4xl mx-auto p-8 sm:p-12 md:p-16 text-center relative overflow-hidden border-0">
          <div className="absolute inset-0 gradient-glow" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-balance">Ready to transform your video content?</h2>
            <p className="text-base sm:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed">Join thousands of creators who are saving time and growing their audience with AI-powered descriptions</p>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-shadow">
                <Upload className="mr-2 size-5 sm:size-7" /> Start Creating Now
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1 space-y-4">
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
              <h4 className="font-semibold text-sm sm:text-base">Product</h4>
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
              <h4 className="font-semibold text-sm sm:text-base">Legal</h4>
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
              <h4 className="font-semibold text-sm sm:text-base">Support & Contact</h4>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Email Support</Link>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm text-muted-foreground">
            © 2026 Descriptium. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
