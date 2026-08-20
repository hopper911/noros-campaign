import { GridFrame } from "@/components/north/GridFrame";
import Link from "next/link";

const links = [
  ["/campaign/cloud-waste/report", "Lead-gen Report"],
  ["/campaign/cloud-waste/ads", "Ads & Email"],
  ["/campaign/cloud-waste/webinar", "Webinar & Deck"],
  ["/campaign/cloud-waste/ooh", "Out-of-Home"],
  ["/campaign/cloud-waste/dashboard", "Dashboard"],
] as const;

export function CloudWasteSubNav({ current }: { current?: string }) {
  return (
    <GridFrame borders="rb" ink="mint" strength={40}>
      <nav aria-label="Cloud Waste campaign pages" className="flex flex-wrap gap-2 p-5 sm:p-8">
        {links.map(([href, label]) => {
          const active = current === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "rounded-full border border-mint bg-mint/15 px-4 py-2 font-mono text-[10px] tracking-[0.08em] text-mint uppercase"
                  : "rounded-full border border-mint/30 px-4 py-2 font-mono text-[10px] tracking-[0.08em] text-mint uppercase hover:bg-mint/10"
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </GridFrame>
  );
}
