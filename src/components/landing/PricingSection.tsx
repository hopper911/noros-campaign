import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

const tiers = [
  {
    name: "14-day trial",
    price: "Free",
    body: "Read-only connect. Answers within hours—not another quarter of exports.",
    cta: "Start trial",
  },
  {
    name: "Team",
    price: "Talk to us",
    body: "FinOps, finance, and engineering in one workspace. Slack delivery included.",
    cta: "Free Demo",
  },
  {
    name: "Enterprise",
    price: "Custom",
    body: "SSO, dedicated support, and multi-account governance at scale.",
    cta: "Meet Noros",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-28 bg-section-black py-site">
      <div className="px-site">
        <GridFrame borders="tr" ink="mint" strength={40}>
          <Reveal className="p-5 sm:p-8 md:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              Pricing
            </p>
            <h2 className="t2 mt-4 text-white">Start in five minutes.</h2>
            <p className="t6 mt-4 max-w-xl text-neue">
              Portfolio demo—no live checkout. Every plan opens the Noros console.
            </p>
          </Reveal>
        </GridFrame>
        <div className="grid md:grid-cols-3">
          {tiers.map((t) => (
            <GridFrame key={t.name} borders="rb" ink="mint" strength={40}>
              <article className="flex h-full flex-col p-5 sm:p-8">
                <p className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
                  {t.name}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">{t.price}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neue">{t.body}</p>
                <Link href="/campaign/meet" className="btn-nav mt-6 w-fit">
                  {t.cta}
                </Link>
              </article>
            </GridFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
