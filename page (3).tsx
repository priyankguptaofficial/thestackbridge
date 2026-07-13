// app/legal/refund-policy/page.tsx
import LegalLayout from "@/components/legal-layout";

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" updated="July 2026">
      <p>
        If you cancel within the first 7 days of service, you will receive a
        full refund. Refunds are processed automatically within 7 days of your
        cancellation request.
      </p>
      <h2>After the trial period</h2>
      <p>
        Once your 7-day trial has ended and billing has begun, our standard
        cancellation terms apply. See our{" "}
        <a href="/legal/terms" className="text-accent underline">
          Terms &amp; Conditions
        </a>{" "}
        for details on billing cycles.
      </p>
      <h2>How to request a refund</h2>
      <p>
        Email business@thestackbridge.com with your Account ID and the reason
        for cancellation. We&rsquo;ll confirm your refund status within one
        business day.
      </p>
    </LegalLayout>
  );
}
