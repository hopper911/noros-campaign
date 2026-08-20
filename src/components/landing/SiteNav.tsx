"use client";

import { NorthLogo } from "@/components/north/Marks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const features = {
  Manage: ["AI Agent", "Coststreams", "Analyze", "Anomalies", "GreenOps"],
  Optimize: ["Coverage", "Rightsize", "TokenFlow"],
};

const integrations = ["AWS", "GCP", "Azure", "All Integrations"];

function GridIcon() {
  return (
    <svg className="nav-grid h-2.5 w-2.5" aria-hidden>
      <use href="#grid" />
    </svg>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const root = mobileNavRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (open) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (featuresRef.current?.contains(target)) return;
      if (integrationsRef.current?.contains(target)) return;
      setOpen(null);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  const closeMenu = () => setMenuOpen(false);

  const toggleDesktop = (id: string) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="flex min-w-0 items-center justify-between gap-2 px-site py-3 md:gap-4">
        <Link
          href="/"
          className="logo-link inline-flex min-h-11 min-w-11 shrink-0 items-center text-white"
          aria-label="Home"
        >
          <NorthLogo />
        </Link>

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          <nav className="menu-nav hidden items-center gap-1 text-white lg:flex" aria-label="Primary">
            <div
              ref={featuresRef}
              className="relative"
              onMouseEnter={() => setOpen("features")}
              onMouseLeave={() => setOpen(null)}
            >
              <button
                type="button"
                className="nav-item"
                data-open={open === "features"}
                aria-haspopup="true"
                aria-expanded={open === "features"}
                aria-controls="features-menu"
                onClick={() => toggleDesktop("features")}
              >
                Features
                <GridIcon />
              </button>
              {open === "features" && (
                <div
                  id="features-menu"
                  role="region"
                  aria-label="Features"
                  className="absolute top-full left-0 z-50 min-w-[15rem] rounded-xl border border-white/25 bg-black/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                >
                  {Object.entries(features).map(([group, items]) => (
                    <div key={group} className="mb-3 last:mb-0">
                      <div className="mb-2 font-mono text-[10px] tracking-[0.16em] text-neue uppercase">
                        {group}
                      </div>
                      <ul className="space-y-1.5 font-mono text-[11px] tracking-[0.08em] text-neue uppercase">
                        {items.map((item) => (
                          <li key={item}>
                            <Link
                              href="/#features"
                              className="flex min-h-11 items-center rounded px-1 py-2 hover:text-white focus-visible:text-white"
                              onClick={() => setOpen(null)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              ref={integrationsRef}
              className="relative"
              onMouseEnter={() => setOpen("integrations")}
              onMouseLeave={() => setOpen(null)}
            >
              <button
                type="button"
                className="nav-item"
                data-open={open === "integrations"}
                aria-haspopup="true"
                aria-expanded={open === "integrations"}
                aria-controls="integrations-menu"
                onClick={() => toggleDesktop("integrations")}
              >
                Integrations
                <GridIcon />
              </button>
              {open === "integrations" && (
                <div
                  id="integrations-menu"
                  role="region"
                  aria-label="Integrations"
                  className="absolute top-full left-0 z-50 min-w-[12rem] rounded-xl border border-white/25 bg-black/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                >
                  <ul className="space-y-2 font-mono text-[11px] tracking-[0.1em] text-neue uppercase">
                    {integrations.map((item) => (
                      <li key={item}>
                        <Link
                          href="/#integrations"
                          className="flex min-h-11 items-center rounded px-1 py-2 hover:text-white focus-visible:text-white"
                          onClick={() => setOpen(null)}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link href="/#why" className="nav-item">
              Why North
            </Link>
            <Link href="/#pricing" className="nav-item">
              Pricing
            </Link>
            <Link href="/campaign" className="nav-item">
              Campaign
            </Link>
          </nav>

          <Link href="/campaign/meet" className="btn-nav hidden lg:inline-flex">
            Sign In
          </Link>
          <Link href="/campaign/meet" className="btn-nav hidden md:inline-flex">
            Free Demo
          </Link>
          <Link href="/campaign/meet" className="btn-trial hidden sm:inline-flex">
            Free trial
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              {menuOpen ? (
                <path
                  d="M4 4L14 14M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M3 5h12M3 9h12M3 13h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          className="max-h-[min(80vh,32rem)] overflow-y-auto border-t border-white/25 bg-black px-site py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            <p className="px-2 pt-1 font-mono text-[10px] tracking-[0.16em] text-neue uppercase">
              Features
            </p>
            {Object.values(features)
              .flat()
              .map((item) => (
                <Link
                  key={item}
                  href="/#features"
                  className="rounded-lg px-2 py-3 font-mono text-[12px] tracking-[0.08em] text-white uppercase"
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              ))}
            <p className="mt-3 px-2 font-mono text-[10px] tracking-[0.16em] text-neue uppercase">
              Integrations
            </p>
            {integrations.map((item) => (
              <Link
                key={item}
                href="/#integrations"
                className="rounded-lg px-2 py-3 font-mono text-[12px] tracking-[0.08em] text-white uppercase"
                onClick={closeMenu}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/#why"
              className="mt-2 rounded-lg px-2 py-3 text-sm text-white"
              onClick={closeMenu}
            >
              Why North
            </Link>
            <Link
              href="/#pricing"
              className="rounded-lg px-2 py-3 text-sm text-white"
              onClick={closeMenu}
            >
              Pricing
            </Link>
            <Link
              href="/campaign"
              className="rounded-lg px-2 py-3 text-sm text-white"
              onClick={closeMenu}
            >
              Campaign
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/25 pt-4 sm:flex-row">
            <Link href="/campaign/meet" className="btn-nav w-full sm:w-auto" onClick={closeMenu}>
              Sign In
            </Link>
            <Link href="/campaign/meet" className="btn-nav w-full sm:w-auto" onClick={closeMenu}>
              Free Demo
            </Link>
            <Link href="/campaign/meet" className="btn-trial w-full sm:w-auto" onClick={closeMenu}>
              Free trial
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
