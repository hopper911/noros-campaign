import { CampaignShell } from "@/components/campaign/CampaignShell";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import Link from "next/link";

export default async function EmailPage() {
  const { campaignLine, disclaimer, landing } = await getSiteContent();
  return (
    <CampaignShell title="Launch email">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="mx-auto max-w-xl overflow-hidden">
          <div className="relative overflow-hidden px-6 py-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={landing.heroImageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative">
              <HeaderBar />
              <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
                Launch announcement
              </p>
              <div className="mt-2 text-xl font-medium text-white">Noros</div>
            </div>
          </div>

          <div className="space-y-5 px-6 py-8 text-[15px] leading-relaxed text-neue">
            <p className="font-mono text-[11px] tracking-[0.08em] text-neue/70 uppercase">
              Subject: {campaignLine}
            </p>
            <p>Hi {"{{first_name}}"},</p>
            <p>
              Today we&apos;re introducing <strong className="text-white">Noros</strong>—the
              AI for cloud operators. Ask questions about AWS, Azure, and GCP spend in plain
              language. Get answers with reasoning, charts, and the next action.
            </p>
            <p className="text-xl font-medium tracking-tight text-white">{campaignLine}</p>
            <p>Whether you sit in finance, FinOps, or engineering:</p>
            <ul className="space-y-1 font-mono text-[11px] tracking-[0.04em] text-neue uppercase">
              <li>— CFOs get forecast confidence and savings they can defend</li>
              <li>— FinOps leaders close the anomaly → optimize loop</li>
              <li>— Engineers get resource context and recommendations fast</li>
            </ul>
            <p>
              Setup takes about five minutes. Read-only access. Answers within hours—not
              another quarter of spreadsheet archaeology.
            </p>
            <div className="accent-mint max-w-sm pt-2">
              <div className="button-rail flex h-11 items-stretch rounded-[8rem] p-1 sm:h-12 sm:p-1.5">
                <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-trial">
                  Free Demo
                </Link>
              </div>
            </div>
            <p className="text-sm">
              Or reply to this email with the cloud question you&apos;ve been meaning to ask.
            </p>
            <p>
              — The Noros launch team
              <br />
              <span className="font-mono text-[11px] text-neue/70 uppercase">
                (Portfolio simulation)
              </span>
            </p>
          </div>

          <div className="border-t border-white/10 px-6 py-4 font-mono text-[10px] leading-snug text-neue/70 uppercase">
            {disclaimer}
          </div>
        </Reveal>
      </GridFrame>
    </CampaignShell>
  );
}
