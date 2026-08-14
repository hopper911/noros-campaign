import type { audiences } from "@/lib/messaging";
import { CAMPAIGN_LINE } from "@/lib/messaging";

type Audience = (typeof audiences)[keyof typeof audiences];

export function RoleHero({ audience }: { audience: Audience }) {
  return (
    <div className="kit-frame overflow-hidden bg-black constellation">
      <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:items-end md:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="relative">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
            Noros for {audience.shortLabel}
          </div>
          <h2 className="t3 mt-3 max-w-[16ch] text-white">{audience.headline}</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neue md:text-base">
            {audience.subhead}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-neue">
            {audience.proofPoints.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-mint">✦</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="btn-primary">{audience.cta}</span>
            <span className="btn-ghost border-white/25 text-white">Meet Noros</span>
          </div>
        </div>
        <div className="relative rounded-2xl border border-white/10 bg-zenit p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-neue/70">
            Campaign line
          </div>
          <p className="mt-2 text-xl font-medium tracking-tight text-white">{CAMPAIGN_LINE}</p>
          <p className="mt-3 text-xs text-neue">{audience.emphasis}</p>
        </div>
      </div>
    </div>
  );
}
