// components/footer.tsx
import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/cookie-policy", label: "Cookie Policy" },
  { href: "/legal/refund-policy", label: "Refund Policy" },
];

const SITE_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact & Support" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-bold text-ink text-lg">
            TheStack<span className="text-accent">Bridge</span>
          </p>
          <p className="mt-3 text-sm text-muted max-w-sm">
            Managed IT support for growing teams \u2014 helpdesk, hardware, and
            strategy in one plan.
          </p>
          <p className="mt-4 text-sm text-muted">Serving clients across the USA, Canada &amp; India</p>
          <p className="text-sm text-muted">Support hours: Mon\u2013Fri, 9am\u20136pm PST</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink mb-3">Site</p>
          <ul className="space-y-2">
            {SITE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-accent transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink mb-3">Legal</p>
          <ul className="space-y-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-accent transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} TheStackBridge. All rights reserved.</p>
          <p>business@thestackbridge.com \u00b7 support@thestackbridge.com</p>
        </div>
      </div>
    </footer>
  );
}
