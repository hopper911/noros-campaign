"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CampaignNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav
      className="mx-auto flex max-w-[1440px] flex-nowrap gap-1 overflow-x-auto overscroll-x-contain px-site pb-3 [-webkit-overflow-scrolling:touch]"
      aria-label="Campaign kit"
    >
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className="nav-item shrink-0"
            data-open={active ? "true" : undefined}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
