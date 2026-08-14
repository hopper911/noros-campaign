import { CampaignShell } from "@/components/campaign/CampaignShell";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import { boxedLines } from "@/lib/site-content";
import Link from "next/link";

export default async function BriefPage() {
  const { campaignLine, disclaimer, audiences, kit } = await getSiteContent();
  return (
    <CampaignShell title="Two-page solution brief">
      <p className="no-print mb-6 font-mono text-[11px] tracking-[0.14em] text-neue uppercase">
        Print-ready letter · browser print for PDF
      </p>

      <div className="space-y-8">
        <GridFrame borders="trb" ink="mint" strength={40}>
          <Reveal className="mx-auto max-w-[8.5in] p-5 sm:p-8 md:p-12 print:border-0">
            <HeaderBar />
            <div className="relative mt-8 aspect-[16/7] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={kit.briefImageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <header className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row">
              <div>
                <div className="text-2xl font-medium text-white">Noros</div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
                  Solution brief · AI FinOps Agent
                </div>
              </div>
              <div className="max-w-[14rem] text-left font-mono text-[10px] leading-snug text-neue/70 uppercase sm:text-right">
                {disclaimer}
              </div>
            </header>

            <BoxedTitle
              size="t2"
              className="mt-8"
              lines={boxedLines(campaignLine)}
            />
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neue">
              Noros is an AI-powered cloud operations assistant. Finance, FinOps, and
              engineering ask questions in plain language and get answers grounded in AWS,
              Azure, and GCP cost data—plus anomalies, savings, and dashboards that grow
              from conversation.
            </p>

            <h2 className="mt-10 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              The problem
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">
              Cloud bills still arrive as exports, dashboards, and tribal knowledge. CFOs
              lack forecast confidence. FinOps rebuilds reports. Engineers dig for drivers
              instead of shipping fixes.
            </p>

            <h2 className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              The answer
            </h2>
            <ul className="mt-3 space-y-2 font-mono text-[11px] tracking-[0.04em] text-neue uppercase">
              <li>— Chat with your cloud—answers with reasoning and charts</li>
              <li>— Spot spend alerts—anomalies, budgets, savings continuously</li>
              <li>— Build dashboards through conversation—pin, schedule, share</li>
            </ul>

            <p className="mt-10 font-mono text-[11px] text-neue/70 uppercase">Page 1 of 2</p>
          </Reveal>
        </GridFrame>

        <GridFrame borders="trb" ink="mint" strength={40}>
          <Reveal className="mx-auto max-w-[8.5in] p-5 sm:p-8 md:p-12 print:border-0">
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              Built for three seats
            </h2>
            <div className="mt-6 grid gap-5">
              {Object.values(audiences).map(
                (a) => (
                  <div key={a.id} className="border-l border-mint/40 pl-4">
                    <div className="text-sm font-medium text-white">{a.label}</div>
                    <p className="mt-1 text-[15px] text-neue">{a.emphasis}</p>
                    <ul className="mt-2 space-y-1 font-mono text-[11px] tracking-[0.04em] text-neue uppercase">
                      {a.proofPoints.map((p) => (
                        <li key={p}>— {p}</li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </div>

            <h2 className="mt-10 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              Outcomes
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["5 min", "Typical setup"],
                ["14 days", "Trial window"],
                ["Read-only", "Cloud access"],
              ].map(([v, l]) => (
                <div key={l} className="border border-white/10 px-3 py-4 text-center">
                  <div className="text-xl font-medium text-mint">{v}</div>
                  <div className="mt-1 font-mono text-[11px] text-neue uppercase">{l}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-white/10 p-5">
              <div className="text-lg font-medium text-white">Next step</div>
              <p className="mt-2 text-[15px] text-neue">
                See a 5-minute demo—or ask Noros what your cloud costs, and why. {campaignLine}
              </p>
              <Link href="/campaign/meet" className="btn-trial mt-4">
                Ask Noros
              </Link>
            </div>

            <p className="mt-10 font-mono text-[11px] text-neue/70 uppercase">
              Page 2 of 2 · {disclaimer}
            </p>
          </Reveal>
        </GridFrame>
      </div>
    </CampaignShell>
  );
}
