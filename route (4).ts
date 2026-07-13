// app/legal/cookie-policy/page.tsx
import LegalLayout from "@/components/legal-layout";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="July 2026">
      <p>
        TheStackBridge uses cookies and similar technologies to keep the site
        working properly and to understand how visitors use it.
      </p>
      <h2>Types of cookies we use</h2>
      <p>
        <strong>Essential cookies</strong> keep core site functionality working
        (like remembering your billing cycle selection on the Pricing page).{" "}
        <strong>Analytics cookies</strong> help us understand which pages are
        useful and where visitors run into friction.
      </p>
      <h2>Managing cookies</h2>
      <p>
        Most browsers let you block or delete cookies in their settings.
        Blocking essential cookies may affect how parts of the site function.
      </p>
    </LegalLayout>
  );
}
