import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CAMPAIGN_LINE, DISCLAIMER } from "@/lib/messaging";

export default function AnnouncePage() {
  return (
    <CampaignShell title="Executive announcement graphic">
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="kit-frame aspect-square constellation relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-nebula/10" />
          <div className="relative flex h-full flex-col justify-between p-8">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Internal · Leadership
            </div>
            <div>
              <div className="font-display text-nebula-bright">Noros is live</div>
              <h2 className="mt-2 font-display text-3xl leading-tight text-star">
                {CAMPAIGN_LINE}
              </h2>
              <p className="mt-3 text-sm text-muted">
                AI FinOps for finance, FinOps, and engineering—one conversation layer on
                multi-cloud spend.
              </p>
            </div>
            <p className="text-[10px] text-muted/70">{DISCLAIMER}</p>
          </div>
        </article>

        <article className="kit-frame aspect-[1.91/1] constellation relative overflow-hidden lg:aspect-auto lg:min-h-[320px]">
          <div className="absolute inset-0 bg-gradient-to-r from-space via-space/70 to-nebula/20" />
          <div className="relative flex h-full flex-col justify-center p-8 md:p-10">
            <div className="text-[11px] uppercase tracking-[0.16em] text-nebula-bright">
              Announcement
            </div>
            <h2 className="mt-3 max-w-lg font-display text-3xl text-star md:text-4xl">
              Introducing Noros
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              The AI for cloud operators. Ask what it costs—and why.
            </p>
            <div className="mt-6 inline-flex w-fit rounded-full bg-nebula px-4 py-2 text-xs font-semibold text-white">
              Read the launch note
            </div>
          </div>
        </article>
      </div>
    </CampaignShell>
  );
}
