import { CampaignShell } from "@/components/campaign/CampaignShell";
import {
  CAMPAIGN_LINE,
  DISCLAIMER,
  audiences,
} from "@/lib/messaging";
import Link from "next/link";

export default function CampaignHubPage() {
  return (
    <CampaignShell title="Campaign concept & messaging">
      <div className="kit-frame p-6 md:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
          Application add-on · Noros
        </p>
        <h2 className="t3 mt-3 text-white">{CAMPAIGN_LINE}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neue">
          An independently initiated launch campaign that translates the Noros AI FinOps
          product for three audiences. Demonstrates intentional interest, fast iteration,
          and buyer-adaptive storytelling—not a fourth large case study.
        </p>
        <p className="mt-4 text-xs text-neue/70">{DISCLAIMER}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {(Object.values(audiences) as (typeof audiences)[keyof typeof audiences][]).map(
            (a) => (
              <article
                key={a.id}
                className="rounded-xl border border-white/10 bg-black/40 p-5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
                  {a.label}
                </div>
                <h3 className="mt-2 font-medium text-white">{a.headline}</h3>
                <p className="mt-2 text-xs leading-relaxed text-neue">{a.emphasis}</p>
                <ul className="mt-4 space-y-1.5 text-xs text-neue">
                  {a.proofPoints.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
                <Link
                  href={`/campaign/${a.id === "engineer" ? "engineers" : a.id}`}
                  className="mt-4 inline-block text-xs text-mint hover:underline"
                >
                  Role hero →
                </Link>
              </article>
            ),
          )}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
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
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white hover:border-mint/40"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </CampaignShell>
  );
}
