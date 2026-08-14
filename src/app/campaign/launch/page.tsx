import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CAMPAIGN_LINE, DISCLAIMER } from "@/lib/messaging";

export default function LaunchPage() {
  return (
    <CampaignShell title="Product Hunt–style launch assets">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="kit-frame p-6">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted">Gallery card</div>
          <div className="mt-4 aspect-[2/1] overflow-hidden rounded-xl constellation relative">
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-space via-space/40 to-transparent p-5">
              <div className="font-display text-nebula-bright">Noros</div>
              <h2 className="font-display text-2xl text-star">{CAMPAIGN_LINE}</h2>
            </div>
          </div>
        </article>

        <article className="kit-frame p-6">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted">Tagline cards</div>
          <div className="mt-4 space-y-3">
            {[
              "The AI for cloud operators.",
              "Chat with your cloud.",
              "Ask your cloud what it costs—and why.",
            ].map((t) => (
              <div
                key={t}
                className="rounded-xl border border-border bg-space/60 px-4 py-3 font-display text-lg text-star"
              >
                {t}
              </div>
            ))}
          </div>
        </article>

        <article className="kit-frame p-6 lg:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted">
            Maker comment draft
          </div>
          <p className="mt-4 text-sm leading-relaxed text-star/90">
            Hey PH — Noros is an AI FinOps agent: ask plain-language questions about AWS /
            Azure / GCP spend and get answers with drivers, charts, and alerts. This
            launch kit is an independent portfolio campaign exploring how the same product
            story flexes for CFOs, FinOps, and engineers.
          </p>
          <p className="mt-4 text-[10px] text-muted">{DISCLAIMER}</p>
        </article>
      </div>
    </CampaignShell>
  );
}
