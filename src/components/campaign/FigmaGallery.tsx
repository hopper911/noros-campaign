import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";

const FIGMA_FILE = "https://www.figma.com/design/CTMlP9TsdTpS9MrKtaAp0m";

const groups = [
  {
    title: "Cover & framework",
    items: ["00-cover.svg", "01-messaging.svg"],
  },
  {
    title: "Landing",
    items: [
      "landing-nav.svg",
      "landing-hero.svg",
      "landing-value.svg",
      "landing-ft01.svg",
      "landing-ft02.svg",
      "landing-ft03.svg",
      "landing-quotes.svg",
      "landing-integrations.svg",
      "landing-pricing.svg",
      "landing-cta.svg",
      "landing-faq.svg",
      "landing-footer.svg",
    ],
  },
  {
    title: "Ads",
    items: ["ad-cfo.svg", "ad-finops.svg", "ad-engineer.svg"],
  },
  {
    title: "Carousel",
    items: [
      "carousel-01.svg",
      "carousel-02.svg",
      "carousel-03.svg",
      "carousel-04.svg",
      "carousel-05.svg",
    ],
  },
  {
    title: "Meet Noros & UI",
    items: ["meet-noros.svg", "ui-hero.svg"],
  },
  {
    title: "Brief · email · event",
    items: ["brief-p1.svg", "brief-p2.svg", "email.svg", "event.svg"],
  },
  {
    title: "Storyboard",
    items: [
      "storyboard-01.svg",
      "storyboard-02.svg",
      "storyboard-03.svg",
      "storyboard-04.svg",
      "storyboard-05.svg",
      "storyboard-06.svg",
    ],
  },
  {
    title: "Launch & announce",
    items: ["launch.svg", "announce-primary.svg", "announce-secondary.svg"],
  },
  {
    title: "Role heroes",
    items: ["role-cfo.svg", "role-finops.svg", "role-engineer.svg"],
  },
] as const;

const labels: Record<string, { label: string; size: string }> = {
  "00-cover.svg": { label: "Cover", size: "1440×900" },
  "01-messaging.svg": { label: "Messaging framework", size: "1440×900" },
  "ad-cfo.svg": { label: "Ad · CFO", size: "1200×628" },
  "ad-finops.svg": { label: "Ad · FinOps", size: "1200×628" },
  "ad-engineer.svg": { label: "Ad · Engineer", size: "1200×628" },
  "carousel-01.svg": { label: "Carousel 01", size: "1080×1080" },
  "carousel-02.svg": { label: "Carousel 02", size: "1080×1080" },
  "carousel-03.svg": { label: "Carousel 03", size: "1080×1080" },
  "carousel-04.svg": { label: "Carousel 04", size: "1080×1080" },
  "carousel-05.svg": { label: "Carousel 05", size: "1080×1080" },
  "meet-noros.svg": { label: "Meet Noros", size: "1440×900" },
  "ui-hero.svg": { label: "UI hero", size: "1440×900" },
  "brief-p1.svg": { label: "Brief p.1", size: "816×1056" },
  "brief-p2.svg": { label: "Brief p.2", size: "816×1056" },
  "email.svg": { label: "Launch email", size: "600×860" },
  "event.svg": { label: "Event screen", size: "1920×1080" },
  "storyboard-01.svg": { label: "Storyboard 01", size: "1920×1080" },
  "storyboard-02.svg": { label: "Storyboard 02", size: "1920×1080" },
  "storyboard-03.svg": { label: "Storyboard 03", size: "1920×1080" },
  "storyboard-04.svg": { label: "Storyboard 04", size: "1920×1080" },
  "storyboard-05.svg": { label: "Storyboard 05", size: "1920×1080" },
  "storyboard-06.svg": { label: "Storyboard 06", size: "1920×1080" },
  "launch.svg": { label: "Launch gallery", size: "1200×600" },
  "announce-primary.svg": { label: "Announce primary", size: "1080×1080" },
  "announce-secondary.svg": { label: "Announce secondary", size: "1440×900" },
  "role-cfo.svg": { label: "Role · CFO", size: "1440×900" },
  "role-finops.svg": { label: "Role · FinOps", size: "1440×900" },
  "role-engineer.svg": { label: "Role · Engineer", size: "1440×900" },
  "landing-nav.svg": { label: "Landing nav", size: "1440×80" },
  "landing-hero.svg": { label: "Landing hero", size: "1440×900" },
  "landing-value.svg": { label: "Landing value", size: "1440×800" },
  "landing-ft01.svg": { label: "Landing FT.01", size: "1440×720" },
  "landing-ft02.svg": { label: "Landing FT.02", size: "1440×720" },
  "landing-ft03.svg": { label: "Landing FT.03", size: "1440×720" },
  "landing-quotes.svg": { label: "Landing quotes", size: "1440×720" },
  "landing-integrations.svg": { label: "Landing integrations", size: "1440×720" },
  "landing-pricing.svg": { label: "Landing pricing", size: "1440×720" },
  "landing-cta.svg": { label: "Landing CTA", size: "1440×800" },
  "landing-faq.svg": { label: "Landing FAQ", size: "1440×900" },
  "landing-footer.svg": { label: "Landing footer", size: "1440×560" },
};

export function FigmaGallery({ disclaimer }: { disclaimer: string }) {
  return (
    <>
      <GridFrame borders="trb" ink="nebula" strength={45} top>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
            Design boards
          </p>
          <h2 className="t2 mt-4 text-white">Campaign kit gallery</h2>
          <p className="t6 mt-4 max-w-2xl text-neue">
            View-only previews of the Noros campaign surfaces — aligned to the North Analyze
            layout language.
          </p>
          <div className="mt-6">
            <a
              href={FIGMA_FILE}
              target="_blank"
              rel="noreferrer"
              className="btn-nav"
            >
              Open in Figma
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] text-neue/70 uppercase">{disclaimer}</p>
        </Reveal>
      </GridFrame>

      {groups.map((group) => (
        <GridFrame key={group.title} borders="rb" ink="nebula" strength={40}>
          <section className="p-5 sm:p-8">
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
              {group.title}
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((file) => {
                const meta = labels[file];
                return (
                  <article key={file} className="min-w-0">
                    <div
                      className="asset-protect relative overflow-hidden border border-white/20 bg-black"
                      data-asset-protect
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/figma-kit/${file}`}
                        alt={meta?.label ?? file}
                        draggable={false}
                        className="pointer-events-none h-auto w-full select-none"
                      />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-medium text-white">{meta?.label ?? file}</h4>
                      <span className="shrink-0 font-mono text-[10px] tracking-[0.08em] text-neue/70 uppercase">
                        {meta?.size}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </GridFrame>
      ))}
    </>
  );
}
