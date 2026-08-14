import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CAMPAIGN_LINE, DISCLAIMER } from "@/lib/messaging";

export default function EventPage() {
  return (
    <CampaignShell title="Event-screen concept">
      <p className="mb-6 text-sm text-neue">
        1920×1080 stage / lobby screen. Quiet atmosphere, one message, one CTA.
      </p>
      <div className="kit-frame relative aspect-video w-full overflow-hidden constellation bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-nebula/15" />
        <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-mint">Noros</div>
          <h1 className="t2 mt-4 max-w-4xl text-white">{CAMPAIGN_LINE}</h1>
          <p className="mt-5 max-w-xl text-sm text-neue md:text-base">
            The AI for cloud operators—answers, alerts, and dashboards through conversation.
          </p>
          <div className="mt-8 rounded-full border border-mint/40 bg-mint px-6 py-2.5 text-sm font-medium text-black">
            Ask Noros · Booth 14
          </div>
          <p className="absolute bottom-4 left-0 right-0 px-6 text-[10px] text-neue/50">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </CampaignShell>
  );
}
