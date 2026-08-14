"use client";

import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Could not sign in");
        return;
      }
      router.replace(params.get("next") || "/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <GridFrame borders="trb" ink="mint" strength={40}>
      <form onSubmit={onSubmit} className="mx-auto max-w-md p-5 sm:p-8 md:p-10">
        <HeaderBar />
        <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
          CMS
        </p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-white">Admin sign in</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-neue">
          Password-gated editor for site copy and ad images. Not linked from the public nav.
        </p>
        <label className="mt-8 block font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
          Password
          <input
            id="admin-password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "admin-login-error" : undefined}
            className="mt-2 w-full border border-white/15 bg-black px-3 py-2.5 font-sans text-[15px] tracking-normal text-white normal-case focus-visible:border-mint"
          />
        </label>
        {error ? (
          <p id="admin-login-error" role="alert" aria-live="polite" className="mt-3 text-sm text-red">
            {error}
          </p>
        ) : null}
        <button type="submit" disabled={busy || !password} className="btn-trial mt-6">
          {busy ? "Signing in…" : "Enter"}
        </button>
      </form>
    </GridFrame>
  );
}
