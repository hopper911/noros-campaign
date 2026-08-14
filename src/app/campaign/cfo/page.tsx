import { CampaignShell } from "@/components/campaign/CampaignShell";
import { RoleHero } from "@/components/campaign/RoleHero";
import { getSiteContent } from "@/lib/get-site-content";

export default async function CfoPage() {
  const { audiences } = await getSiteContent();
  return (
    <CampaignShell title="Noros for CFOs">
      <RoleHero audience={audiences.cfo} />
    </CampaignShell>
  );
}
