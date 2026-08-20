"use client";

import { DownloadButton } from "@/components/admin/DownloadButton";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FIGMA_FILE = "https://www.figma.com/design/CTMlP9TsdTpS9MrKtaAp0m";

const groups = [
  {
    title: "Cover & framework · in Figma",
    items: ["00-cover.svg", "01-messaging.svg"],
  },
  {
    title: "Landing · 1440",
    items: [
      "landing-nav.svg",
      "landing-hero.svg",
      "landing-value.svg",
      "landing-ft01.svg",
      "landing-ft02.svg",
      "landing-ft03.svg",
      "landing-quotes.svg",
      "landing-integrations.svg",
      "landing-pricing.svg",
      "landing-cta.svg",
      "landing-faq.svg",
      "landing-footer.svg",
    ],
  },
  {
    title: "Ads · 1200×628",
    items: ["ad-cfo.svg", "ad-finops.svg", "ad-engineer.svg"],
  },
  {
    title: "Carousel · 1080×1080",
    items: [
      "carousel-01.svg",
      "carousel-02.svg",
      "carousel-03.svg",
      "carousel-04.svg",
      "carousel-05.svg",
    ],
  },
  {
    title: "Meet Noros & UI",
    items: ["meet-noros.svg", "ui-hero.svg"],
  },
  {
    title: "Brief · email · event",
    items: ["brief-p1.svg", "brief-p2.svg", "email.svg", "event.svg"],
  },
  {
    title: "Storyboard · 1920×1080",
    items: [
      "storyboard-01.svg",
      "storyboard-02.svg",
      "storyboard-03.svg",
      "storyboard-04.svg",
      "storyboard-05.svg",
      "storyboard-06.svg",
    ],
  },
  {
    title: "Launch & announce",
    items: ["launch.svg", "announce-primary.svg", "announce-secondary.svg"],
  },
  {
    title: "Role heroes",
    items: ["role-cfo.svg", "role-finops.svg", "role-engineer.svg"],
  },
] as const;

const labels: Record<string, { label: string; size: string }> = {
  "00-cover.svg": { label: "Cover", size: "1440×900" },
  "01-messaging.svg": { label: "Messaging framework", size: "1440×900" },
  "ad-cfo.svg": { label: "Ad · CFO", size: "1200×628" },
  "ad-finops.svg": { label: "Ad · FinOps", size: "1200×628" },
  "ad-engineer.svg": { label: "Ad · Engineer", size: "1200×628" },
  "carousel-01.svg": { label: "Carousel 01", size: "1080×1080" },
  "carousel-02.svg": { label: "Carousel 02", size: "1080×1080" },
  "carousel-03.svg": { label: "Carousel 03", size: "1080×1080" },
  "carousel-04.svg": { label: "Carousel 04", size: "1080×1080" },
  "carousel-05.svg": { label: "Carousel 05", size: "1080×1080" },
  "meet-noros.svg": { label: "Meet Noros", size: "1440×900" },
  "ui-hero.svg": { label: "UI hero", size: "1440×900" },
  "brief-p1.svg": { label: "Brief p.1", size: "816×1056" },
  "brief-p2.svg": { label: "Brief p.2", size: "816×1056" },
  "email.svg": { label: "Launch email", size: "600×860" },
  "event.svg": { label: "Event screen", size: "1920×1080" },
  "storyboard-01.svg": { label: "Storyboard 01", size: "1920×1080" },
  "storyboard-02.svg": { label: "Storyboard 02", size: "1920×1080" },
  "storyboard-03.svg": { label: "Storyboard 03", size: "1920×1080" },
  "storyboard-04.svg": { label: "Storyboard 04", size: "1920×1080" },
  "storyboard-05.svg": { label: "Storyboard 05", size: "1920×1080" },
  "storyboard-06.svg": { label: "Storyboard 06", size: "1920×1080" },
  "launch.svg": { label: "Launch gallery", size: "1200×600" },
  "announce-primary.svg": { label: "Announce primary", size: "1080×1080" },
  "announce-secondary.svg": { label: "Announce secondary", size: "1440×900" },
  "role-cfo.svg": { label: "Role · CFO", size: "1440×900" },
  "role-finops.svg": { label: "Role · FinOps", size: "1440×900" },
  "role-engineer.svg": { label: "Role · Engineer", size: "1440×900" },
  "landing-nav.svg": { label: "Landing nav", size: "1440×80" },
  "landing-hero.svg": { label: "Landing hero", size: "1440×900" },
  "landing-value.svg": { label: "Landing value", size: "1440×800" },
  "landing-ft01.svg": { label: "Landing FT.01", size: "1440×720" },
  "landing-ft02.svg": { label: "Landing FT.02", size: "1440×720" },
  "landing-ft03.svg": { label: "Landing FT.03", size: "1440×720" },
  "landing-quotes.svg": { label: "Landing quotes", size: "1440×720" },
  "landing-integrations.svg": { label: "Landing integrations", size: "1440×720" },
  "landing-pricing.svg": { label: "Landing pricing", size: "1440×720" },
  "landing-cta.svg": { label: "Landing CTA", size: "1440×800" },
  "landing-faq.svg": { label: "Landing FAQ", size: "1440×900" },
  "landing-footer.svg": { label: "Landing footer", size: "1440×560" },
};

