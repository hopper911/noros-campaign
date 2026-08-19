import { CampaignShell } from "@/components/campaign/CampaignShell";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import { DashboardMetrics } from "./DashboardMetrics";

export default async function CloudWasteDashboardPage() {
  const { cloudWaste } = await getSiteContent();
  return (
    <CampaignShell title="Cloud Waste — Campaign Dashboard">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Campaign Performance Dashboard
          </p>
          <BoxedTitle size="t2" className="mt-4" lines={["Target Metrics &", "Funnel"]} />
        </Reveal>
      </GridFrame>

      <DashboardMetrics
        kpis={cloudWaste.dashboard.kpis}
        funnel={cloudWaste.dashboard.funnel}
        media={cloudWaste.media.dashboard}
      />
    </CampaignShell>
  );
}
