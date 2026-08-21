import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import type { LandingContent } from "@/lib/site-content";
import Link from "next/link";

function CtaArrow() {
  return (
    <svg
      className="absolute top-4 right-4 h-7 w-7 text-black/80"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 20L20 8M20 8H11M20 8V17"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0.1 3.2"
      />
    </svg>
  );
}

function parseCtaLabel(label: string): { eyebrow: string; title: string } {
  const trial = /free\s*trial/i.exec(label);
  if (trial) {
    return { eyebrow: "Start your", title: "Free trial" };
  }
  const demo = /free\s*demo|demo/i.exec(label);
  if (demo) {
    return { eyebrow: "Schedule a", title: "Free Demo" };
  }
  const parts = label.trim().split(/\s+/);
  if (parts.length > 1) {
    return { eyebrow: parts.slice(0, -1).join(" "), title: parts[parts.length - 1]! };
  }
  return { eyebrow: "", title: label };
}

export function ClosingCta({
  cta,
}: {
  cta: LandingContent["cta"];
  /** Kept for CMS compatibility; Analyze closing CTA is type-led, no photo. */
  imageUrl?: string;
}) {
  const primary = parseCtaLabel(cta.primary);
  const secondary = parseCtaLabel(cta.secondary);

  return (
    <section className="bg-section-black py-site">
      <div className="px-site">
        <GridFrame borders="trb" ink="nebula" strength={55} top>
          <Reveal className="p-5 sm:p-8 md:p-10">
            <BoxedTitle size="t2" lines={[cta.title]} />
          </Reveal>
        </GridFrame>

        <div className="grid md:grid-cols-2">
          <GridFrame borders="rb" ink="nebula" strength={55}>
            <div className="flex h-full items-end p-5 sm:p-8 md:p-10">
              <p className="t6 max-w-md text-neue">{cta.body}</p>
            </div>
          </GridFrame>

          <div className="grid sm:grid-cols-2">
            <GridFrame borders="rb" ink="nebula" strength={55}>
              <Link
                href="/campaign/meet"
                className="relative flex min-h-[9rem] flex-col justify-end bg-nebula-light p-5 text-black transition hover:brightness-95 sm:min-h-[11rem] sm:p-6 md:min-h-[12rem]"
              >
                <CtaArrow />
                {primary.eyebrow ? (
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
                    {primary.eyebrow}
                  </span>
                ) : null}
                <span className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
                  {primary.title}
                </span>
              </Link>
            </GridFrame>
            <GridFrame borders="rb" ink="nebula" strength={55}>
              <Link
                href="/campaign/meet"
                className="relative flex min-h-[9rem] flex-col justify-end bg-nebula p-5 text-black transition hover:brightness-110 sm:min-h-[11rem] sm:p-6 md:min-h-[12rem]"
              >
                <CtaArrow />
                {secondary.eyebrow ? (
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
                    {secondary.eyebrow}
                  </span>
                ) : null}
                <span className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">
                  {secondary.title}
                </span>
              </Link>
            </GridFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
