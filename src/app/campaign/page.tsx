import { CampaignShell } from "@/components/campaign/CampaignShell";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { CAMPAIGN_LINE, DISCLAIMER, audiences } from "@/lib/messaging";
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
  ["/campaign/figma", "Figma boards"],
] as const;

export default function CampaignHubPage() {
  return (
    <CampaignShell title="Campaign concept & messaging">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Application add-on · Noros
          </p>
          <BoxedTitle
            size="t2"
            className="mt-4"
            lines={["Ask your cloud", "what it costs—and why."]}
          />
          <p className="t6 mt-6 max-w-2xl text-neue">
            An independently initiated launch campaign that translates the Noros AI FinOps
            product for three audiences. Demonstrates intentional interest, fast iteration,
            and buyer-adaptive storytelling—not a fourth large case study.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.04em] text-neue/70 uppercase">
            {DISCLAIMER}
          </p>
          <div className="accent-mint mt-8 max-w-[36rem]">
            <div className="button-rail flex h-14 items-stretch gap-2 rounded-[8rem] p-1.5 sm:h-16 sm:p-2 md:h-24 md:gap-4 md:p-4">
              <Link href="/campaign/meet" className="hero-cta hero-cta-trial">
                Meet Noros
              </Link>
              <Link href="/campaign/meet" className="hero-cta hero-cta-demo">
                Free Demo
              </Link>
            </div>
          </div>
        </Reveal>
      </GridFrame>

      <RevealStagger className="mt-0 grid min-w-0 lg:grid-cols-3">
        {(Object.values(audiences) as (typeof audiences)[keyof typeof audiences][]).map(
          (a) => (
            <RevealItem key={a.id}>
              <GridFrame borders="rb" ink="mint" strength={40}>
                <article className="h-full p-5 sm:p-8">
                  <div className="font-mono text-[11px] tracking-[0.14em] text-mint uppercase">
                    {a.label}
                  </div>
                  <h3 className="mt-3 text-lg font-medium tracking-tight text-white">
                    {a.headline}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neue">{a.emphasis}</p>
                  <ul className="mt-4 space-y-1.5 font-mono text-[11px] tracking-[0.04em] text-neue uppercase">
                    {a.proofPoints.map((p) => (
                      <li key={p}>— {p}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/campaign/${a.id === "engineer" ? "engineers" : a.id}`}
                    className="btn-nav mt-6"
                  >
                    Role hero
                  </Link>
                </article>
              </GridFrame>
            </RevealItem>
          ),
        )}
      </RevealStagger>

      <GridFrame borders="rb" ink="mint" strength={40}>
        <div className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
            Kit surfaces · {CAMPAIGN_LINE}
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {kitLinks.map(([href, label]) => (
              <Link key={href} href={href} className="nav-item w-full justify-start">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </GridFrame>
    </CampaignShell>
  );
}
