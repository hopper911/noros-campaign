import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CloudWasteMedia } from "@/components/campaign/CloudWasteMedia";
import { CloudWasteSubNav } from "@/components/campaign/CloudWasteSubNav";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";

function AdVisual({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 1200 628" className="h-full w-full" aria-hidden="true">
      <rect width="1200" height="628" fill="black" />
      <rect x="40" y="40" width="120" height="548" fill="none" stroke="var(--mint)" strokeOpacity="0.15" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={200 + i * 150} y={100 + (variant * 30)} width={100} height={400 - variant * 60} fill="var(--mint)" fillOpacity={i === variant + 1 ? 0.08 : 0.03} stroke="var(--mint)" strokeOpacity="0.12" strokeWidth="0.5" />
      ))}
      <rect x={200 + (variant + 1) * 150 + 80} y={200} width={6} height={200} fill="#ef4444" fillOpacity="0.6" />
    </svg>
  );
}

export default async function CloudWasteAdsPage() {
  const { cloudWaste } = await getSiteContent();
  return (
    <CampaignShell title="Cloud Waste — Ads & Email">
      {/* Header */}
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Ads · Carousel · Display · Email Sequence
          </p>
          <BoxedTitle size="t2" className="mt-4" lines={["Ad Creatives &", "Email Sequence"]} />
        </Reveal>
      </GridFrame>

      {/* LinkedIn static ads */}
      <RevealStagger className="grid md:grid-cols-3">
        {cloudWaste.ads.static.map((ad, i) => (
          <RevealItem key={i}>
            <GridFrame borders="rb" ink="mint" strength={40}>
              <article>
                <div className="relative aspect-[1.91/1] overflow-hidden bg-black">
                  <CloudWasteMedia
                    asset={cloudWaste.media.ads[i] ?? null}
                    className="absolute inset-0 h-full w-full object-cover"
                    alt={`Cloud Waste ad ${i + 1}`}
                  >
                    <AdVisual variant={i} />
                  </CloudWasteMedia>
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5">
                    <p className="font-mono text-[10px] text-mint uppercase">LinkedIn · 1200×628</p>
                    <h3 className="t5 mt-1 text-white">{ad.headline}</h3>
                    <p className="mt-1 text-xs text-neue/70">{ad.body}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[10px] text-mint uppercase">{ad.cta} →</p>
                </div>
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>

      {/* Carousel */}
      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            LinkedIn Carousel · 1080×1080 · 5 slides
          </p>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {cloudWaste.ads.carousel.map((slide, i) => (
              <div key={slide.slide} className="relative aspect-square overflow-hidden rounded border border-mint/20 bg-white/[0.02] p-3 flex flex-col justify-end">
                <CloudWasteMedia
                  asset={cloudWaste.media.carousel[i] ?? null}
                  className="absolute inset-0 h-full w-full object-cover"
                  alt={`Cloud Waste carousel slide ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative">
                <p className="font-mono text-[9px] text-neue/40">Slide {slide.slide}</p>
                <p className="mt-1 text-[11px] font-semibold leading-tight text-white">{slide.title}</p>
                <p className="mt-0.5 text-[9px] text-neue/60">{slide.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </GridFrame>

      {/* Display sizes */}
      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Display Sizes
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            {Object.entries(cloudWaste.ads.display).map(([name, size]) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <div
                  className="rounded border border-mint/20 bg-white/[0.02]"
                  style={{ width: `${size.w / 4}px`, height: `${size.h / 4}px` }}
                />
                <p className="font-mono text-[9px] text-neue/50">
                  {name} · {size.w}×{size.h}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </GridFrame>

      {/* Email sequence */}
      <RevealStagger className="grid md:grid-cols-3">
        {cloudWaste.emails.map((email) => (
          <RevealItem key={email.n}>
            <GridFrame borders="rb" ink="mint" strength={40}>
              <article className="flex h-full flex-col p-5 sm:p-6">
                <p className="font-mono text-[10px] text-neue/40">Email {email.n}</p>
                <h3 className="mt-2 text-sm font-semibold text-white">{email.subject}</h3>
                <p className="mt-1 text-[10px] text-neue/50 italic">{email.preview}</p>
                <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-neue/60">
                  {email.body}
                </p>
                <p className="mt-auto pt-4 font-mono text-[10px] tracking-[0.08em] text-mint uppercase">
                  {email.cta} →
                </p>
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>
      <CloudWasteSubNav current="/campaign/cloud-waste/ads" />
    </CampaignShell>
  );
}
