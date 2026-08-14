import { CampaignShell } from "@/components/campaign/CampaignShell";
import { RoleHero } from "@/components/campaign/RoleHero";
import { getSiteContent } from "@/lib/get-site-content";

export default async function FinopsPage() {
  const { audiences } = await getSiteContent();
  return (
    <CampaignShell title="Noros for FinOps teams">
      <RoleHero audience={audiences.finops} />
    </CampaignShell>
  );
}
