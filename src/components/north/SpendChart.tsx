"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const spendMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
export const spendYTicks = [
  { full: "$1,500,000", short: "$1.5M" },
  { full: "$1,200,000", short: "$1.2M" },
  { full: "$900,000", short: "$900K" },
  { full: "$600,000", short: "$600K" },
  { full: "$300,000", short: "$300K" },
  { full: "$0", short: "$0" },
];

export const spendSeries = [
  { id: "sp", label: "Savings Plans for AWS Compute usage", color: "#47d1b5" },
  { id: "ec2", label: "EC2 - Other", color: "#f59e0b" },
  { id: "s3", label: "Amazon Simple Storage Service", color: "#7dd3fc" },
  { id: "vpc", label: "Amazon Virtual Private Cloud", color: "#c4b5fd" },
  { id: "msk", label: "Amazon Managed Streaming for Apache Kafka", color: "#e6e1d9" },
];

export const spendStacks: Record<string, number[]> = {
  JAN: [28, 18, 12, 8, 6],
  FEB: [42, 22, 14, 10, 8],
  MAR: [32, 16, 11, 9, 5],
  APR: [36, 20, 13, 8, 7],
  MAY: [48, 24, 15, 11, 9],
  JUN: [34, 19, 12, 8, 6],
  JUL: [30, 17, 13, 9, 7],
};

export function SpendChart({
  compact = false,
  grow: growOverride,
  highlightSeries = null,
}: {
  compact?: boolean;
  grow?: boolean;
  highlightSeries?: string | null;
}) {
  const [hoverSeries, setHoverSeries] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const chartRef = useRef<HTMLDivElement>(null);
  const active = highlightSeries ?? hoverSeries;
  const grow = growOverride ?? (inView && !reduce);

  useEffect(() => {
    if (growOverride !== undefined) return;
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
  }, [growOverride]);

  return (
    <div
      ref={chartRef}
      className={`min-w-0 overflow-hidden bg-[#1a2228] text-neue ${
        compact
          ? "rounded-[12px] p-3"
          : "rounded-[16px] p-3 sm:rounded-[24px] sm:p-5 md:p-7"
      }`}
    >
      <ul className={`mb-4 grid gap-1.5 ${compact ? "" : "sm:grid-cols-2"}`}>
        {spendSeries.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className={`flex items-center gap-2 text-left text-[10px] leading-snug transition-opacity ${
                active && active !== s.id ? "opacity-35" : "opacity-100"
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
          {spendYTicks.map((t) => (
            <span key={t.full}>
              <span className="md:hidden">{t.short}</span>
              <span className="hidden md:inline">{t.full}</span>
            </span>
          ))}
        </div>
        <div
          className={`relative flex min-w-0 flex-1 items-end gap-1 border-l border-white/10 pl-2 sm:gap-2 sm:pl-3 ${
            compact ? "h-36" : "h-44 sm:h-52 md:h-64"
          }`}
        >
          <div className="pointer-events-none absolute inset-y-0 left-2 right-0 flex flex-col justify-between sm:left-3">
            {spendYTicks.map((t) => (
              <span key={t.full} className="block h-px w-full bg-white/10" />
            ))}
          </div>
          {spendMonths.map((m) => {
            const vals = spendStacks[m];
            const total = vals.reduce((a, b) => a + b, 0);
            return (
              <div key={m} className="relative z-10 flex flex-1 flex-col items-center gap-2">
                <div
                  className="flex w-full flex-col-reverse overflow-hidden rounded-t-sm"
                  style={{ height: `${Math.min(total, 100)}%` }}
                >
                  {spendSeries.map((s, si) => (
                    <div
                      key={s.id}
                      className="w-full origin-bottom transition-[transform,opacity] duration-700 ease-out"
                      style={{
                        height: `${(vals[si] / total) * 100}%`,
                        background: s.color,
                        opacity: active && active !== s.id ? 0.25 : 1,
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
  );
}
