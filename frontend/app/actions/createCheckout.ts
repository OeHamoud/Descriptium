"use client";

import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";

export default function CreatorPlanButton() {
  const handleCheckout = async () => {
    const res = await fetch("http://localhost:8000/create-checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <SignedIn>
      <Button className="w-full gradient-glow" onClick={handleCheckout}>
        Start Creator Plan
      </Button>
    </SignedIn>
  );
}