export function FigmaBoards({
  disclaimer,
  initialBackgrounds,
}: {
  disclaimer: string;
  initialBackgrounds: Record<string, string | null>;
}) {
  const router = useRouter();
  const [backgrounds, setBackgrounds] = useState(initialBackgrounds);
  const [uploading, setUploading] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  async function uploadBackground(frame: string, file: File) {
    setUploading(frame);
    setStatus("");
    try {
      const form = new FormData();
      form.set("frame", frame);
      form.set("file", file);
      const res = await fetch("/api/admin/figma-kit/background", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error ?? "Upload failed");
        return;
      }
      setBackgrounds(data.backgrounds);
      router.refresh();
    } finally {
      setUploading(null);
    }
  }

  async function clearBackground(frame: string) {
    setUploading(frame);
    setStatus("");
    try {
      const res = await fetch(
        `/api/admin/figma-kit/background?frame=${encodeURIComponent(frame)}`,
        { method: "DELETE", credentials: "include" },
      );
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error ?? "Clear failed");
        return;
      }
      setBackgrounds(data.backgrounds);
      router.refresh();
    } finally {
      setUploading(null);
    }
  }

  return (
    <>
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
            Admin only · 40 export frames · kit assembled
          </p>
          <p className="t6 mt-4 max-w-2xl text-neue">
            Cover and messaging already live in{" "}
            <a href={FIGMA_FILE} className="text-mint underline-offset-2 hover:underline">
              Noros Campaign Kit — Portfolio
            </a>
            . Upload a custom background on any frame to override the auto-generated text-free
            JPEG. Custom backgrounds are used for Background downloads and the background zip.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={FIGMA_FILE} target="_blank" rel="noreferrer" className="btn-nav">
              Open Figma file
            </a>
            <DownloadButton
              href="/api/admin/figma-kit/jpeg-zip"
              filename="figma-kit-jpegs.zip"
              className="btn-trial"
            >
              Download JPEG zip
            </DownloadButton>
            <DownloadButton
              href="/api/admin/figma-kit/jpeg-zip?variant=plain"
              filename="figma-kit-backgrounds.zip"
            >
              Download background JPEG zip
            </DownloadButton>
            <DownloadButton href="/figma-kit.zip" filename="figma-kit.zip">
              Download SVG zip
            </DownloadButton>
          </div>
          {status ? (
            <p className="mt-4 font-mono text-[11px] tracking-normal text-red-400 normal-case">
              {status}
            </p>
          ) : null}
          <p className="mt-6 font-mono text-[11px] text-neue/70 uppercase">{disclaimer}</p>
        </Reveal>
      </GridFrame>

      {groups.map((group) => (
        <GridFrame key={group.title} borders="rb" ink="mint" strength={40}>
          <section className="p-5 sm:p-8">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              {group.title}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((file) => {
                const meta = labels[file];
                const jpegName = file.replace(/\.svg$/i, ".jpg");
                const customBg = backgrounds[file] ?? null;
                return (
                  <div key={file} className="min-w-0">
                    <div className="relative overflow-hidden border border-white/10 bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/figma-kit/${file}`}
                        alt={meta?.label ?? file}
                        className="h-auto w-full"
                      />
                    </div>
                    {customBg ? (
                      <div className="mt-2 overflow-hidden border border-mint/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={customBg}
                          alt={`Custom background for ${meta?.label ?? file}`}
                          className="h-20 w-full object-cover"
                        />
                        <p className="px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-mint uppercase">
                          Custom background
                        </p>
                      </div>
                    ) : null}
                    <div className="mt-2 flex items-baseline justify-between gap-2">
                      <span className="text-sm text-white">{meta?.label ?? file}</span>
                      <span className="font-mono text-[10px] tracking-[0.08em] text-neue uppercase">
                        {meta?.size}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <DownloadButton
                        href={`/api/admin/figma-kit/jpeg?file=${encodeURIComponent(file)}`}
                        filename={jpegName}
                      >
                        JPEG
                      </DownloadButton>
                      <DownloadButton
                        href={`/api/admin/figma-kit/jpeg?file=${encodeURIComponent(file)}&variant=plain`}
                        filename={file.replace(/\.svg$/i, "-bg.jpg")}
                      >
                        Background
                      </DownloadButton>
                      <DownloadButton href={`/figma-kit/${file}`} filename={file}>
                        SVG
                      </DownloadButton>
                      <label className="btn-nav cursor-pointer">
                        {uploading === file ? "Uploading…" : "Upload background"}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          disabled={!!uploading}
                          onChange={(e) => {
                            const picked = e.target.files?.[0];
                            if (picked) void uploadBackground(file, picked);
                            e.target.value = "";
                          }}
                        />
                      </label>
                      {customBg ? (
                        <button
                          type="button"
                          className="btn-nav"
                          disabled={!!uploading}
                          onClick={() => void clearBackground(file)}
                        >
                          Clear custom
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </GridFrame>
      ))}
    </>
  );
}
