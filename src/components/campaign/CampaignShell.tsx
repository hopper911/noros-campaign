import Link from "next/link";
import { CAMPAIGN_LINE } from "@/lib/messaging";

const links = [
  { href: "/campaign", label: "Framework" },
  { href: "/campaign/meet", label: "Meet Noros" },
  { href: "/campaign/ads", label: "Ads" },
  { href: "/campaign/carousel", label: "Carousel" },
  { href: "/campaign/ui", label: "UI Hero" },
  { href: "/campaign/brief", label: "Brief" },
  { href: "/campaign/email", label: "Email" },
  { href: "/campaign/event", label: "Event" },
  { href: "/campaign/storyboard", label: "Storyboard" },
  { href: "/campaign/launch", label: "Launch" },
  { href: "/campaign/announce", label: "Announce" },
  { href: "/campaign/figma", label: "Figma" },
  { href: "/campaign/cfo", label: "CFO" },
  { href: "/campaign/finops", label: "FinOps" },
  { href: "/campaign/engineers", label: "Engineers" },
];

export function CampaignShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-neue">
      <div className="no-print border-b border-white/10 bg-zenit/80">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-site py-4">
          <div>
            <Link href="/" className="text-xs text-neue/70 hover:text-mint">
              ← Landing recreation
            </Link>
            <h1 className="mt-1 text-xl font-medium tracking-tight text-white">{title}</h1>
            <p className="text-xs text-neue/70">{CAMPAIGN_LINE}</p>
          </div>
          <Link href="/campaign" className="btn-ghost !h-10 !px-4 text-xs border-white/20 text-white">
            Kit hub
          </Link>
        </div>
        <div className="mx-auto flex max-w-[1600px] gap-1 overflow-x-auto overscroll-x-contain px-site pb-3 [-webkit-overflow-scrolling:touch]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-[11px] text-neue hover:border-mint/50 hover:text-mint"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] min-w-0 overflow-x-clip px-site py-10 md:py-14">{children}</div>
    </div>
  );
}
