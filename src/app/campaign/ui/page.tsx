import { CampaignShell } from "@/components/campaign/CampaignShell";
import { ProductMock } from "@/components/ui/ProductMock";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";

export default async function UIHeroPage() {
  const { kit } = await getSiteContent();
  return (
    <CampaignShell title="Product UI hero graphic">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={kit.uiImageUrl}
            alt="Noros product UI hero composition"
            className="absolute inset-0 h-full w-full object-cover object-[center_32%] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />
          <Reveal className="relative p-5 sm:p-8 md:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              Noros · live console
            </p>
            <BoxedTitle
              size="t2"
              className="mt-4"
              lines={["Chat with", "your cloud."]}
            />
            <p className="t6 mt-6 max-w-2xl text-neue">
              Original chat + chart composition for launch surfaces. Press Play demo for the
              shareholder walkthrough.
            </p>
            <div className="mt-10">
              <ProductMock autoPlay />
            </div>
            <p className="mt-10 font-mono text-[11px] tracking-[0.14em] text-neue uppercase">
              Compact variant
            </p>
            <div className="mx-auto mt-4 max-w-md">
              <ProductMock compact />
            </div>
          </Reveal>
        </div>
      </GridFrame>
    </CampaignShell>
  );
}
