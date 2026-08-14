"use client";

import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import type { AudienceId, SiteContent } from "@/lib/site-content";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "ads", label: "Ads" },
  { id: "audiences", label: "Audiences" },
  { id: "carousel", label: "Carousel & storyboard" },
  { id: "landing", label: "Landing" },
] as const;

const roles: AudienceId[] = ["cfo", "finops", "engineer"];

export function AdminDashboard({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error ?? "Save failed");
        return;
      }
      setContent(data);
      setStatus("Saved. Live pages will pick this up immediately.");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!confirm("Reset all CMS copy and ad images to the original defaults?")) return;
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/reset", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error ?? "Reset failed");
        return;
      }
      setContent(data);
      setStatus("Reset to messaging.ts defaults.");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function upload(kind: string, file: File) {
    setUploading(kind);
    setStatus("");
    try {
      const form = new FormData();
      form.set("kind", kind);
      form.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error ?? "Upload failed");
        return;
      }
      setContent(data.content);
      setStatus("Image uploaded.");
      router.refresh();
    } finally {
      setUploading(null);
    }
  }

  return (
    <div className="space-y-8">
      <GridFrame borders="tr" ink="mint" strength={40}>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div>
            <HeaderBar />
            <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              Live CMS · Neon
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight text-white">
              Edit copy and ads
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-neue">
              Saves to Postgres so changes survive deploys. Public pages fall back to the
              original kit if the database is unreachable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={save} disabled={busy} className="btn-trial">
              {busy ? "Working…" : "Save"}
            </button>
            <button type="button" onClick={reset} disabled={busy} className="btn-nav">
              Reset to defaults
            </button>
            <button type="button" onClick={logout} className="btn-nav">
              Log out
            </button>
          </div>
        </div>
      </GridFrame>

      {status ? (
        <p className="font-mono text-[12px] tracking-[0.04em] text-mint">{status}</p>
      ) : null}

      <nav className="flex snap-x gap-2 overflow-x-auto pb-1">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="btn-nav shrink-0">
            {s.label}
          </a>
        ))}
      </nav>

      <Section id="overview" title="Overview">
        <Field
          label="Campaign line"
          value={content.campaignLine}
          onChange={(v) => setContent({ ...content, campaignLine: v })}
        />
        <Field
          label="Disclaimer"
          value={content.disclaimer}
          multiline
          onChange={(v) => setContent({ ...content, disclaimer: v })}
        />
        <Field
          label="Product tagline"
          value={content.product.tagline}
          onChange={(v) =>
            setContent({ ...content, product: { ...content.product, tagline: v } })
          }
        />
        <Field
          label="Product support"
          value={content.product.support}
          multiline
          onChange={(v) =>
            setContent({ ...content, product: { ...content.product, support: v } })
          }
        />
      </Section>

      <Section id="ads" title="Ads">
        <p className="text-[15px] text-neue">
          LinkedIn 1.91:1. Upload replaces the still for that role and goes live immediately.
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {roles.map((id) => {
            const ad = content.audiences[id];
            const kind = `ad-${id}`;
            return (
              <div key={id} className="space-y-4">
                <div className="relative aspect-[1.91/1] overflow-hidden border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ad.adImageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-4">
                    <div className="font-mono text-[10px] tracking-[0.16em] text-mint uppercase">
                      Noros · {ad.shortLabel}
                    </div>
                    <p className="mt-1 text-sm font-medium leading-snug text-white">
                      {ad.adHeadline}
                    </p>
                  </div>
                </div>
                <label className="btn-nav inline-flex cursor-pointer">
                  {uploading === kind ? "Uploading…" : "Upload image"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    disabled={!!uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void upload(kind, file);
                      e.target.value = "";
                    }}
                  />
                </label>
                <Field
                  label="Headline"
                  value={ad.adHeadline}
                  onChange={(v) => patchAudience(setContent, content, id, { adHeadline: v })}
                />
                <Field
                  label="Body"
                  value={ad.adBody}
                  multiline
                  onChange={(v) => patchAudience(setContent, content, id, { adBody: v })}
                />
                <Field
                  label="CTA"
                  value={ad.cta}
                  onChange={(v) => patchAudience(setContent, content, id, { cta: v })}
                />
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="audiences" title="Audiences">
        <div className="grid gap-8 lg:grid-cols-3">
          {roles.map((id) => {
            const a = content.audiences[id];
            return (
              <div key={id} className="space-y-4">
                <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
                  {a.label}
                </p>
                <Field
                  label="Hero headline"
                  value={a.headline}
                  multiline
                  onChange={(v) => patchAudience(setContent, content, id, { headline: v })}
                />
                <Field
                  label="Subhead"
                  value={a.subhead}
                  multiline
                  onChange={(v) => patchAudience(setContent, content, id, { subhead: v })}
                />
                <Field
                  label="Proof points (one per line)"
                  value={a.proofPoints.join("\n")}
                  multiline
                  onChange={(v) =>
                    patchAudience(setContent, content, id, {
                      proofPoints: v.split("\n").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="carousel" title="Carousel & storyboard">
        <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">Carousel</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {content.carouselSlides.map((slide, i) => (
            <div key={slide.label} className="space-y-3 border border-white/10 p-4">
              <Field
                label={`Slide ${i + 1} title`}
                value={slide.title}
                onChange={(v) => {
                  const carouselSlides = content.carouselSlides.map((s, idx) =>
                    idx === i ? { ...s, title: v } : s,
                  );
                  setContent({ ...content, carouselSlides });
                }}
              />
              <Field
                label="Body"
                value={slide.body}
                multiline
                onChange={(v) => {
                  const carouselSlides = content.carouselSlides.map((s, idx) =>
                    idx === i ? { ...s, body: v } : s,
                  );
                  setContent({ ...content, carouselSlides });
                }}
              />
            </div>
          ))}
        </div>
        <p className="mt-10 font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
          Storyboard
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {content.storyboardFrames.map((frame, i) => (
            <div key={frame.t} className="space-y-3 border border-white/10 p-4">
              <Field
                label={`${frame.t} title`}
                value={frame.title}
                onChange={(v) => {
                  const storyboardFrames = content.storyboardFrames.map((s, idx) =>
                    idx === i ? { ...s, title: v } : s,
                  );
                  setContent({ ...content, storyboardFrames });
                }}
              />
              <Field
                label="Beat"
                value={frame.visual}
                multiline
                onChange={(v) => {
                  const storyboardFrames = content.storyboardFrames.map((s, idx) =>
                    idx === i ? { ...s, visual: v } : s,
                  );
                  setContent({ ...content, storyboardFrames });
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="landing" title="Landing">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field
              label="Hero headline"
              value={content.landing.hero.headline}
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: { ...content.landing, hero: { ...content.landing.hero, headline: v } },
                })
              }
            />
            <Field
              label="Hero support"
              value={content.landing.hero.support}
              multiline
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: { ...content.landing, hero: { ...content.landing.hero, support: v } },
                })
              }
            />
            <Field
              label="Hero primary CTA"
              value={content.landing.hero.primaryCta}
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: {
                    ...content.landing,
                    hero: { ...content.landing.hero, primaryCta: v },
                  },
                })
              }
            />
            <Field
              label="Hero secondary CTA"
              value={content.landing.hero.secondaryCta}
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: {
                    ...content.landing,
                    hero: { ...content.landing.hero, secondaryCta: v },
                  },
                })
              }
            />
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
                Hero still
              </p>
              <div className="relative mt-2 aspect-[16/7] overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.landing.heroImageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <label className="btn-nav mt-3 inline-flex cursor-pointer">
                {uploading === "hero" ? "Uploading…" : "Upload hero image"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  disabled={!!uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void upload("hero", file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <Field
              label="Closing CTA title"
              value={content.landing.cta.title}
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: { ...content.landing, cta: { ...content.landing.cta, title: v } },
                })
              }
            />
            <Field
              label="Closing CTA body"
              value={content.landing.cta.body}
              multiline
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: { ...content.landing, cta: { ...content.landing.cta, body: v } },
                })
              }
            />
            <Field
              label="Closing primary"
              value={content.landing.cta.primary}
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: { ...content.landing, cta: { ...content.landing.cta, primary: v } },
                })
              }
            />
            <Field
              label="Closing secondary"
              value={content.landing.cta.secondary}
              onChange={(v) =>
                setContent({
                  ...content,
                  landing: {
                    ...content.landing,
                    cta: { ...content.landing.cta, secondary: v },
                  },
                })
              }
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <GridFrame borders="rb" ink="mint" strength={40}>
      <section id={id} className="scroll-mt-28 p-5 sm:p-8">
        <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
        <div className="mt-6 space-y-4">{children}</div>
      </section>
    </GridFrame>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "mt-2 w-full border border-white/15 bg-black px-3 py-2 font-sans text-[15px] tracking-normal text-white normal-case outline-none focus:border-mint";
  return (
    <label className="block font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
      {label}
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}

function patchAudience(
  setContent: (next: SiteContent) => void,
  content: SiteContent,
  id: AudienceId,
  patch: Partial<SiteContent["audiences"][AudienceId]>,
) {
  setContent({
    ...content,
    audiences: {
      ...content.audiences,
      [id]: { ...content.audiences[id], ...patch },
    },
  });
}
