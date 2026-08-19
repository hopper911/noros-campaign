"use client";

import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import type { AudienceId, CloudWasteMediaAsset, SiteContent } from "@/lib/site-content";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "ads", label: "Ads" },
  { id: "audiences", label: "Audiences" },
  { id: "graphics", label: "Kit graphics" },
  { id: "carousel", label: "Carousel & storyboard" },
  { id: "landing", label: "Landing" },
  { id: "cloud-waste", label: "Cloud Waste" },
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
      setStatus("Media uploaded.");
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
                <ImageSlot
                  label="Role hero still"
                  src={a.heroImageUrl}
                  kind={`role-${id}`}
                  aspect="aspect-[16/9]"
                  uploading={uploading}
                  onUpload={upload}
                />
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

      <Section id="graphics" title="Kit graphics">
        <p className="text-[15px] text-neue">
          Each kit surface has its own still. Uploads go live immediately and do not replace
          ads or the landing hero.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["Meet Noros", content.kit.meetImageUrl, "kit-meet", "aspect-[16/9]"],
              ["UI hero background", content.kit.uiImageUrl, "kit-ui", "aspect-[16/9]"],
              ["Brief cover", content.kit.briefImageUrl, "kit-brief", "aspect-[16/9]"],
              ["Email header", content.kit.emailImageUrl, "kit-email", "aspect-[16/7]"],
              ["Event screen", content.kit.eventImageUrl, "kit-event", "aspect-video"],
              ["Launch card", content.kit.launchImageUrl, "kit-launch", "aspect-[2/1]"],
              ["Announce primary", content.kit.announceImageUrl, "kit-announce", "aspect-square"],
              [
                "Announce secondary",
                content.kit.announceSecondaryImageUrl,
                "kit-announce-secondary",
                "aspect-[16/9]",
              ],
            ] as const
          ).map(([label, src, kind, aspect]) => (
            <ImageSlot
              key={kind}
              label={label}
              src={src}
              kind={kind}
              aspect={aspect}
              uploading={uploading}
              onUpload={upload}
            />
          ))}
        </div>
      </Section>

      <Section id="carousel" title="Carousel & storyboard">
        <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">Carousel</p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {content.carouselSlides.map((slide, i) => (
            <div key={slide.label} className="space-y-3 border border-white/10 p-4">
              <ImageSlot
                label={`Slide ${i + 1} still`}
                src={slide.imageUrl}
                kind={`carousel-${i}`}
                aspect="aspect-square"
                uploading={uploading}
                onUpload={upload}
              />
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
              <ImageSlot
                label={`${frame.t} still`}
                src={frame.imageUrl}
                kind={`storyboard-${i}`}
                aspect="aspect-video"
                uploading={uploading}
                onUpload={upload}
              />
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
            <ImageSlot
              label="Hero still"
              src={content.landing.heroImageUrl}
              kind="hero"
              aspect="aspect-[16/7]"
              uploading={uploading}
              onUpload={upload}
            />
            <ImageSlot
              label="Hero inset"
              src={content.landing.heroInsetUrl}
              kind="hero-inset"
              aspect="aspect-[1.45/1]"
              uploading={uploading}
              onUpload={upload}
            />
            <ImageSlot
              label="Value shard"
              src={content.landing.valueImageUrl}
              kind="landing-value"
              aspect="aspect-square"
              uploading={uploading}
              onUpload={upload}
            />
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
            <ImageSlot
              label="Quotes band"
              src={content.landing.quotesImageUrl}
              kind="landing-quotes"
              aspect="aspect-[16/8]"
              uploading={uploading}
              onUpload={upload}
            />
            <ImageSlot
              label="Closing CTA still"
              src={content.landing.ctaImageUrl}
              kind="landing-cta"
              aspect="aspect-[16/9]"
              uploading={uploading}
              onUpload={upload}
            />
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {content.landing.features.map((feature, i) => (
            <ImageSlot
              key={feature.code}
              label={`${feature.code} still`}
              src={feature.media}
              kind={`feature-${i}`}
              aspect="aspect-[16/11]"
              uploading={uploading}
              onUpload={upload}
            />
          ))}
        </div>
      </Section>

      <Section id="cloud-waste" title="Cloud Waste">
        <div className="space-y-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Hero
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <Field
                  label="Campaign line"
                  value={content.cloudWaste.campaignLine}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: { ...content.cloudWaste, campaignLine: v },
                    })
                  }
                />
                <Field
                  label="Insight"
                  value={content.cloudWaste.insight}
                  multiline
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: { ...content.cloudWaste, insight: v },
                    })
                  }
                />
                <Field
                  label="Product tagline"
                  value={content.cloudWaste.product.tagline}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        product: { ...content.cloudWaste.product, tagline: v },
                      },
                    })
                  }
                />
                <Field
                  label="Product support"
                  value={content.cloudWaste.product.support}
                  multiline
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        product: { ...content.cloudWaste.product, support: v },
                      },
                    })
                  }
                />
              </div>
              <ImageSlot
                label="Hero image or video"
                src={content.cloudWaste.media.hero}
                kind="cw-hero"
                aspect="aspect-[16/10]"
                uploading={uploading}
                onUpload={upload}
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
              />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Report
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <Field
                  label="Report title"
                  value={content.cloudWaste.report.title}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        report: { ...content.cloudWaste.report, title: v },
                      },
                    })
                  }
                />
                <Field
                  label="Report subtitle"
                  value={content.cloudWaste.report.subtitle}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        report: { ...content.cloudWaste.report, subtitle: v },
                      },
                    })
                  }
                />
                <Field
                  label="Hero stat"
                  value={content.cloudWaste.stat}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: { ...content.cloudWaste, stat: v },
                    })
                  }
                />
                <Field
                  label="Stat source"
                  value={content.cloudWaste.statSource}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: { ...content.cloudWaste, statSource: v },
                    })
                  }
                />
              </div>
              <ImageSlot
                label="Report cover image or video"
                src={content.cloudWaste.media.reportCover}
                kind="cw-report-cover"
                aspect="aspect-square"
                uploading={uploading}
                onUpload={upload}
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
              />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Ads & carousel
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-3">
              {content.cloudWaste.ads.static.map((ad, i) => (
                <div key={`cw-ad-${i}`} className="space-y-4 border border-white/10 p-4">
                  <ImageSlot
                    label={`Ad ${i + 1} image or video`}
                    src={content.cloudWaste.media.ads[i]}
                    kind={`cw-ad-${i}`}
                    aspect="aspect-[1.91/1]"
                    uploading={uploading}
                    onUpload={upload}
                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                  />
                  <Field
                    label="Headline"
                    value={ad.headline}
                    onChange={(v) => {
                      const nextAds = content.cloudWaste.ads.static.map((item, idx) =>
                        idx === i ? { ...item, headline: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: {
                          ...content.cloudWaste,
                          ads: { ...content.cloudWaste.ads, static: nextAds },
                        },
                      });
                    }}
                  />
                  <Field
                    label="Body"
                    value={ad.body}
                    multiline
                    onChange={(v) => {
                      const nextAds = content.cloudWaste.ads.static.map((item, idx) =>
                        idx === i ? { ...item, body: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: {
                          ...content.cloudWaste,
                          ads: { ...content.cloudWaste.ads, static: nextAds },
                        },
                      });
                    }}
                  />
                  <Field
                    label="CTA"
                    value={ad.cta}
                    onChange={(v) => {
                      const nextAds = content.cloudWaste.ads.static.map((item, idx) =>
                        idx === i ? { ...item, cta: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: {
                          ...content.cloudWaste,
                          ads: { ...content.cloudWaste.ads, static: nextAds },
                        },
                      });
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {content.cloudWaste.ads.carousel.map((slide, i) => (
                <div key={`cw-carousel-${i}`} className="space-y-3 border border-white/10 p-4">
                  <ImageSlot
                    label={`Carousel ${i + 1} image or video`}
                    src={content.cloudWaste.media.carousel[i]}
                    kind={`cw-carousel-${i}`}
                    aspect="aspect-square"
                    uploading={uploading}
                    onUpload={upload}
                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                  />
                  <Field
                    label="Title"
                    value={slide.title}
                    onChange={(v) => {
                      const carousel = content.cloudWaste.ads.carousel.map((item, idx) =>
                        idx === i ? { ...item, title: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: {
                          ...content.cloudWaste,
                          ads: { ...content.cloudWaste.ads, carousel },
                        },
                      });
                    }}
                  />
                  <Field
                    label="Body"
                    value={slide.body}
                    multiline
                    onChange={(v) => {
                      const carousel = content.cloudWaste.ads.carousel.map((item, idx) =>
                        idx === i ? { ...item, body: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: {
                          ...content.cloudWaste,
                          ads: { ...content.cloudWaste.ads, carousel },
                        },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Email sequence
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-3">
              {content.cloudWaste.emails.map((email, i) => (
                <div key={`cw-email-${i}`} className="space-y-3 border border-white/10 p-4">
                  <Field
                    label="Subject"
                    value={email.subject}
                    onChange={(v) => {
                      const emails = content.cloudWaste.emails.map((item, idx) =>
                        idx === i ? { ...item, subject: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: { ...content.cloudWaste, emails },
                      });
                    }}
                  />
                  <Field
                    label="Preview"
                    value={email.preview}
                    onChange={(v) => {
                      const emails = content.cloudWaste.emails.map((item, idx) =>
                        idx === i ? { ...item, preview: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: { ...content.cloudWaste, emails },
                      });
                    }}
                  />
                  <Field
                    label="Body"
                    value={email.body}
                    multiline
                    onChange={(v) => {
                      const emails = content.cloudWaste.emails.map((item, idx) =>
                        idx === i ? { ...item, body: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: { ...content.cloudWaste, emails },
                      });
                    }}
                  />
                  <Field
                    label="CTA"
                    value={email.cta}
                    onChange={(v) => {
                      const emails = content.cloudWaste.emails.map((item, idx) =>
                        idx === i ? { ...item, cta: v } : item,
                      );
                      setContent({
                        ...content,
                        cloudWaste: { ...content.cloudWaste, emails },
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Webinar
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <Field
                  label="Title"
                  value={content.cloudWaste.webinar.title}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        webinar: { ...content.cloudWaste.webinar, title: v },
                      },
                    })
                  }
                />
                <Field
                  label="Subtitle"
                  value={content.cloudWaste.webinar.subtitle}
                  multiline
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        webinar: { ...content.cloudWaste.webinar, subtitle: v },
                      },
                    })
                  }
                />
                <Field
                  label="Speaker name"
                  value={content.cloudWaste.webinar.speaker.name}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        webinar: {
                          ...content.cloudWaste.webinar,
                          speaker: { ...content.cloudWaste.webinar.speaker, name: v },
                        },
                      },
                    })
                  }
                />
                <Field
                  label="Speaker role"
                  value={content.cloudWaste.webinar.speaker.role}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        webinar: {
                          ...content.cloudWaste.webinar,
                          speaker: { ...content.cloudWaste.webinar.speaker, role: v },
                        },
                      },
                    })
                  }
                />
                <Field
                  label="Agenda (one per line)"
                  value={content.cloudWaste.webinar.agenda.join("\n")}
                  multiline
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        webinar: {
                          ...content.cloudWaste.webinar,
                          agenda: v.split("\n").map((item) => item.trim()).filter(Boolean),
                        },
                      },
                    })
                  }
                />
              </div>
              <ImageSlot
                label="Webinar image or video"
                src={content.cloudWaste.media.webinar}
                kind="cw-webinar"
                aspect="aspect-video"
                uploading={uploading}
                onUpload={upload}
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
              />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              OOH
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <Field
                  label="Headline"
                  value={content.cloudWaste.ooh.headline}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        ooh: { ...content.cloudWaste.ooh, headline: v },
                      },
                    })
                  }
                />
                <Field
                  label="Subline"
                  value={content.cloudWaste.ooh.subline}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        ooh: { ...content.cloudWaste.ooh, subline: v },
                      },
                    })
                  }
                />
                <Field
                  label="Placement"
                  value={content.cloudWaste.ooh.placement}
                  multiline
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        ooh: { ...content.cloudWaste.ooh, placement: v },
                      },
                    })
                  }
                />
                <Field
                  label="Spec"
                  value={content.cloudWaste.ooh.spec}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        ooh: { ...content.cloudWaste.ooh, spec: v },
                      },
                    })
                  }
                />
                <Field
                  label="Conference"
                  value={content.cloudWaste.ooh.conference}
                  onChange={(v) =>
                    setContent({
                      ...content,
                      cloudWaste: {
                        ...content.cloudWaste,
                        ooh: { ...content.cloudWaste.ooh, conference: v },
                      },
                    })
                  }
                />
              </div>
              <ImageSlot
                label="OOH image or video"
                src={content.cloudWaste.media.ooh}
                kind="cw-ooh"
                aspect="aspect-[9/16]"
                uploading={uploading}
                onUpload={upload}
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
              />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              Dashboard
            </p>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <ImageSlot
                label="Dashboard image or video"
                src={content.cloudWaste.media.dashboard}
                kind="cw-dashboard"
                aspect="aspect-[16/10]"
                uploading={uploading}
                onUpload={upload}
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
              />
              <div className="space-y-3">
                {content.cloudWaste.dashboard.kpis.map((kpi, i) => (
                  <div key={`kpi-${i}`} className="grid gap-3 border border-white/10 p-4 md:grid-cols-2">
                    <Field
                      label="Label"
                      value={kpi.label}
                      onChange={(v) => {
                        const kpis = content.cloudWaste.dashboard.kpis.map((item, idx) =>
                          idx === i ? { ...item, label: v } : item,
                        );
                        setContent({
                          ...content,
                          cloudWaste: {
                            ...content.cloudWaste,
                            dashboard: { ...content.cloudWaste.dashboard, kpis },
                          },
                        });
                      }}
                    />
                    <Field
                      label="Target"
                      value={String(kpi.target)}
                      onChange={(v) => {
                        const nextValue = Number(v);
                        const kpis = content.cloudWaste.dashboard.kpis.map((item, idx) =>
                          idx === i
                            ? { ...item, target: Number.isFinite(nextValue) ? nextValue : item.target }
                            : item,
                        );
                        setContent({
                          ...content,
                          cloudWaste: {
                            ...content.cloudWaste,
                            dashboard: { ...content.cloudWaste.dashboard, kpis },
                          },
                        });
                      }}
                    />
                    <Field
                      label="Prefix"
                      value={kpi.prefix}
                      onChange={(v) => {
                        const kpis = content.cloudWaste.dashboard.kpis.map((item, idx) =>
                          idx === i ? { ...item, prefix: v } : item,
                        );
                        setContent({
                          ...content,
                          cloudWaste: {
                            ...content.cloudWaste,
                            dashboard: { ...content.cloudWaste.dashboard, kpis },
                          },
                        });
                      }}
                    />
                    <Field
                      label="Unit"
                      value={kpi.unit}
                      onChange={(v) => {
                        const kpis = content.cloudWaste.dashboard.kpis.map((item, idx) =>
                          idx === i ? { ...item, unit: v } : item,
                        );
                        setContent({
                          ...content,
                          cloudWaste: {
                            ...content.cloudWaste,
                            dashboard: { ...content.cloudWaste.dashboard, kpis },
                          },
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
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

function ImageSlot({
  label,
  src,
  kind,
  aspect,
  uploading,
  onUpload,
  accept = "image/jpeg,image/png,image/webp,image/gif",
}: {
  label: string;
  src: string | CloudWasteMediaAsset | null;
  kind: string;
  aspect: string;
  uploading: string | null;
  onUpload: (kind: string, file: File) => void;
  accept?: string;
}) {
  const url = typeof src === "string" ? src : src?.url ?? "";
  const isVideo = !!src && typeof src !== "string" && src.mediaType === "video";
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">{label}</p>
      <label className={`group relative mt-2 block cursor-pointer overflow-hidden border border-white/10 ${aspect}`}>
        {url ? (
          isVideo ? (
            <video
              src={url}
              controls
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )
        ) : (
          <div className="absolute inset-0 bg-white/[0.03]" />
        )}
        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
        <div className="absolute inset-x-3 bottom-3 rounded-full bg-black/80 px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.08em] text-mint uppercase">
          {uploading === kind ? "Uploading…" : "Upload / replace media"}
        </div>
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={!!uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(kind, file);
            e.target.value = "";
          }}
        />
      </label>
      <label className="btn-nav mt-3 inline-flex cursor-pointer">
        {uploading === kind ? "Uploading…" : "Choose file"}
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={!!uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(kind, file);
            e.target.value = "";
          }}
        />
      </label>
    </div>
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
    "mt-2 w-full border border-white/15 bg-black px-3 py-2 font-sans text-[15px] tracking-normal text-white normal-case focus-visible:border-mint";
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
