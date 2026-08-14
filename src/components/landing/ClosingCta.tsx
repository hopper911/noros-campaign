import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import type { LandingContent } from "@/lib/site-content";
import Link from "next/link";

export function ClosingCta({ cta }: { cta: LandingContent["cta"] }) {
  return (
    <section className="bg-section-black py-site">
      <div className="px-site">
        <GridFrame borders="trb" ink="mint" strength={50}>
          <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[28rem] md:min-h-[36rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/north/get-started.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <Reveal className="relative flex h-full min-h-[22rem] flex-col justify-between p-4 sm:min-h-[28rem] sm:p-6 md:min-h-[36rem] md:p-10">
              <BoxedTitle size="t2" lines={[cta.title]} />
              <div>
                <p className="t6 max-w-xl text-white">{cta.body}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/campaign/meet" className="btn-nebula">
                    {cta.primary}
                  </Link>
                  <Link href="/campaign/meet" className="btn-ghost border-white/50 text-white">
                    {cta.secondary}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </GridFrame>
      </div>
    </section>
  );
}
