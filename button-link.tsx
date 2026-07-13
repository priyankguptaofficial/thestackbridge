// app/checkout/page.tsx
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getPlanById, formatPrice } from "@/lib/pricing-data";
import { Button } from "@/components/button";

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const params = useSearchParams();
  const plan = getPlanById(params.get("plan"));

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
    agreedToTerms: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [result, setResult] = useState<{ accountId: string; planName: string } | null>(null);
  const [error, setError] = useState("");

  if (!plan) {
    return (
      <main className="bg-background text-ink min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-lg">No plan selected.</p>
          <Link href="/pricing" className="text-accent underline mt-2 inline-block">
            Back to pricing
          </Link>
        </div>
      </main>
    );
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }
    if (!form.cardNumber || !form.expiry || !form.cvc) {
      setError("Please fill in the payment fields (placeholder for now).");
      return;
    }
    if (!form.agreedToTerms) {
      setError("Please accept the Terms & Conditions to continue.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan!.id,
          billingCycle: "monthly",
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          agreedToTerms: form.agreedToTerms,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult({ accountId: data.accountId, planName: data.planName });
      setStatus("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success" && result) {
    return (
      <main className="bg-background text-ink min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center rounded-2xl border border-accent/30 bg-accent/[0.06] p-8">
          <h1 className="text-2xl font-semibold">You&rsquo;re all set</h1>
          <p className="mt-3 text-ink/80">
            Thank you for purchasing <strong>{result.planName}</strong>. Our team will
            contact you within 12 hours to confirm payment and finalize your account.
          </p>
          <p className="mt-4 text-sm text-muted">
            Your Account ID is <span className="text-accent font-mono">{result.accountId}</span>
          </p>
          <p className="mt-2 text-xs text-muted">
            A confirmation email is on its way. Remember, you&rsquo;re covered by our
            7-day free trial.
          </p>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-accent text-background px-5 py-2.5 text-sm font-semibold">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const price = plan.monthlyPrice === null ? "Custom pricing" : `${formatPrice(plan.monthlyPrice)}/mo`;

  return (
    <main className="bg-background text-ink min-h-screen px-6 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-4 rounded-xl border border-hairline bg-white/[0.03] p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">{plan.name}</p>
            <p className="text-sm text-muted">{plan.tagline}</p>
          </div>
          <p className="text-lg font-semibold">{price}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-muted mb-1">Your details</legend>
            <input className={inputClass} placeholder="Full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            <input className={inputClass} placeholder="Company" value={form.company} onChange={(e) => update("company", e.target.value)} />
            <input className={inputClass} placeholder="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            <input className={inputClass} placeholder="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-muted mb-1">
              Payment <span className="opacity-60">(placeholder \u2014 no real charge yet)</span>
            </legend>
            <input className={inputClass} placeholder="Card number" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value)} />
            <div className="flex gap-3">
              <input className={inputClass + " w-1/2"} placeholder="MM/YY" value={form.expiry} onChange={(e) => update("expiry", e.target.value)} />
              <input className={inputClass + " w-1/2"} placeholder="CVC" value={form.cvc} onChange={(e) => update("cvc", e.target.value)} />
            </div>
            <input className={inputClass} placeholder="Name on card" value={form.nameOnCard} onChange={(e) => update("nameOnCard", e.target.value)} />
            <p className="text-xs text-muted">
              PayPal / credit card processing will be enabled soon. For now this
              information is not charged or stored.
            </p>
          </fieldset>

          <label className="flex items-start gap-2 text-sm text-ink/80">
            <input type="checkbox" className="mt-1" checked={form.agreedToTerms} onChange={(e) => update("agreedToTerms", e.target.checked)} />
            I agree to the{" "}
            <Link href="/legal/terms" className="text-accent underline">
              Terms &amp; Conditions
            </Link>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={status === "submitting"} className="w-full">
            {status === "submitting" ? "Processing\u2026" : `Confirm ${plan.name} plan`}
          </Button>
        </form>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-lg bg-white/5 border border-hairline px-4 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:border-accent/50";
