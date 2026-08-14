"use client";

import { Reveal } from "@/components/motion/Reveal";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const values = [
  11, 10, 12, 9, 13, 11, 10, 40, 14, 12, 11, 13, 12, 10, 13, 14, 12, 15, 13, 14,
  16, 15, 14, 16, 15, 17, 16, 15,
];

const W = 720;
const H = 280;
const pad = { l: 52, r: 16, t: 12, b: 36 };
const plotW = W - pad.l - pad.r;
const plotH = H - pad.t - pad.b;
const maxY = 50;
const spike = 7;

function xAt(i: number) {
  return pad.l + (i / (values.length - 1)) * plotW;
}

function yAt(v: number) {
  return pad.t + (1 - v / maxY) * plotH;
}

function toPath(from: number, to: number) {
  return values
    .slice(from, to + 1)
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(from + i).toFixed(1)} ${yAt(v).toFixed(1)}`)
    .join(" ");
}

const fullPath = toPath(0, values.length - 1);
const mintPath = toPath(spike, values.length - 1);
const spikeX = xAt(spike);
const spikeY = yAt(values[spike]);

const yTicks = ["$50K", "$40K", "$30K", "$20K", "$10K", "$0K"];
const xTicks = [
  { label: "MAR 01", i: 0 },
  { label: "MAR 08", i: 7 },
  { label: "MAR 15", i: 14 },
  { label: "MAR 22", i: 21 },
  { label: "MAR 28", i: 27 },
];

function RailIcon({ d }: { d: string }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-neue">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d={d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function AnomalyChart() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.25, margin: "0px 0px -60px 0px" });
  const play = Boolean(reduce) || inView;

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Line chart showing a critical Amazon RDS cost anomaly spike on March 8"
      className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-[#1a2228] text-neue sm:flex-row"
    >
      <aside className="hidden shrink-0 flex-col gap-2 border-r border-white/10 p-3 sm:flex">
        <RailIcon d="M7 2.5v9M2.5 7h9" />
        <RailIcon d="M7 11.5a1.2 1.2 0 0 0 1.2-1.2H5.8A1.2 1.2 0 0 0 7 11.5Zm3.4-3.2V6.4A3.4 3.4 0 0 0 8.2 3.2V2.7a1.2 1.2 0 1 0-2.4 0v.5A3.4 3.4 0 0 0 3.6 6.4v1.9L2.4 9.6h9.2Z" />
        <RailIcon d="M5.2 7a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0ZM11.2 7l1.1-.7-.9-1.6-1.3.3a4 4 0 0 0-1-.6L8.9 2.8H5.1l-.2 1.6a4 4 0 0 0-1 .6l-1.3-.3-.9 1.6L2.8 7l-1.1.7.9 1.6 1.3-.3c.3.3.6.5 1 .6l.2 1.6h3.8l.2-1.6c.4-.1.7-.3 1-.6l1.3.3.9-1.6Z" />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col p-4 sm:p-5">
        <Reveal>
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#e5484d]"
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3.2 13.4 13H2.6L8 3.2Z"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M8 7v2.4M8 11.4h.01" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <h3 className="text-[15px] font-medium tracking-tight text-white sm:text-base">
                Critical anomaly detected in Amazon RDS
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-neue">
                Your db.r6i.32xlarge RDS instance spiked by +$264.93 day-over-day.
              </p>
            </div>
          </div>
        </Reveal>

        <svg
          className="mt-4 min-h-[12rem] w-full flex-1 sm:min-h-0"
          viewBox={`0 0 ${W} ${H}`}
          aria-hidden
        >
          {yTicks.map((label, i) => {
            const y = pad.t + (i / (yTicks.length - 1)) * plotH;
            return (
              <g key={label}>
                <line
                  x1={pad.l}
                  x2={W - pad.r}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                />
                <text
                  x={pad.l - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#afb8c2"
                  fontSize="11"
                  fontFamily="Cygnito Mono, ui-monospace, monospace"
                >
                  {label}
                </text>
              </g>
            );
          })}
          {xTicks.map((t) => (
            <text
              key={t.label}
              x={xAt(t.i)}
              y={H - 8}
              textAnchor="middle"
              fill="#afb8c2"
              fontSize="11"
              fontFamily="Cygnito Mono, ui-monospace, monospace"
            >
              {t.label}
            </text>
          ))}

          <motion.path
            d={fullPath}
            fill="none"
            stroke="#afb8c2"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: play ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1.1, ease }}
          />
          <motion.path
            d={mintPath}
            fill="none"
            stroke="#a2f2e3"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: play ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.42, ease }}
          />
          <motion.g
            initial={false}
            animate={{ opacity: play ? 1 : 0, scale: play ? 1 : 0.55 }}
            transition={{ delay: reduce ? 0 : 0.45, duration: reduce ? 0 : 0.35, ease }}
            style={{ transformOrigin: `${spikeX}px ${spikeY}px` }}
          >
            <circle cx={spikeX} cy={spikeY} r="16" fill="rgba(229,72,77,0.22)" />
            <circle cx={spikeX} cy={spikeY} r="5.5" fill="#e5484d" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
