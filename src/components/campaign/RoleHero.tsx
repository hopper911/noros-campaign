import { ProductMock } from "@/components/ui/ProductMock";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import type { AudienceContent } from "@/lib/site-content";
import Link from "next/link";

type Audience = AudienceContent;

export function RoleHero({ audience }: { audience: Audience }) {
  const headline = audience.headline.split(". ");
  const lines =
    headline.length > 1
      ? [headline[0] + ".", headline.slice(1).join(". ")]
      : [audience.headline];

  return (
    <GridFrame borders="rb" ink="mint" strength={40}>
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={audience.heroImageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_32%] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />
        <Reveal className="relative p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Noros for {audience.shortLabel}
          </p>
          <BoxedTitle size="t2" className="mt-4" lines={lines} />
          <p className="t6 mt-6 max-w-xl text-white/90">{audience.subhead}</p>
          <ul className="mt-6 max-w-xl space-y-2 font-mono text-[11px] tracking-[0.04em] text-neue uppercase">
            {audience.proofPoints.map((p) => (
              <li key={p}>— {p}</li>
            ))}
          </ul>
          <div className="accent-mint mt-8 max-w-[36rem]">
            <div className="button-rail flex min-h-12 flex-col items-stretch gap-1.5 rounded-[2rem] p-1 sm:h-14 sm:flex-row sm:rounded-[8rem] sm:p-1.5">
              <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-trial">
                {audience.cta}
              </Link>
              <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-demo">
                Meet Noros
              </Link>
            </div>
          </div>
          <div className="mt-10">
            <ProductMock autoPlay />
          </div>
        </Reveal>
      </div>
    </GridFrame>
  );
}
