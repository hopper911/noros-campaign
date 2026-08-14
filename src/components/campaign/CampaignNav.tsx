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
    <div className="mx-auto flex max-w-[1600px] flex-wrap gap-1.5 px-site pb-3">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-full border px-3 py-1.5 text-[11px] leading-none ${
              active
                ? "border-mint/70 bg-mint/10 text-mint"
                : "border-white/15 text-neue hover:border-mint/50 hover:text-mint"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
