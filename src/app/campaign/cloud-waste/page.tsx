import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CloudWasteMedia } from "@/components/campaign/CloudWasteMedia";
import { CloudWasteSubNav } from "@/components/campaign/CloudWasteSubNav";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import Link from "next/link";

function ServerRackSVG() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cw-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--mint)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="black" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="cw-waste" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--mint)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#cw-depth)" />
      {/* Rack outlines */}
      {[120, 300, 480, 660].map((x) => (
        <g key={x}>
          <rect x={x} y={60} width={100} height={380} fill="none" stroke="var(--mint)" strokeOpacity="0.2" strokeWidth="1" />
          {/* Server units */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={x + 8} y={72 + i * 46} width={84} height={38} fill="var(--mint)" fillOpacity={0.04} stroke="var(--mint)" strokeOpacity="0.15" strokeWidth="0.5" />
          ))}
          {/* Utilization meters */}
          {Array.from({ length: 8 }).map((_, i) => {
            const isWaste = (x === 300 && i > 4) || (x === 480 && i > 5) || (x === 660 && i === 3);
            const height = isWaste ? 38 * 0.3 : 38 * (0.5 + Math.random() * 0.4);
            return (
              <rect
                key={`m${i}`}
                x={x + 76}
                y={72 + i * 46 + (38 - height)}
                width={6}
                height={height}
                fill={isWaste ? "url(#cw-waste)" : "var(--mint)"}
                fillOpacity={isWaste ? 1 : 0.5}
              />
            );
          })}
        </g>
      ))}
      {/* Tangled cables */}
      {[
        "M 220 200 C 260 180, 280 260, 300 240",
        "M 400 150 C 430 200, 460 120, 480 170",
        "M 580 300 C 620 280, 640 350, 660 320",
        "M 220 350 C 280 370, 320 310, 400 340",
        "M 480 100 C 520 130, 560 90, 600 120",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="var(--mint)" strokeOpacity="0.25" strokeWidth="1" />
      ))}
    </svg>
  );
}

function splitCampaignLine(value: string) {
  return value.split(" ").reduce<string[]>(
    (acc, word, i) => {
      if (i < 3) acc[0] = (acc[0] || "") + (acc[0] ? " " : "") + word;
      else acc[1] = (acc[1] || "") + (acc[1] ? " " : "") + word;
      return acc;
    },
    [],
  );
}

export default async function CloudWasteHeroPage() {
  const { cloudWaste } = await getSiteContent();
  const campaignLines = splitCampaignLine(cloudWaste.campaignLine);
  const framework = [
    { label: "Insight", body: cloudWaste.insight },
    { label: "Hook", body: cloudWaste.messageFramework.hook },
    { label: "Promise", body: cloudWaste.product.tagline },
    { label: "Proof", body: cloudWaste.messageFramework.proof },
    { label: "Ask", body: cloudWaste.messageFramework.ask },
  ];
  return (
    <CampaignShell title="Cloud Waste Campaign">
      {/* Hero visual — no top frame border (reads as a grey line on photos).
          Hero media may be a multi-panel color board; zoom into one panel so
          baked-in grid lines don't cut across the headline. */}
      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <CloudWasteMedia
              asset={cloudWaste.media.hero}
              className="h-full w-full origin-[18%_12%] scale-[2.2] object-cover"
              alt="Cloud Waste campaign hero media"
            >
              <ServerRackSVG />
            </CloudWasteMedia>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
          <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:p-14">
            <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
              {cloudWaste.hero.eyebrow}
            </p>
            <BoxedTitle size="t2" className="mt-4" lines={campaignLines} />
            <p className="t6 mt-6 max-w-2xl text-white/90">
              {cloudWaste.product.support}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={cloudWaste.hero.primaryCta.href}
                className="inline-flex items-center rounded-full bg-mint px-5 py-2.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-black uppercase"
              >
                {cloudWaste.hero.primaryCta.label}
              </Link>
              <Link
                href={cloudWaste.hero.secondaryCta.href}
                className="inline-flex items-center rounded-full border border-mint/40 px-5 py-2.5 font-mono text-[11px] tracking-[0.08em] text-mint uppercase hover:bg-mint/10"
              >
                {cloudWaste.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </GridFrame>

      {/* Audience pain/promise grid */}
      <RevealStagger className="grid md:grid-cols-3">
        {Object.values(cloudWaste.audiences).map((aud) => (
          <RevealItem key={aud.id}>
            <GridFrame borders="rb" ink="mint" strength={40}>
              <article className="flex h-full flex-col p-5 sm:p-6">
                <p className="font-mono text-[10px] tracking-[0.16em] text-mint uppercase">
                  {aud.label}
                </p>
                <h3 className="t5 mt-3 text-white">{aud.pain}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neue/80">{aud.promise}</p>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {aud.proof.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-neue/60">
                      <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-mint" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-4 font-mono text-[10px] tracking-[0.08em] text-mint uppercase">
                  {aud.cta} →
                </p>
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>

      {/* Message framework */}
      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Message Framework
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-5">
            {framework.map((f) => (
              <div key={f.label}>
                <p className="font-mono text-[10px] tracking-[0.12em] text-white/60 uppercase">
                  {f.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neue/80">{f.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </GridFrame>

      <CloudWasteSubNav />
    </CampaignShell>
  );
}
