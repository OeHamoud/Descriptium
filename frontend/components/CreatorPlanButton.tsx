"use client";

import { SignedIn, ClerkLoaded, SignedOut, SignInButton, useClerk } from "@clerk/nextjs";
import { CheckoutButton, CheckoutProvider } from "@clerk/nextjs/experimental";
import BillingForm from "../app/billing/billing-client"; // import the reusable component
import { Button } from "@/components/ui/button";


export default function CreatorPlanButton() {
  return (
    
    <ClerkLoaded>
      <SignedIn>
        <CheckoutButton
        planId="cplan_387WnO893KE2o0uBDpF7DbLhZrV"
        planPeriod="month"
      >
        <Button className="w-full bg-gradient-to-r from-indigo-500 to-violet-500
                           text-white shadow-lg
                           hover:from-indigo-600 hover:to-violet-600
                           hover:shadow-xl 
                           transition duration-300 h-10"
              >
          Try Creator Plan
        </Button>
      </CheckoutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
            <Button
                type="button"
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-500
                           text-white shadow-lg
                           hover:from-indigo-600 hover:to-violet-600
                           hover:shadow-xl 
                           transition duration-300 h-10"
              >
                Sign in to subscribe
              </Button>
        </SignInButton>
      </SignedOut>
    </ClerkLoaded>
  );
}
