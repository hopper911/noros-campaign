import { FigmaGallery } from "@/components/campaign/FigmaGallery";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSiteContent } from "@/lib/get-site-content";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Figma boards | Admin",
  robots: { index: false, follow: false },
};

export default async function AdminFigmaPage() {
  const { disclaimer } = await getSiteContent();
  return (
    <AdminShell
      title="Figma design boards"
      actions={
        <Link href="/admin" className="btn-nav">
          Back to CMS
        </Link>
      }
    >
      <FigmaGallery disclaimer={disclaimer} />
    </AdminShell>
  );
}
