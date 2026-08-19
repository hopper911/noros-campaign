import { CampaignNav } from "@/components/campaign/CampaignNav";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteNav } from "@/components/landing/SiteNav";
import Link from "next/link";

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
  { href: "/campaign/cloud-waste", label: "Cloud Waste" },
];

export function CampaignShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <div className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1440px] items-baseline gap-3 px-site py-3">
          <Link
            href="/"
            className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-neue uppercase hover:text-white"
          >
            ← Home
          </Link>
          <h1 className="min-w-0 truncate text-sm font-medium tracking-tight text-white sm:text-base">
            {title}
          </h1>
        </div>
        <CampaignNav links={links} />
      </div>
      <main id="main-content" className="min-w-0 overflow-x-clip bg-black px-site py-site">{children}</main>
      <SiteFooter />
    </>
  );
}
