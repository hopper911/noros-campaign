"use client";

import { Cross } from "@/components/north/SpriteIcons";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
const yTicks = [
  { full: "$1,500,000", short: "$1.5M" },
  { full: "$1,200,000", short: "$1.2M" },
  { full: "$900,000", short: "$900K" },
  { full: "$600,000", short: "$600K" },
  { full: "$300,000", short: "$300K" },
  { full: "$0", short: "$0" },
];

const series = [
  { id: "sp", label: "Savings Plans for AWS Compute usage", color: "#47d1b5" },
  { id: "ec2", label: "EC2 - Other", color: "#f59e0b" },
  { id: "s3", label: "Amazon Simple Storage Service", color: "#7dd3fc" },
  { id: "vpc", label: "Amazon Virtual Private Cloud", color: "#c4b5fd" },
  { id: "msk", label: "Amazon Managed Streaming for Apache Kafka", color: "#e6e1d9" },
];

const stacks: Record<string, number[]> = {
  JAN: [28, 18, 12, 8, 6],
  FEB: [42, 22, 14, 10, 8],
  MAR: [32, 16, 11, 9, 5],
  APR: [36, 20, 13, 8, 7],
  MAY: [48, 24, 15, 11, 9],
  JUN: [34, 19, 12, 8, 6],
  JUL: [30, 17, 13, 9, 7],
};

type Beat = { n: string; title: string; body: string };

export function FeatureStepper({
  beats,
  header,
}: {
  beats: Beat[];
  header: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [hoverSeries, setHoverSeries] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = chartRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

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

  const grow = inView && !reduce;

  return (
    <div className="dot-grid">
      {header}
      <div className="grid min-w-0 items-start gap-0 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="min-w-0 p-3 sm:p-4 md:p-8 lg:sticky lg:top-24">
          <div
            ref={chartRef}
            className="min-w-0 overflow-hidden rounded-[16px] bg-[#1a2228] p-3 text-neue sm:rounded-[24px] sm:p-5 md:p-7"
          >
            <ul className="mb-5 grid gap-1.5 sm:grid-cols-2">
              {series.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`flex items-center gap-2 text-left text-[10px] leading-snug transition-opacity ${
                      hoverSeries && hoverSeries !== s.id ? "opacity-35" : "opacity-100"
                    }`}
                    onMouseEnter={() => setHoverSeries(s.id)}
                    onMouseLeave={() => setHoverSeries(null)}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={{ background: s.color }}
                    />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex min-w-0 gap-2 sm:gap-3">
              <div className="flex w-9 shrink-0 flex-col justify-between py-1 text-[8px] text-neue/70 sm:w-auto sm:text-[9px]">
                {yTicks.map((t) => (
                  <span key={t.full}>
                    <span className="md:hidden">{t.short}</span>
                    <span className="hidden md:inline">{t.full}</span>
                  </span>
                ))}
              </div>
              <div className="relative flex h-44 min-w-0 flex-1 items-end gap-1 border-l border-white/10 pl-2 sm:h-52 sm:gap-2 sm:pl-3 md:h-64">
                <div className="pointer-events-none absolute inset-y-0 left-2 right-0 flex flex-col justify-between sm:left-3">
                  {yTicks.map((t) => (
                    <span key={t.full} className="block h-px w-full bg-white/10" />
                  ))}
                </div>
                {months.map((m) => {
                  const vals = stacks[m];
                  const total = vals.reduce((a, b) => a + b, 0);
                  return (
                    <div key={m} className="relative z-10 flex flex-1 flex-col items-center gap-2">
                      <div
                        className="flex w-full flex-col-reverse overflow-hidden rounded-t-sm"
                        style={{ height: `${Math.min(total, 100)}%` }}
                      >
                        {series.map((s, si) => (
                          <div
                            key={s.id}
                            className="w-full origin-bottom transition-[transform,opacity] duration-700 ease-out"
                            style={{
                              height: `${(vals[si] / total) * 100}%`,
                              background: s.color,
                              opacity:
                                hoverSeries && hoverSeries !== s.id ? 0.25 : 1,
                              transform: grow ? "scaleY(1)" : "scaleY(0)",
                              transitionDelay: reduce ? "0ms" : `${si * 60}ms`,
                            }}
                            onMouseEnter={() => setHoverSeries(s.id)}
                            onMouseLeave={() => setHoverSeries(null)}
                          />
                        ))}
                      </div>
                      <span className="text-[7px] tracking-wide text-neue/80 sm:text-[9px]">{m}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <ol className="relative border-l border-dotted border-black/25">
          {beats.map((beat, i) => (
            <li
              key={beat.n}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`relative min-w-0 border-b border-dotted border-black/25 px-4 py-8 transition-opacity sm:px-6 md:px-8 md:py-10 ${
                active === i ? "opacity-100" : "opacity-45"
              }`}
            >
              <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
              <button
                type="button"
                className="w-full text-left"
                onClick={() => setActive(i)}
              >
                <span className="block text-4xl font-medium tracking-tight text-black md:text-5xl">
                  {beat.n}
                </span>
                <h3 className="mt-4 text-xl font-medium tracking-tight text-black">
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
