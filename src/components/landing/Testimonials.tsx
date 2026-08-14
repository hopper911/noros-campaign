import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { landingCopy } from "@/lib/messaging";

export function Testimonials() {
  const { testimonials } = landingCopy;
  return (
    <section id="why" className="bg-section-black py-site">
      <div className="px-site">
        <GridFrame borders="trb" ink="mint" strength={50}>
          <div className="p-6 md:p-10">
            <BoxedTitle
              size="t5"
              align="split"
              lines={["An AI teammate", "that pulls its weight."]}
            />
            <div className="relative mt-8 min-h-[7rem] overflow-hidden aspect-[16/8] md:aspect-[2560/920]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/north/quotes.png"
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
