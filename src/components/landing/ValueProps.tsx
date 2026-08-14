import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";
import { landingCopy } from "@/lib/messaging";

export function ValueProps() {
  const { value } = landingCopy;
  return (
    <section className="bigStatement bg-section-mint py-site">
      <div className="px-site">
        <GridFrame borders="trl" ink="black" strength={50}>
          <div className="relative min-h-[28rem] overflow-hidden p-6 md:min-h-[36rem] md:p-10">
            <HeaderBar />
            <div className="pointer-events-none absolute top-10 right-6 w-[40%] max-w-[20rem] md:top-16 md:right-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/north/shard.png" alt="" className="w-full object-contain" />
            </div>
            <Reveal className="relative mt-10 max-w-[52rem]">
              <BoxedTitle
                size="t1"
                align="split"
                lines={[value.eyebrow.split(".")[0] + ".", "Sharper decisions."]}
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
