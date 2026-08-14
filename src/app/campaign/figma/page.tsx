import { CampaignShell } from "@/components/campaign/CampaignShell";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";

const frames = [
  "00 Cover (created in Figma)",
  "01 Messaging Framework (created in Figma)",
  "Ad · CFO / FinOps / Engineer — mirror /campaign/ads",
  "Carousel 01–05 — mirror /campaign/carousel",
  "Meet Noros hero — mirror /campaign/meet",
  "Product UI hero — mirror /campaign/ui",
  "Solution brief pp.1–2 — mirror /campaign/brief",
  "Launch email — mirror /campaign/email",
  "Event 1920×1080 — mirror /campaign/event",
  "Storyboard 6 panels — mirror /campaign/storyboard",
  "PH launch + exec announce — mirror /campaign/launch + /announce",
  "Role heroes — mirror /campaign/cfo · /finops · /engineers",
];

export default async function FigmaBoardsPage() {
  const { disclaimer } = await getSiteContent();
  return (
    <CampaignShell title="Figma design boards">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
            Exportable campaign frames
          </p>
          <p className="t6 mt-4 max-w-2xl text-neue">
            Figma file created for exportable campaign frames. Cover + messaging framework
            boards are in-file; remaining frames mirror the Next.js kit compositions below.
          </p>
          <a
            href="https://www.figma.com/design/CTMlP9TsdTpS9MrKtaAp0m"
            target="_blank"
            rel="noreferrer"
            className="btn-nav mt-6"
          >
            Open Figma file
          </a>
          <ul className="mt-8 space-y-2 text-[15px] text-neue">
            {frames.map((f) => (
              <li key={f} className="border-l border-mint/40 pl-3">
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[11px] text-neue/70 uppercase">{disclaimer}</p>
        </Reveal>
      </GridFrame>
    </CampaignShell>
  );
}
