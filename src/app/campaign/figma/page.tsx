import { CampaignShell } from "@/components/campaign/CampaignShell";
import { FigmaGallery } from "@/components/campaign/FigmaGallery";
import { getSiteContent } from "@/lib/get-site-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Figma boards | Noros Campaign",
  description: "View-only Noros campaign design board gallery.",
};

export default async function CampaignFigmaPage() {
  const { disclaimer } = await getSiteContent();
  return (
    <CampaignShell title="Figma design boards">
      <FigmaGallery disclaimer={disclaimer} />
    </CampaignShell>
  );
}
