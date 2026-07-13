// app/contact/page.tsx
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/button";

type Tab = "general" | "ticket";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner() {
  const params = useSearchParams();
  const initialTab: Tab = params.get("tab") === "ticket" ? "ticket" : "general";
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <main className="bg-background text-ink min-h-screen px-6 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold">Contact &amp; Support</h1>
        <p className="mt-2 text-sm text-muted">Business hours: Mon\u2013Fri, 9am\u20136pm PST</p>

        <div className="mt-6 inline-flex rounded-full border border-hairline bg-white/5 p-1">
          <button
            onClick={() => setTab("general")}
            className={`px-4 py-1.5 rounded-full text-sm transition ${tab === "general" ? "bg-accent text-background" : "text-muted"}`}
          >
            Book a Consultation
          </button>
          <button
            onClick={() => setTab("ticket")}
            className={`px-4 py-1.5 rounded-full text-sm transition ${tab === "ticket" ? "bg-accent text-background" : "text-muted"}`}
          >
            Submit a Support Ticket
          </button>
        </div>

        <div className="mt-8">{tab === "general" ? <GeneralInquiryForm /> : <SupportTicketForm />}</div>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-lg bg-white/5 border border-hairline px-4 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:border-accent/50";

function GeneralInquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "", planInterest: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
        <p className="font-semibold">You&rsquo;re all set</p>
        <p className="text-sm text-muted mt-1">We&rsquo;ve sent your request to our team and emailed you a confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className={inputClass} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className={inputClass} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className={inputClass} placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input className={inputClass} placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <select className={inputClass} value={form.planInterest} onChange={(e) => setForm({ ...form, planInterest: e.target.value })}>
        <option value="">Plan interest (optional)</option>
        <option>Starter</option>
        <option>Growth</option>
        <option>Business</option>
        <option>Enterprise</option>
      </select>
      <textarea
        className={inputClass + " min-h-[120px]"}
        placeholder="Tell us about your IT environment"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Sending\u2026" : "Book Free Consultation"}
      </Button>
    </form>
  );
}

function SupportTicketForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", callbackTime: "", issue: "" });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [ticketId, setTicketId] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.issue) {
      setError("Please fill in name, email, phone, and issue description.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append("attachment", file);

      const res = await fetch("/api/support-ticket", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTicketId(data.ticketId);
      setStatus("success");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
        <p className="font-semibold">Ticket #{ticketId} submitted</p>
        <p className="text-sm text-muted mt-1">Our support team has been notified and will call you back around your preferred time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className={inputClass} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className={inputClass} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className={inputClass} placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input
        className={inputClass}
        placeholder="Preferred callback time (e.g. Tue 2pm PST)"
        value={form.callbackTime}
        onChange={(e) => setForm({ ...form, callbackTime: e.target.value })}
      />
      <textarea
        className={inputClass + " min-h-[120px]"}
        placeholder="Describe the issue"
        value={form.issue}
        onChange={(e) => setForm({ ...form, issue: e.target.value })}
      />
      <div>
        <label className="text-xs text-muted">Attachment (optional)</label>
        <input type="file" className="block w-full text-sm text-muted mt-1" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Submitting\u2026" : "Submit Support Ticket"}
      </Button>
    </form>
  );
}
