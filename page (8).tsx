// app/legal/terms/page.tsx
import LegalLayout from "@/components/legal-layout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="July 2026">
      <p>
        These Terms govern your use of TheStackBridge&rsquo;s managed IT
        services. By subscribing to a plan, you agree to the terms below.
      </p>
      <h2>7-day free trial</h2>
      <p>
        New subscriptions include a 7-day free trial. If you cancel within 7
        days of signing up, you will not be billed and any payment collected
        will be fully refunded. If you do not cancel within the trial period,
        billing begins retroactively from day 1 of your subscription.
      </p>
      <h2>Cancellations</h2>
      <p>
        You may cancel at any time by contacting business@thestackbridge.com.
        Cancellations outside the 7-day trial window are subject to our
        standard billing cycle (see your plan&rsquo;s billing terms).
      </p>
      <h2>Payments</h2>
      <p>
        Plans are billed monthly or annually depending on the option selected
        at checkout. We reserve the right to update pricing with advance
        notice to active subscribers.
      </p>
      <h2>Service scope</h2>
      <p>
        Specific services included in each plan are described on our Pricing
        page and may be updated from time to time. Enterprise plans are
        governed by a separate custom agreement.
      </p>
    </LegalLayout>
  );
}
