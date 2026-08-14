import { CampaignShell } from "@/components/campaign/CampaignShell";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { CAMPAIGN_LINE, DISCLAIMER } from "@/lib/messaging";
import Link from "next/link";

export default function AnnouncePage() {
  return (
    <CampaignShell title="Executive announcement graphic">
      <div className="grid lg:grid-cols-2">
        <GridFrame borders="trb" ink="mint" strength={40}>
          <Reveal>
            <article className="relative aspect-square overflow-hidden lg:aspect-auto lg:min-h-[28rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/north/hero.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
              <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
                <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
                  Internal · Leadership
                </p>
                <div>
                  <p className="text-mint">Noros is live</p>
                  <BoxedTitle
                    size="t2"
                    className="mt-2"
                    lines={["Ask your cloud", "what it costs—and why."]}
                  />
                  <p className="mt-4 max-w-md text-[15px] text-neue">
                    AI FinOps for finance, FinOps, and engineering—one conversation layer on
                    multi-cloud spend.
                  </p>
                </div>
                <p className="font-mono text-[10px] text-neue/70 uppercase">{DISCLAIMER}</p>
              </div>
            </article>
          </Reveal>
        </GridFrame>

        <GridFrame borders="trb" ink="mint" strength={40}>
          <Reveal delay={0.08}>
            <article className="relative min-h-[20rem] overflow-hidden lg:min-h-[28rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/north/get-started.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative flex h-full min-h-[20rem] flex-col justify-center p-6 md:min-h-[28rem] md:p-10">
                <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
                  Announcement
                </p>
                <h2 className="t2 mt-3 max-w-lg text-white">Introducing Noros</h2>
                <p className="t6 mt-3 max-w-md text-white">
                  The AI for cloud operators. {CAMPAIGN_LINE}
                </p>
                <Link href="/campaign/meet" className="btn-nav mt-6 w-fit">
                  Read the launch note
                </Link>
              </div>
            </article>
          </Reveal>
        </GridFrame>
      </div>
    </CampaignShell>
  );
}
