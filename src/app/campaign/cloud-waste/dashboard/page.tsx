import { CampaignShell } from "@/components/campaign/CampaignShell";
import { getSiteContent } from "@/lib/get-site-content";
import { DashboardMetrics } from "./DashboardMetrics";

export default async function CloudWasteDashboardPage() {
  const { cloudWaste } = await getSiteContent();
  return (
    <CampaignShell title="Cloud Waste — Campaign Dashboard">
      <DashboardMetrics
        kpis={cloudWaste.dashboard.kpis}
        funnel={cloudWaste.dashboard.funnel}
        media={cloudWaste.media.dashboard}
      />
    </CampaignShell>
  );
}
