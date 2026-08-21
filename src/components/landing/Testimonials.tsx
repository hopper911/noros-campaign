import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { boxedLines, type LandingContent } from "@/lib/site-content";

export function Testimonials({
  testimonials,
  imageUrl,
}: {
  testimonials: LandingContent["testimonials"];
  imageUrl: string;
}) {
  return (
    <section id="why" className="scroll-mt-28 bg-section-black py-site">
      <div className="px-site">
        <GridFrame borders="trb" ink="nebula" strength={50} top>
          <div className="p-6 md:p-10">
            <BoxedTitle
              size="t5"
              align="split"
              lines={boxedLines(testimonials.title)}
            />
            <div className="relative mt-8 min-h-[7rem] overflow-hidden aspect-[16/8] md:aspect-[2560/920]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </GridFrame>

        <Reveal>
          <div className="mt-0 grid md:grid-cols-3">
            {testimonials.items.map((t) => (
              <GridFrame key={t.name} borders="rb" ink="nebula" strength={45}>
                <blockquote className="flex h-full flex-col justify-between gap-8 p-6 md:p-8">
                  <p className="font-mono text-[12px] leading-[1.55] tracking-[0.04em] text-neue uppercase sm:text-[13px]">
                    “{t.quote}”
                  </p>
                  <footer className="font-mono text-[11px] leading-snug tracking-[0.06em] text-neue/80 uppercase">
                    — {t.name} / {t.role}
                  </footer>
                </blockquote>
              </GridFrame>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
