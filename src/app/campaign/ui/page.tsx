import { CampaignShell } from "@/components/campaign/CampaignShell";
import { ProductMock } from "@/components/ui/ProductMock";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";

export default function UIHeroPage() {
  return (
    <CampaignShell title="Product UI hero graphic">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
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
      </GridFrame>
    </CampaignShell>
  );
}
