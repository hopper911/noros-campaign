import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminShell } from "@/components/admin/AdminShell";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin sign in | Noros campaign",
};

export default function AdminLoginPage() {
  return (
    <AdminShell title="Admin">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </AdminShell>
  );
}
