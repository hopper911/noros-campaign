import { CampaignShell } from "@/components/campaign/CampaignShell";
import { BoxedH1 } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import { boxedLines } from "@/lib/site-content";
import Link from "next/link";

export default async function EventPage() {
  const { campaignLine, disclaimer, kit, product } = await getSiteContent();
  return (
    <CampaignShell title="Event-screen concept">
      <p className="mb-6 font-mono text-[11px] tracking-[0.16em] text-neue uppercase">
        1920×1080 stage / lobby screen
      </p>
      <GridFrame borders="trb" ink="mint" strength={50}>
        <div className="relative aspect-video w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={kit.eventImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
          <Reveal className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="font-mono text-[11px] tracking-[0.2em] text-mint uppercase">Noros</p>
            <div className="mt-4">
              <BoxedH1 lines={boxedLines(campaignLine)} />
            </div>
            <p className="t6 mt-6 max-w-xl text-white">
              {product.tagline} Answers, alerts, and dashboards through conversation.
            </p>
            <div className="accent-mint mt-8 w-full max-w-[28rem]">
              <div className="button-rail flex h-11 items-stretch gap-1.5 rounded-[8rem] p-1 sm:h-12 sm:p-1.5">
                <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-trial">
                  Ask Noros
                </Link>
                <span className="hero-cta hero-cta-compact hero-cta-demo">Booth 14</span>
              </div>
            </div>
            <p className="absolute bottom-4 left-0 right-0 px-6 font-mono text-[10px] tracking-[0.06em] text-neue/50 uppercase">
              {disclaimer}
            </p>
          </Reveal>
        </div>
      </GridFrame>
      <p className="sr-only">{campaignLine}</p>
    </CampaignShell>
  );
}
