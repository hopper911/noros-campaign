import { CampaignShell } from "@/components/campaign/CampaignShell";
import { DISCLAIMER } from "@/lib/messaging";

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

export default function FigmaBoardsPage() {
  return (
    <CampaignShell title="Figma design boards">
      <div className="kit-frame p-6 md:p-8">
        <p className="text-sm text-muted">
          Figma file created for exportable campaign frames. Cover + messaging framework
          boards are in-file; remaining frames mirror the Next.js kit compositions below
          (Starter MCP rate limit paused further writes).
        </p>
        <a
          href="https://www.figma.com/design/CTMlP9TsdTpS9MrKtaAp0m"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex text-sm text-nebula-bright hover:underline"
        >
          Open Noros Campaign Kit — Portfolio →
        </a>
        <ul className="mt-8 space-y-2 text-sm text-star/85">
          {frames.map((f) => (
            <li key={f} className="border-l border-nebula/30 pl-3">
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[11px] text-muted">{DISCLAIMER}</p>
      </div>
    </CampaignShell>
  );
}
