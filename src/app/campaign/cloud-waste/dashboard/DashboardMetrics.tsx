"use client";

import { CloudWasteMedia } from "@/components/campaign/CloudWasteMedia";
import { GridFrame } from "@/components/north/GridFrame";
import type { CloudWasteMediaAsset } from "@/lib/site-content";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({
  value,
  prefix = "",
  unit = "",
}: {
  value: number;
  prefix?: string;
  unit?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, reduce]);

  const formatted = value >= 100 ? Math.round(display).toLocaleString() : display.toFixed(1);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {unit}
    </span>
  );
}

type Kpi = { label: string; target: number; unit: string; prefix: string };
type FunnelStep = { stage: string; value: number };

function conversionRate(current: number, previous: number) {
  if (!previous) return null;
  return ((current / previous) * 100).toFixed(1);
}

export function DashboardMetrics({
  kpis,
  funnel,
  media,
}: {
  kpis: Kpi[];
  funnel: FunnelStep[];
  media: CloudWasteMediaAsset | null;
}) {
  const funnelRef = useRef<HTMLDivElement>(null);
  const funnelInView = useInView(funnelRef, { once: true, margin: "-50px" });
  const maxFunnel = Math.max(...funnel.map((step) => step.value), 1);

  return (
    <>
      <GridFrame borders="trb" ink="mint" strength={40}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            {media ? (
              <CloudWasteMedia
                asset={media}
                className="h-full w-full object-cover"
                alt="Cloud Waste dashboard background"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 20% 0%, rgba(162,242,227,0.16), transparent 50%), radial-gradient(ellipse at 90% 30%, rgba(162,242,227,0.08), transparent 40%), linear-gradient(180deg, #0a0b0c 0%, #121314 55%, #000 100%)",
                }}
              />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/35" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(162,242,227,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(162,242,227,0.03)_1px,transparent_1px)] bg-[length:48px_48px] opacity-40" />

          <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
                  Campaign Performance
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
                  Target metrics & funnel
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">
                  Live targets for the Cloud Waste demand-gen motion — downloads, pipeline, and
                  conversion discipline in one view.
                </p>
              </div>
              <div className="rounded-full border border-mint/25 bg-mint/5 px-4 py-2 font-mono text-[10px] tracking-[0.12em] text-mint uppercase">
                Read-only · Planning targets
              </div>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {kpis.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="bg-black/80 p-5 backdrop-blur-sm"
                >
                  <p className="font-mono text-[10px] tracking-[0.14em] text-neue/55 uppercase">
                    {kpi.label}
                  </p>
                  <p className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-[1.75rem]">
                    <AnimatedNumber value={kpi.target} prefix={kpi.prefix} unit={kpi.unit} />
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-px flex-1 bg-mint/20" />
                    <span className="font-mono text-[9px] tracking-[0.12em] text-mint uppercase">
                      Target
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </GridFrame>

      <GridFrame borders="rb" ink="mint" strength={40}>
        <div className="relative overflow-hidden p-5 sm:p-8 md:p-10" ref={funnelRef}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
                Campaign Funnel
              </p>
              <p className="mt-2 max-w-lg text-sm text-neue/70">
                Stage-by-stage volume with conversion between each step.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {funnel.map((step, i) => {
              const widthPct = Math.max((step.value / maxFunnel) * 100, 4);
              const prev = funnel[i - 1];
              const rate = prev ? conversionRate(step.value, prev.value) : null;
              return (
                <div key={step.stage} className="group">
                  {rate ? (
                    <p className="mb-1.5 pl-[7.5rem] font-mono text-[9px] tracking-[0.1em] text-mint/70 uppercase sm:pl-36">
                      ↓ {rate}% conversion
                    </p>
                  ) : null}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <p className="w-28 shrink-0 text-right font-mono text-[11px] tracking-[0.06em] text-neue/70 uppercase sm:w-32">
                      {step.stage}
                    </p>
                    <div className="relative h-10 flex-1 overflow-hidden border border-white/8 bg-white/[0.03]">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-mint/90 to-mint/55"
                        initial={{ width: 0 }}
                        animate={funnelInView ? { width: `${widthPct}%` } : { width: 0 }}
                        transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06))]" />
                    </div>
                    <p className="w-16 text-right font-mono text-[12px] text-white tabular-nums sm:w-20">
                      {step.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GridFrame>
    </>
  );
}
