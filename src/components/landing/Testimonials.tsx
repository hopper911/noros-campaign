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
        <GridFrame borders="trb" ink="mint" strength={50}>
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
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </GridFrame>

        <Reveal>
          <div className="mt-0 grid md:grid-cols-3">
            {testimonials.items.map((t) => (
              <GridFrame key={t.name} borders="rb" ink="mint" strength={40}>
                <blockquote className="h-full p-6 md:p-8">
                  <p className="text-[15px] leading-relaxed text-neue">“{t.quote}”</p>
                  <footer className="mt-6">
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="mt-1 text-xs text-neue/70">{t.role}</div>
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
