// app/legal/privacy-policy/page.tsx
import LegalLayout from "@/components/legal-layout";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 2026">
      <p>
        TheStackBridge (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects information you provide
        directly (name, email, phone, company) when you submit a form, book a
        consultation, or purchase a plan, as well as basic analytics data about
        how you use our site.
      </p>
      <h2>How we use information</h2>
      <p>
        We use your information to respond to inquiries, provide support,
        process plan purchases, and improve our services. We do not sell your
        personal information to third parties.
      </p>
      <h2>Analytics</h2>
      <p>
        We use standard web analytics tools to understand site traffic and
        usage patterns. This data is aggregated and not used to identify you
        individually.
      </p>
      <h2>Data retention &amp; requests</h2>
      <p>
        We retain your information for as long as needed to provide our
        services and comply with legal obligations. Contact
        business@thestackbridge.com to request access to, correction of, or
        deletion of your data.
      </p>
    </LegalLayout>
  );
}
