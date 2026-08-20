import { FigmaBoards } from "@/components/admin/FigmaBoards";
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
  const { disclaimer, figmaKit } = await getSiteContent();
  return (
    <AdminShell
      title="Figma design boards"
      actions={
        <Link href="/admin" className="btn-nav">
          Back to CMS
        </Link>
      }
    >
      <FigmaBoards disclaimer={disclaimer} initialBackgrounds={figmaKit.backgrounds} />
    </AdminShell>
  );
}
