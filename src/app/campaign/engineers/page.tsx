import { CampaignShell } from "@/components/campaign/CampaignShell";
import { RoleHero } from "@/components/campaign/RoleHero";
import { audiences } from "@/lib/messaging";

export default function EngineersPage() {
  return (
    <CampaignShell title="Noros for engineers">
      <RoleHero audience={audiences.engineer} />
    </CampaignShell>
  );
}
