"use client";

import { useCheckout, PaymentElement } from "@clerk/nextjs/experimental";

export default function BillingForm() {
  const { checkout } = useCheckout();
  const { status, start, isStarting } = checkout;

  const handleStart = async () => {
    try {
      await start();
    } catch (e) {
      console.error("Checkout start error:", e);
    }
  };

  if (status === "needs_initialization") {
    return (
      <button disabled={isStarting} onClick={handleStart}>
        {isStarting ? "Initializing..." : "Start Checkout"}
      </button>
    );
  }

  return status === "needs_confirmation" ? (
    <div>
      <PaymentElement />
    </div>
  ) : null;
}
