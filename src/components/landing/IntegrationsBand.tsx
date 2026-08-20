import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";

const clouds = [
  {
    name: "AWS",
    body: "Connect accounts in minutes. Read-only access to cost and usage data.",
  },
  {
    name: "GCP",
    body: "Query spend across projects and billing accounts in the same conversation.",
  },
  {
    name: "Azure",
    body: "Subscriptions and resource groups, explained in plain language.",
  },
];

export function IntegrationsBand() {
  return (
    <section id="integrations" className="scroll-mt-28 bg-section-black py-site">
      <div className="px-site">
        <GridFrame borders="tr" ink="mint" strength={40}>
          <Reveal className="p-5 sm:p-8 md:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
              Integrations
            </p>
            <h2 className="t2 mt-4 text-white">AWS, GCP, and Azure.</h2>
            <p className="t6 mt-4 max-w-xl text-neue">
              One conversation layer on multi-cloud spend. Switch accounts without switching tools.
            </p>
          </Reveal>
        </GridFrame>
        <div className="grid md:grid-cols-3">
          {clouds.map((c) => (
            <GridFrame key={c.name} borders="rb" ink="mint" strength={40}>
              <article className="h-full p-5 sm:p-8">
                <h3 className="text-lg font-medium tracking-tight text-white">{c.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neue">{c.body}</p>
              </article>
            </GridFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
