import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CloudWasteMedia } from "@/components/campaign/CloudWasteMedia";
import { CloudWasteSubNav } from "@/components/campaign/CloudWasteSubNav";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import type { CloudWasteMediaAsset } from "@/lib/site-content";

function OohSVG() {
  return (
    <svg viewBox="0 0 1080 1920" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ooh-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <linearGradient id="ooh-waste" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--mint)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#ooh-bg)" />
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i}>
          <rect
            x={80 + i * 80}
            y={300}
            width={60}
            height={1200}
            fill="none"
            stroke="var(--mint)"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          {Array.from({ length: 14 }).map((_, j) => {
            const isWaste = (i === 3 && j > 8) || (i === 7 && j > 10) || (i === 9 && j === 5);
            return (
              <rect
                key={j}
                x={80 + i * 80 + 6}
                y={310 + j * 84}
                width={48}
                height={72}
                fill={isWaste ? "url(#ooh-waste)" : "var(--mint)"}
                fillOpacity={isWaste ? 0.3 : 0.02}
                stroke="var(--mint)"
                strokeOpacity={isWaste ? 0.3 : 0.08}
                strokeWidth="0.5"
              />
            );
          })}
        </g>
      ))}
      {[
        "M 200 600 C 300 580, 400 700, 500 650",
        "M 600 900 C 700 850, 800 950, 900 900",
        "M 150 1200 C 300 1180, 500 1250, 700 1200",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--mint)"
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />
      ))}
      <rect x={440} y={1650} width={200} height={200} fill="white" fillOpacity="0.9" rx="8" />
      <text x={540} y={1770} textAnchor="middle" fontSize="14" fill="#333" fontFamily="monospace">
        QR CODE
      </text>
    </svg>
  );
}

function OohFrame({
  asset,
  headline,
  subline,
  label,
  showCopy,
}: {
  asset: CloudWasteMediaAsset | null;
  headline: string;
  subline: string;
  label: string;
  showCopy: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-mint uppercase">{label}</p>
      <div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-mint/40">
        <CloudWasteMedia
          asset={asset}
          className="h-full w-full object-cover"
          alt={`Cloud Waste out-of-home ${label}`}
        >
          <OohSVG />
        </CloudWasteMedia>
        {showCopy ? (
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="font-mono text-[12px] tracking-[0.16em] text-mint uppercase">Noros</p>
            </div>
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                {headline}
              </h2>
              <p className="mt-2 text-sm text-neue/70">{subline}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default async function CloudWasteOohPage() {
  const { cloudWaste } = await getSiteContent();
  const frames = [
    { asset: cloudWaste.media.ooh, label: "Frame 1" },
    { asset: cloudWaste.media.oohSecondary, label: "Frame 2" },
  ];
  // If media already carries baked-in copy, skip HTML overlay for that frame.
  const showCopyFor = (asset: CloudWasteMediaAsset | null) => !asset;

  return (
    <CampaignShell title="Cloud Waste — Out-of-Home">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Out-of-Home Concept · Conference Placement
          </p>
          <BoxedTitle size="t2" className="mt-4" lines={["Conference", "OOH Concept"]} />
        </Reveal>
      </GridFrame>

      <GridFrame borders="rb" ink="mint" strength={40}>
        <div className="mx-auto grid max-w-3xl gap-6 p-5 sm:grid-cols-2 sm:gap-8 sm:p-8 md:p-10">
          {frames.map((frame) => (
            <OohFrame
              key={frame.label}
              asset={frame.asset}
              label={frame.label}
              headline={cloudWaste.ooh.headline}
              subline={cloudWaste.ooh.subline}
              showCopy={showCopyFor(frame.asset)}
            />
          ))}
        </div>
      </GridFrame>

      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Art Direction & Placement Spec
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["Placement", cloudWaste.ooh.placement],
              ["Spec", cloudWaste.ooh.spec],
              ["Target conference", cloudWaste.ooh.conference],
              [
                "Visual language",
                "Abstract infrastructure silhouettes — server racks, tangled cables, glowing utilization meters (mint on black). Waste zones shift to red/amber.",
              ],
            ].map(([dt, dd]) => (
              <div key={dt}>
                <dt className="font-mono text-[10px] text-neue/70">{dt}</dt>
                <dd className="mt-1 text-sm text-neue/70">{dd}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </GridFrame>
      <CloudWasteSubNav current="/campaign/cloud-waste/ooh" />
    </CampaignShell>
  );
}
