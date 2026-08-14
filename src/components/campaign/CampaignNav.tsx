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
    <nav className="mx-auto flex max-w-[1440px] flex-wrap gap-1 px-site pb-3" aria-label="Campaign kit">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className="nav-item"
            data-open={active ? "true" : undefined}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
