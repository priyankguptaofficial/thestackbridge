// app/page.tsx
"use client";

import { useState } from "react";
import {
  ArrowRight, Headphones, Server, Wrench, Network, ShieldCheck, LineChart,
  Clock, Globe2, CheckCircle2, ChevronDown,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { TRIAL_COPY } from "@/lib/pricing-data";

export default function HomePage() {
  return (
    <main className="bg-background text-ink">
      <Hero />
      <Services />
      <Stats />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <CaseStudiesPreview />
      <GlobalCoverage />
      <FAQ />
      <div className="py-20">
        <CtaBand />
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-96 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, rgba(45,212,191,0.15), transparent 70%)",
        }}
      />
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Managed IT that feels like
        <br className="hidden md:block" /> an in-house team
      </h1>
      <p className="mt-5 text-muted max-w-xl mx-auto">
        Helpdesk, hardware, and strategy \u2014 bundled into plans built for teams
        from 10 to 10,000 seats. Real engineers, not a ticket queue into the
        void.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <ButtonLink href="/pricing" size="lg">
          View Pricing <ArrowRight size={16} />
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="outline">
          Book a Consultation
        </ButtonLink>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="inline-block rounded-lg border border-accent/30 bg-accent/10 px-6 py-3 text-sm text-accent max-w-xl">
          {TRIAL_COPY}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------

const SERVICES = [
  { icon: Headphones, title: "Helpdesk Support", desc: "Business-hours or 24\u00d77 coverage depending on your plan, with real response-time commitments." },
  { icon: Server, title: "Remote System Administration", desc: "Day-to-day server and workstation admin handled remotely, so nothing waits on an on-site visit." },
  { icon: Wrench, title: "Hardware & Vendor Coordination", desc: "We deal with printer vendors, ISPs, and hardware RMAs so your team doesn't have to." },
  { icon: Network, title: "Network Management", desc: "Monitoring, whitelisting, and firewall support to keep traffic where it should be." },
  { icon: ShieldCheck, title: "Microsoft 365 Administration", desc: "Mailboxes, Active Directory, and user support handled by people who live in the admin console." },
  { icon: LineChart, title: "IT Strategy & Compliance", desc: "Quarterly reviews and health checks that catch problems before they become downtime." },
];

function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center">What we handle</h2>
      <p className="mt-3 text-muted text-center max-w-xl mx-auto">
        Every plan is built from the same six pillars \u2014 which ones you get,
        and how fast we respond, scales with your plan.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-2xl border border-hairline bg-white/[0.03] p-6">
            <s.icon className="text-accent" size={22} />
            <p className="mt-3 font-semibold">{s.title}</p>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Stats strip
// ---------------------------------------------------------------------

const STATS = [
  { label: "Critical issue response (Business plan)", value: "1 hour" },
  { label: "Helpdesk coverage (Business plan)", value: "24\u00d77" },
  { label: "Countries served", value: "USA, Canada, India" },
  { label: "Risk-free trial on every plan", value: "7 days" },
];

