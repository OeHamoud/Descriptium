"use client";

import { SignedIn, ClerkLoaded } from "@clerk/nextjs";
import { CheckoutProvider } from "@clerk/nextjs/experimental";
import BillingForm from "./billing-client";

export default function BillingPage() {
  return (
    <CheckoutProvider planId="cplan_387WnO893KE2o0uBDpF7DbLhR" planPeriod="month">
      <ClerkLoaded>
        <SignedIn>
          <BillingForm />
        </SignedIn>
      </ClerkLoaded>
    </CheckoutProvider>
  );
}
