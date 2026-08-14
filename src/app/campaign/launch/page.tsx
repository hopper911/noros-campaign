import { CampaignShell } from "@/components/campaign/CampaignShell";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";
import { CAMPAIGN_LINE, DISCLAIMER } from "@/lib/messaging";
import Link from "next/link";

export default function LaunchPage() {
  return (
    <CampaignShell title="Product Hunt–style launch assets">
      <div className="grid lg:grid-cols-2">
        <GridFrame borders="trb" ink="mint" strength={40}>
          <Reveal className="p-5 sm:p-8 md:p-10">
            <HeaderBar />
            <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Gallery card
            </p>
            <div className="relative mt-4 aspect-[2/1] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/north/hero.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent p-5">
                <div className="text-mint">Noros</div>
                <h2 className="text-2xl font-medium tracking-tight text-white">{CAMPAIGN_LINE}</h2>
              </div>
            </div>
          </Reveal>
        </GridFrame>

        <GridFrame borders="trb" ink="mint" strength={40}>
          <Reveal className="p-5 sm:p-8 md:p-10" delay={0.08}>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Tagline cards
            </p>
            <div className="mt-4 space-y-3">
              {[
                "The AI for cloud operators.",
                "Chat with your cloud.",
                "Ask your cloud what it costs—and why.",
              ].map((t) => (
                <div
                  key={t}
                  className="border border-white/10 bg-black/40 px-4 py-3 text-lg font-medium tracking-tight text-white"
                >
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </GridFrame>

        <div className="lg:col-span-2">
          <GridFrame borders="rb" ink="mint" strength={40}>
            <Reveal className="p-5 sm:p-8 md:p-10" delay={0.12}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
                Maker comment draft
              </p>
              <BoxedTitle size="t5" className="mt-4" lines={["Noros on Product Hunt"]} />
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-neue">
                Hey PH — Noros is an AI FinOps agent: ask plain-language questions about AWS /
                Azure / GCP spend and get answers with drivers, charts, and alerts. This
                launch kit is an independent portfolio campaign exploring how the same product
                story flexes for CFOs, FinOps, and engineers.
              </p>
              <Link href="/campaign/meet" className="btn-trial mt-6">
                Free trial
              </Link>
              <p className="mt-4 font-mono text-[10px] text-neue/70 uppercase">{DISCLAIMER}</p>
            </Reveal>
          </GridFrame>
        </div>
      </div>
    </CampaignShell>
  );
}
