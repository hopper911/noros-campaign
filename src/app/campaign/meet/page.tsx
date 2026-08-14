import { CampaignShell } from "@/components/campaign/CampaignShell";
import { ProductMock } from "@/components/ui/ProductMock";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import { boxedLines } from "@/lib/site-content";
import Link from "next/link";

export default async function MeetPage() {
  const { campaignLine, product, kit } = await getSiteContent();
  return (
    <CampaignShell title="Meet Noros — landing hero">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={kit.meetImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_32%] opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <Reveal className="relative grid min-w-0 gap-8 p-5 sm:p-8 md:grid-cols-2 md:items-center md:p-10">
            <div>
              <HeaderBar />
              <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
                Meet Noros
              </p>
              <BoxedTitle
                size="t2"
                className="mt-4"
                lines={boxedLines(product.tagline)}
              />
              <p className="t6 mt-6 text-white">{campaignLine}</p>
              <p className="mt-3 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.04em] text-neue uppercase">
                Answers, anomalies, and dashboards—through conversation, grounded in your
                real multi-cloud spend.
              </p>
              <div className="accent-mint mt-8 max-w-[36rem]">
                <div className="button-rail flex h-11 items-stretch gap-1.5 rounded-[8rem] p-1 sm:h-12 sm:p-1.5">
                  <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-trial">
                    Ask Noros
                  </Link>
                  <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-demo">
                    Free Demo
                  </Link>
                </div>
              </div>
            </div>
            <ProductMock autoPlay />
          </Reveal>
        </div>
      </GridFrame>
    </CampaignShell>
  );
}
