import { CampaignShell } from "@/components/campaign/CampaignShell";
import { RoleHero } from "@/components/campaign/RoleHero";
import { audiences } from "@/lib/messaging";

export default function FinopsPage() {
  return (
    <CampaignShell title="Noros for FinOps teams">
      <RoleHero audience={audiences.finops} />
    </CampaignShell>
  );
}
