import { CampaignShell } from "@/components/campaign/CampaignShell";
import { RoleHero } from "@/components/campaign/RoleHero";
import { audiences } from "@/lib/messaging";

export default function CfoPage() {
  return (
    <CampaignShell title="Noros for CFOs">
      <RoleHero audience={audiences.cfo} />
    </CampaignShell>
  );
}
