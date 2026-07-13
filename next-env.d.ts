// app/case-studies/page.tsx

const CASE_STUDIES = [
  {
    client: "Regional dental clinic group",
    industry: "Healthcare",
    problem: "Frequent VoIP dropouts and slow ticket turnaround were costing the front desk hours every week.",
    solution: "Migrated to a monitored network stack, added proactive health checks, and assigned a dedicated engineer for hardware issues.",
    metric: { label: "Fewer call interruptions", value: 90 },
    quote: "Our practice had constant downtime with VoIP. TheStackBridge's team reduced interruptions dramatically.",
    quoteAttribution: "\u2014 Practice Manager, Healthcare Client",
  },
  {
    client: "Multi-location law firm",
    industry: "Legal",
    problem: "Document systems across three offices weren't in sync, and support requests took days to resolve.",
    solution: "Standardized endpoint management across all sites and moved to 24/7 helpdesk coverage with 1-hour critical response.",
    metric: { label: "Faster ticket resolution", value: 75 },
    quote: "Due to client confidentiality, we've omitted specific names and details.",
    quoteAttribution: "\u2014 IT Director, Legal Client",
  },
  {
    client: "Local manufacturing company",
    industry: "Manufacturing",
    problem: "Aging on-prem servers and no formal patch schedule left the shop floor exposed to outages.",
    solution: "Introduced monthly system health checks, quarterly IT strategy reviews, and coordinated hardware vendor support.",
    metric: { label: "Uptime improvement", value: 40 },
    quote: "Their quarterly reviews caught problems before they became downtime.",
    quoteAttribution: "\u2014 Operations Lead, Manufacturing Client",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="bg-background text-ink min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">Case studies</h1>
        <p className="mt-3 text-muted max-w-2xl">
          Due to client confidentiality, names and identifying details have been
          generalized. Results shown are illustrative of typical engagements.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.client} className="rounded-2xl border border-hairline bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-wide text-accent">{cs.industry}</p>
              <h3 className="text-lg font-semibold mt-1">{cs.client}</h3>

              <p className="mt-4 text-sm text-ink/80">
                <span className="text-muted">Problem: </span>
                {cs.problem}
              </p>
              <p className="mt-2 text-sm text-ink/80">
                <span className="text-muted">Solution: </span>
                {cs.solution}
              </p>

              <div className="mt-5">
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>{cs.metric.label}</span>
                  <span>{cs.metric.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${cs.metric.value}%` }} />
                </div>
              </div>

              <blockquote className="mt-5 text-sm italic text-ink/80 border-l-2 border-accent/50 pl-3">
                &ldquo;{cs.quote}&rdquo;
                <footer className="mt-1 text-xs not-italic text-muted">{cs.quoteAttribution}</footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
