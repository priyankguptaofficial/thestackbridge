// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendPurchaseNotification } from "@/lib/email";
import { getPlanById, formatPrice } from "@/lib/pricing-data";

function generateAccountId() {
  return String(Math.floor(100 + Math.random() * 900)); // 3 digits
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { planId, billingCycle, name, company, email, phone, agreedToTerms } = body ?? {};

  const plan = getPlanById(planId);
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }
  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }
  if (!agreedToTerms) {
    return NextResponse.json(
      { error: "You must accept the Terms & Conditions to continue." },
      { status: 400 }
    );
  }

  // Simulated charge - dummy card fields are validated client-side only.
  // Swap this block for a real Stripe/PayPal call when ready, and only
  // generate/send the Account ID after that call succeeds.

  const accountId = generateAccountId();
  const price =
    billingCycle === "annual" ? `${formatPrice(plan.annualPrice)}/yr` : `${formatPrice(plan.monthlyPrice)}/mo`;

  try {
    await sendPurchaseNotification({
      planName: plan.name,
      price,
      name,
      email,
      phone,
      company,
      accountId,
    });
  } catch (err) {
    console.error("[api/checkout] email send failed", err);
  }

  return NextResponse.json({
    ok: true,
    accountId,
    planName: plan.name,
    message: `Thank you for purchasing ${plan.name}. Our team will contact you within 12 hours to confirm payment and finalize your account.`,
  });
}