function Stats() {
  return (
    <section className="border-y border-hairline bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-bold text-accent">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Process ("How we work") - a real sequence, so numbering earns its place
// ---------------------------------------------------------------------

const STEPS = [
  { n: "01", title: "Book a free consultation", desc: "Tell us about your team size and current IT setup." },
  { n: "02", title: "We assess your environment", desc: "We map out what's working, what's fragile, and what plan fits." },
  { n: "03", title: "Start your 7-day trial", desc: "We onboard your team and start handling tickets \u2014 risk-free." },
  { n: "04", title: "Ongoing proactive support", desc: "Health checks, strategy reviews, and a team that already knows your setup." },
];

function Process() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center">How we work</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-2xl border border-hairline bg-white/[0.03] p-6">
            <p className="text-xs font-mono text-accent">{s.n}</p>
            <p className="mt-2 font-semibold">{s.title}</p>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Why choose us
// ---------------------------------------------------------------------

const REASONS = [
  "Dedicated engineers who learn your environment, not a rotating queue",
  "Transparent, published pricing \u2014 no \u201ccall for a quote\u201d games",
  "Real response-time commitments per plan, not vague promises",
  "We coordinate hardware vendors and ISPs directly on your behalf",
];

function WhyChooseUs() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Why teams choose TheStackBridge</h2>
        <p className="mt-3 text-muted">
          Most managed IT providers optimize for ticket volume. We optimize for
          your team not thinking about IT at all.
        </p>
      </div>
      <ul className="space-y-4">
        {REASONS.map((r) => (
          <li key={r} className="flex gap-3 text-sm text-ink/80">
            <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------
// Testimonials (anonymized, consistent with case studies policy)
// ---------------------------------------------------------------------

const TESTIMONIALS = [
  { quote: "Our practice had constant downtime with VoIP. TheStackBridge's team reduced interruptions dramatically.", attribution: "Practice Manager, Healthcare Client" },
  { quote: "Their quarterly reviews caught problems before they became downtime.", attribution: "Operations Lead, Manufacturing Client" },
  { quote: "Due to client confidentiality, we've omitted specific names and details \u2014 but the response times speak for themselves.", attribution: "IT Director, Legal Client" },
];

function Testimonials() {
  return (
    <section className="border-y border-hairline bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-center">What clients say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.attribution} className="rounded-2xl border border-hairline bg-white/[0.03] p-6">
              <p className="text-sm italic text-ink/80">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-xs text-muted">\u2014 {t.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Case studies preview
// ---------------------------------------------------------------------

function CaseStudiesPreview() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold tracking-tight">Real engagements, real results</h2>
      <p className="mt-3 text-muted max-w-xl mx-auto">
        A healthcare clinic, a law firm, and a manufacturing company \u2014 see how
        each engagement played out.
      </p>
      <div className="mt-8">
        <ButtonLink href="/case-studies" variant="outline">
          View case studies <ArrowRight size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Global coverage
// ---------------------------------------------------------------------

function GlobalCoverage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="rounded-2xl border border-hairline bg-white/[0.03] p-8 md:p-10 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Globe2 className="text-accent" size={24} />
          <h2 className="mt-3 text-2xl font-bold tracking-tight">Wherever your team is</h2>
          <p className="mt-2 text-muted">
            We support clients across the USA, Canada, and India, with helpdesk
            hours built around US Pacific time.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-ink/80">
          <Clock size={18} className="text-accent shrink-0" />
          <span>Business hours: Mon\u2013Fri, 9am\u20136pm PST (24\u00d77 on the Business plan)</span>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// FAQ (accordion)
// ---------------------------------------------------------------------

const FAQS = [
  { q: "How does the 7-day free trial work?", a: "Every new subscription starts with a 7-day trial. If you cancel within that window, you won't be billed and any payment collected is fully refunded. If you don't cancel, billing starts on day 1 of your subscription." },
  { q: "What happens if I need to cancel later?", a: "Email business@thestackbridge.com any time. Cancellations after the trial follow your plan's standard billing cycle \u2014 see our Terms & Conditions." },
  { q: "Can I switch plans later?", a: "Yes \u2014 reach out to your account contact or business@thestackbridge.com and we'll prorate the change." },
  { q: "Do you support hardware, or just software?", a: "Both. Starter and Growth cover remote support and basic hardware coordination; Business and Enterprise add full hardware support including firewalls." },
  { q: "What are your support hours?", a: "Mon\u2013Fri, 9am\u20136pm PST for Starter and Growth. Business and Enterprise include 24\u00d77 helpdesk coverage." },
  { q: "How do I submit a support ticket?", a: "Use the \u201cSubmit a Support Ticket\u201d form on our Contact page, or use the chat assistant in the corner of the site \u2014 just say you need support." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight text-center">Frequently asked questions</h2>
      <div className="mt-8 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="rounded-xl border border-hairline bg-white/[0.03] overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold">{f.q}</span>
                <ChevronDown size={18} className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <p className="px-5 pb-4 text-sm text-muted">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
