import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { boxedLines, type LandingContent } from "@/lib/site-content";

export function ValueProps({
  value,
  imageUrl,
}: {
  value: LandingContent["value"];
  imageUrl: string;
}) {
  return (
    <section className="bigStatement bg-section-mint py-site">
      <div className="px-site">
        <GridFrame borders="trl" ink="black" strength={50}>
          <div className="relative min-h-0 overflow-hidden p-4 sm:min-h-[28rem] sm:p-6 md:min-h-[36rem] md:p-10">
            <div className="pointer-events-none absolute top-10 right-4 hidden w-[32%] max-w-[20rem] sm:block md:top-16 md:right-16 md:w-[40%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="" aria-hidden="true" className="w-full object-contain" />
            </div>
            <Reveal className="relative max-w-[52rem]">
              <BoxedTitle
                size="t1"
                align="split"
                className="[&_.headline-line]:text-black"
                lines={boxedLines(value.eyebrow)}
              />
              <p className="t6 mt-8 max-w-[34rem] text-black/80">
                Ask anything about your cloud spend in plain language, with no queries,
                exports, or waiting.
              </p>
            </Reveal>
            <div className="relative mt-12 grid gap-8 border-t border-black/20 pt-8 md:grid-cols-3">
              {value.items.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-medium tracking-tight text-black">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-black/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </GridFrame>
      </div>
    </section>
  );
}
