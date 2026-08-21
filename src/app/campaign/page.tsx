import { CampaignShell } from "@/components/campaign/CampaignShell";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import { boxedLines } from "@/lib/site-content";
import Link from "next/link";

const kitLinks = [
  ["/campaign/ads", "Three role ads"],
  ["/campaign/carousel", "LinkedIn carousel"],
  ["/campaign/brief", "Solution brief"],
  ["/campaign/email", "Launch email"],
  ["/campaign/event", "Event screen"],
  ["/campaign/storyboard", "30s storyboard"],
  ["/campaign/launch", "Product Hunt pack"],
  ["/campaign/announce", "Exec announcement"],
  ["/campaign/ui", "Product UI graphic"],
  ["/campaign/meet", "Meet Noros hero"],
  ["/campaign/cloud-waste", "Cloud waste campaign"],
  ["/campaign/figma", "Figma boards"],
] as const;

function CellArrow() {
  return (
    <svg
      className="absolute top-4 right-4 h-5 w-5 text-black/70"
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

export default async function CampaignHubPage() {
  const { campaignLine, disclaimer, audiences } = await getSiteContent();
  const surfaces = kitLinks;
  const seats = Object.values(audiences);

  return (
    <CampaignShell title="Campaign concept & messaging">
      <GridFrame borders="trb" ink="nebula" strength={50} top>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Application add-on · Noros
          </p>
          <BoxedTitle size="t2" className="mt-4" lines={boxedLines(campaignLine)} />
          <p className="t6 mt-6 max-w-2xl text-neue">
            An independently initiated launch campaign that translates the Noros AI FinOps
            product for three audiences. Demonstrates intentional interest, fast iteration,
            and buyer-adaptive storytelling—not a fourth large case study.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.04em] text-neue/70 uppercase">
            {disclaimer}
          </p>
          <div className="accent-mint mt-8 max-w-[36rem]">
            <div className="button-rail flex h-12 items-stretch gap-1.5 rounded-[8rem] p-1 sm:h-12 sm:p-1.5">
              <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-trial">
                Meet Noros
              </Link>
              <Link href="/campaign/meet" className="hero-cta hero-cta-compact hero-cta-demo">
                Free Demo
              </Link>
            </div>
          </div>
        </Reveal>
      </GridFrame>

      {/* Three seats — section header like Analyze grid blocks */}
      <GridFrame borders="rb" ink="nebula" strength={50}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.16em] text-nebula-light uppercase">
            Three seats
          </p>
          <h2 className="t2 mt-3 text-white uppercase">Built for every operator.</h2>
          <p className="t6 mt-4 max-w-xl text-neue">
            One campaign line, three role heroes — CFO, FinOps, and Engineering.
          </p>
        </Reveal>
      </GridFrame>

      <RevealStagger className="mt-0 grid min-w-0 lg:grid-cols-3">
        {seats.map((a, i) => (
          <RevealItem key={a.id}>
            <GridFrame borders="rb" ink="nebula" strength={50}>
              <article className="flex h-full flex-col p-5 sm:p-8">
                <div className="font-mono text-[11px] tracking-[0.14em] text-nebula-light uppercase">
                  {String(i + 1).padStart(2, "0")} · {a.label}
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-tight text-white sm:text-2xl">
                  {a.headline}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neue">{a.emphasis}</p>
                <ul className="mt-4 space-y-1.5 font-mono text-[11px] tracking-[0.04em] text-neue/80 uppercase">
                  {a.proofPoints.map((p) => (
                    <li key={p}>— {p}</li>
                  ))}
                </ul>
                <Link
                  href={`/campaign/${a.id === "engineer" ? "engineers" : a.id}`}
                  className={`relative mt-8 flex min-h-14 flex-col justify-end p-4 text-black transition hover:brightness-95 ${
                    i % 2 === 0 ? "bg-nebula-light" : "bg-nebula"
                  }`}
                >
                  <CellArrow />
                  <span className="font-mono text-[10px] tracking-[0.14em] uppercase">
                    Open role
                  </span>
                  <span className="mt-1 text-lg font-medium tracking-tight">Role hero</span>
                </Link>
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>

      {/* Kit surfaces — each link as a grid cell, Analyze-style */}
      <GridFrame borders="rb" ink="nebula" strength={50}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.16em] text-nebula-light uppercase">
            Kit surfaces
          </p>
          <h2 className="t2 mt-3 max-w-3xl text-white uppercase">{campaignLine}</h2>
          <p className="t6 mt-4 max-w-xl text-neue">
            Every campaign surface in one kit — open any board to review the concept.
          </p>
        </Reveal>
      </GridFrame>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {surfaces.map(([href, label], i) => (
          <GridFrame key={href} borders="rb" ink="nebula" strength={45}>
            <Link
              href={href}
              className="group relative flex min-h-[7.5rem] flex-col justify-between p-5 transition hover:bg-white/[0.03] sm:min-h-[8.5rem] sm:p-6"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] text-nebula-light uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pr-8 text-base font-medium tracking-tight text-white group-hover:text-nebula-light sm:text-lg">
                {label}
              </span>
              <span
                className="pointer-events-none absolute top-5 right-5 text-nebula-light opacity-60 transition group-hover:opacity-100"
                aria-hidden
              >
                ↗
              </span>
            </Link>
          </GridFrame>
        ))}
      </div>
    </CampaignShell>
  );
}
