"use client";

import { SpendChart } from "@/components/north/SpendChart";
import { Cross } from "@/components/north/SpriteIcons";
import { useEffect, useRef, useState } from "react";

type Beat = { n: string; title: string; body: string };

export function FeatureStepper({
  beats,
  header,
}: {
  beats: Beat[];
  header: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0.2 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [beats.length]);

  return (
    <div className="dot-grid">
      {header}
      <div className="grid min-w-0 items-start gap-0 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="min-w-0 p-3 sm:p-4 md:p-8 lg:sticky lg:top-24">
          <SpendChart highlightSeries={active === 1 ? "ec2" : active === 2 ? "sp" : null} />
        </div>

        <ol className="relative border-l border-dotted border-black/25">
          {beats.map((beat, i) => (
            <li
              key={beat.n}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`relative min-w-0 border-b border-dotted border-black/25 px-4 py-8 transition-colors sm:px-6 md:px-8 md:py-10 ${
                active === i ? "bg-black/5" : ""
              }`}
            >
              <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
              <button
                type="button"
                className="w-full text-left"
                onClick={() => setActive(i)}
                aria-current={active === i ? "true" : undefined}
              >
                <span
                  className={`block text-4xl font-medium tracking-tight md:text-5xl ${
                    active === i ? "text-black" : "text-black/70"
                  }`}
                >
                  {beat.n}
                </span>
                <h3
                  className={`mt-4 text-xl font-medium tracking-tight ${
                    active === i ? "text-black" : "text-black/70"
                  }`}
                >
                  {beat.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-black/70 uppercase">
                  {beat.body}
                </p>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
