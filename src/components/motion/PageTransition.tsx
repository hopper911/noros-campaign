"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const COVER_MS = 450;
const REVEAL_S = 0.55;

function shouldIntercept(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

  let next: URL;
  try {
    next = new URL(anchor.href, window.location.href);
  } catch {
    return false;
  }
  if (next.origin !== window.location.origin) return false;
  if (next.pathname === window.location.pathname && next.search === window.location.search) {
    return false;
  }
  return true;
}

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [covered, setCovered] = useState(true);
  const busy = useRef(false);
  const pendingPath = useRef<string | null>(null);
  const booted = useRef(false);

  useEffect(() => {
    if (reduce) return;
    if (booted.current) return;
    booted.current = true;
    const id = window.setTimeout(() => setCovered(false), 80);
    return () => window.clearTimeout(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    const onClick = (event: MouseEvent) => {
      if (busy.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!shouldIntercept(anchor, event)) return;

      event.preventDefault();
      event.stopPropagation();

      const next = new URL(anchor.href, window.location.href);
      const href = `${next.pathname}${next.search}${next.hash}`;
      pendingPath.current = next.pathname;
      busy.current = true;
      setCovered(true);

      window.setTimeout(() => {
        router.push(href);
      }, COVER_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce, router]);

  useEffect(() => {
    if (reduce || !busy.current) return;
    if (pendingPath.current && pendingPath.current !== pathname) return;
    pendingPath.current = null;
    const id = window.setTimeout(() => {
      setCovered(false);
      busy.current = false;
    }, 40);
    return () => window.clearTimeout(id);
  }, [pathname, reduce]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[200] bg-white"
      initial={false}
      animate={{ opacity: covered ? 1 : 0 }}
      transition={{ duration: covered ? COVER_MS / 1000 : REVEAL_S, ease: EASE }}
      style={{ pointerEvents: covered ? "auto" : "none" }}
    />
  );
}
