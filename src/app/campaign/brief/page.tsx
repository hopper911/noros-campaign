import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CAMPAIGN_LINE, DISCLAIMER, audiences } from "@/lib/messaging";

export default function BriefPage() {
  return (
    <CampaignShell title="Two-page solution brief">
      <p className="no-print mb-6 text-sm text-muted">
        Print-ready letter composition. Use browser print for PDF export.
      </p>

      <div className="space-y-8">
        {/* Page 1 */}
        <article className="kit-frame mx-auto max-w-[8.5in] overflow-x-auto bg-space-elevated p-5 sm:p-8 md:p-12 print:border-0 print:shadow-none">
          <header className="flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row">
            <div>
              <div className="font-display text-2xl text-nebula-bright">Noros</div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                Solution brief · AI FinOps Agent
              </div>
            </div>
            <div className="max-w-[14rem] text-left text-[10px] leading-snug text-muted sm:text-right">
              {DISCLAIMER}
            </div>
          </header>

          <h1 className="mt-8 font-display text-3xl leading-tight text-star md:text-4xl">
            {CAMPAIGN_LINE}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Noros is an AI-powered cloud operations assistant. Finance, FinOps, and
            engineering ask questions in plain language and get answers grounded in AWS,
            Azure, and GCP cost data—plus anomalies, savings, and dashboards that grow
            from conversation.
          </p>

          <h2 className="mt-10 text-xs uppercase tracking-[0.16em] text-nebula-bright">
            The problem
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-star/85">
            Cloud bills still arrive as exports, dashboards, and tribal knowledge. CFOs
            lack forecast confidence. FinOps rebuilds reports. Engineers dig for drivers
            instead of shipping fixes.
          </p>

          <h2 className="mt-8 text-xs uppercase tracking-[0.16em] text-nebula-bright">
            The answer
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-star/85">
            <li>· Chat with your cloud—answers with reasoning and charts</li>
            <li>· Spot spend alerts—anomalies, budgets, savings continuously</li>
            <li>· Build dashboards through conversation—pin, schedule, share</li>
          </ul>

          <p className="mt-10 text-[11px] text-muted">Page 1 of 2</p>
        </article>

        {/* Page 2 */}
        <article className="kit-frame mx-auto max-w-[8.5in] bg-space-elevated p-5 sm:p-8 md:p-12 print:border-0">
          <h2 className="text-xs uppercase tracking-[0.16em] text-nebula-bright">
            Built for three seats
          </h2>
          <div className="mt-6 grid gap-5">
            {(Object.values(audiences) as (typeof audiences)[keyof typeof audiences][]).map(
              (a) => (
                <div key={a.id} className="border-l border-nebula/40 pl-4">
                  <div className="text-sm font-semibold text-star">{a.label}</div>
                  <p className="mt-1 text-sm text-muted">{a.emphasis}</p>
                  <ul className="mt-2 space-y-1 text-xs text-star/80">
                    {a.proofPoints.map((p) => (
                      <li key={p}>· {p}</li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>

          <h2 className="mt-10 text-xs uppercase tracking-[0.16em] text-nebula-bright">
            Outcomes
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["5 min", "Typical setup"],
              ["14 days", "Trial window"],
              ["Read-only", "Cloud access"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-lg border border-border p-3 text-center">
                <div className="font-display text-xl text-nebula-bright">{v}</div>
                <div className="mt-1 text-[11px] text-muted">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-border bg-space/50 p-5">
            <div className="font-display text-lg text-star">Next step</div>
            <p className="mt-2 text-sm text-muted">
              See a 5-minute demo—or ask Noros what your cloud costs, and why.
            </p>
            <div className="mt-4 inline-flex rounded-full bg-nebula px-4 py-2 text-xs font-semibold text-white">
              Ask Noros
            </div>
          </div>

          <p className="mt-10 text-[11px] text-muted">Page 2 of 2 · {DISCLAIMER}</p>
        </article>
      </div>
    </CampaignShell>
  );
}
