"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

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

const ease = [0.22, 1, 0.36, 1] as const;

export function SpendChart({
  compact = false,
  grow: growOverride,
  highlightSeries = null,
}: {
  compact?: boolean;
  grow?: boolean;
  highlightSeries?: string | null;
}) {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.2, margin: "0px 0px -80px 0px" });
  const active = highlightSeries ?? selectedSeries;
  const grow = reduce ? true : (growOverride ?? inView);

  const toggleSeries = (id: string) => {
    setSelectedSeries((prev) => (prev === id ? null : id));
  };

  return (
    <div
      ref={rootRef}
      className={`min-w-0 overflow-hidden bg-[#1a2228] text-neue ${
        compact
          ? "rounded-[12px] p-3"
          : "rounded-[16px] p-3 sm:rounded-[24px] sm:p-5 md:p-7"
      }`}
    >
      <ul className={`mb-4 grid gap-1.5 ${compact ? "" : "sm:grid-cols-2"}`}>
        {spendSeries.map((s) => {
          const dimmed = Boolean(active && active !== s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`flex min-h-11 w-full items-center gap-2 rounded-md px-1.5 py-2 text-left text-[11px] leading-snug sm:min-h-0 sm:py-1.5 sm:text-[10px] ${
                  dimmed ? "text-neue" : "text-white"
                }`}
                aria-pressed={active === s.id}
                onClick={() => toggleSeries(s.id)}
                onFocus={() => setSelectedSeries(s.id)}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                  style={{
                    background: s.color,
                    opacity: dimmed ? 0.45 : 1,
                  }}
                />
                {s.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div
        role="img"
        aria-label="Stacked bar chart of monthly cloud spend by AWS service from January through July"
        className="flex min-w-0 gap-2 sm:gap-3"
      >
        <div
          className={`flex w-10 shrink-0 flex-col justify-between py-1 text-[10px] text-neue/70 sm:w-auto sm:text-[9px] ${
            compact ? "h-36" : "h-44 sm:h-52 md:h-64"
          }`}
        >
          {spendYTicks.map((t) => (
            <span key={t.full}>
              <span className="md:hidden">{t.short}</span>
              <span className="hidden md:inline">{t.full}</span>
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className={`relative flex min-w-0 flex-1 items-end gap-1 border-l border-white/25 pl-2 sm:gap-2 sm:pl-3 ${
              compact ? "h-36" : "h-44 sm:h-52 md:h-64"
            }`}
          >
            <div className="pointer-events-none absolute inset-y-0 left-2 right-0 flex flex-col justify-between sm:left-3">
              {spendYTicks.map((t) => (
                <span key={t.full} className="block h-px w-full bg-white/10" />
              ))}
            </div>
            {spendMonths.map((m, mi) => {
              const vals = spendStacks[m];
              const total = vals.reduce((a, b) => a + b, 0);
              return (
                <div key={m} className="relative z-10 flex h-full min-w-0 flex-1 items-end">
                  <motion.div
                    className="flex w-full flex-col-reverse rounded-t-sm"
                    style={{
                      height: `${Math.min(total, 100)}%`,
                      transformOrigin: "bottom",
                    }}
                    initial={false}
                    animate={{ scaleY: grow ? 1 : 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.7,
                      ease,
                      delay: reduce ? 0 : mi * 0.07,
                    }}
                  >
                    {spendSeries.map((s, si) => (
                      <div
                        key={s.id}
                        className="w-full transition-opacity duration-300"
                        style={{
                          height: `${(vals[si] / total) * 100}%`,
                          background: s.color,
                          opacity: active && active !== s.id ? 0.25 : 1,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-1 pl-2 sm:gap-2 sm:pl-3">
            {spendMonths.map((m) => (
              <span
                key={m}
                className="min-w-0 flex-1 text-center text-[10px] tracking-wide text-neue/80 sm:text-[9px]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
