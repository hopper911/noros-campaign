import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSiteContent } from "@/lib/get-site-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin CMS | Noros campaign",
};

export default async function AdminPage() {
  const content = await getSiteContent();
  return (
    <AdminShell title="Admin CMS">
      <AdminDashboard initial={content} />
    </AdminShell>
  );
}
