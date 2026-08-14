import { CampaignShell } from "@/components/campaign/CampaignShell";
import { ProductMock } from "@/components/ui/ProductMock";
import { CAMPAIGN_LINE } from "@/lib/messaging";

export default function MeetPage() {
  return (
    <CampaignShell title="Meet Noros — landing hero">
      <div className="kit-frame overflow-hidden bg-black constellation">
        <div className="grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-mint">
              Meet Noros
            </p>
            <h2 className="t2 mt-3 text-white">The AI for cloud operators.</h2>
            <p className="mt-4 text-neue">{CAMPAIGN_LINE}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neue/80">
              Answers, anomalies, and dashboards—through conversation, grounded in your
              real multi-cloud spend.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="btn-primary">Ask Noros</span>
              <span className="btn-ghost border-white/25 text-white">See a 5-minute demo</span>
            </div>
          </div>
          <ProductMock />
        </div>
      </div>
    </CampaignShell>
  );
}
