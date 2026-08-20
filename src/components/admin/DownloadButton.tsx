"use client";

import { useState } from "react";

async function downloadBlob(url: string, filename: string) {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    let message = `Download failed (${res.status})`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // ignore non-JSON bodies
    }
    throw new Error(message);
  }
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

export function DownloadButton({
  href,
  filename,
  children,
  className = "btn-nav",
}: {
  href: string;
  filename: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onClick() {
    setBusy(true);
    setError("");
    try {
      await downloadBlob(href, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button type="button" onClick={onClick} disabled={busy} className={className}>
        {busy ? "Downloading…" : children}
      </button>
      {error ? (
        <span className="font-mono text-[10px] tracking-normal text-red-400 normal-case">
          {error}
        </span>
      ) : null}
    </span>
  );
}
