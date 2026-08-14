"use client";

import { NorthLogo } from "@/components/north/Marks";
import Link from "next/link";
import { useState } from "react";

const features = {
  Manage: ["AI Agent", "Coststreams", "Analyze", "Anomalies", "GreenOps"],
  Optimize: ["Coverage", "Rightsize", "TokenFlow"],
};

const integrations = ["AWS", "GCP", "Azure"];

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="desktopMenu-content flex items-center justify-between gap-4 px-site py-3">
        <Link href="/" className="logo-link text-white" aria-label="Home">
          <NorthLogo />
        </Link>

        <nav className="menu-nav hidden items-center gap-7 text-[12px] font-medium tracking-[0.12em] text-white lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setOpen("features")}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 uppercase"
              aria-haspopup="true"
            >
              Features
              <svg className="h-2.5 w-2.5" aria-hidden>
                <use href="#dropdown" />
              </svg>
            </button>
            {open === "features" && (
              <div className="absolute top-full left-0 z-50 min-w-[16rem] border border-white/10 bg-black p-5">
                {Object.entries(features).map(([group, items]) => (
                  <div key={group} className="mb-4 last:mb-0">
                    <div className="mb-2 text-[11px] tracking-[0.14em] text-neue uppercase">
                      {group}
                    </div>
                    <ul className="space-y-1.5 text-[12px] tracking-normal text-white">
                      {items.map((item) => (
                        <li key={item}>
                          <a href="#features" className="hover:text-mint">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpen("integrations")}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 uppercase"
              aria-haspopup="true"
            >
              Integrations
              <svg className="h-2.5 w-2.5" aria-hidden>
                <use href="#dropdown" />
              </svg>
            </button>
            {open === "integrations" && (
              <div className="absolute top-full left-0 z-50 min-w-[10rem] border border-white/10 bg-black p-4">
                <ul className="space-y-1.5 text-[12px] tracking-normal">
                  {integrations.map((item) => (
                    <li key={item}>
                      <a href="#integrations" className="hover:text-mint">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <a href="#why" className="uppercase hover:text-mint">
            Why North
          </a>
          <a href="#pricing" className="uppercase hover:text-mint">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#sign-in" className="btn-nav hidden sm:inline-flex">
            Sign In
          </a>
          <a href="#demo" className="btn-nav">
            Free Demo
          </a>
          <a href="#trial" className="btn-trial">
            Free trial
          </a>
        </div>
      </div>
    </header>
  );
}
