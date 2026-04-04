"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, useClerk } from "@clerk/nextjs";

export default function CreatorPlanButton() {
  const clerk = useClerk();

  const handleCheckout = async () => {
    if (!clerk) return;
    await clerk.redirectToCheckout({
      planId: "cplan_387WnO893KE2o0uBDpF7DbLhZrVF",
    });
  };

  return (
      <Button className="w-full gradient-glow" onClick={handleCheckout}>
        Start Creator Plan
      </Button>
  );
}
