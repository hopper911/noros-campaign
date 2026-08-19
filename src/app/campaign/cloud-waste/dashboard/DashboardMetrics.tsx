"use client";

import { GridFrame } from "@/components/north/GridFrame";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ value, prefix = "", unit = "" }: { value: number; prefix?: string; unit?: string }) {
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
      {prefix}{formatted}{unit}
    </span>
  );
}

type Kpi = { label: string; target: number; unit: string; prefix: string };
type FunnelStep = { stage: string; value: number };

export function DashboardMetrics({ kpis, funnel }: { kpis: Kpi[]; funnel: FunnelStep[] }) {
  const funnelRef = useRef<HTMLDivElement>(null);
  const funnelInView = useInView(funnelRef, { once: true, margin: "-50px" });
  const maxFunnel = funnel[0].value;

  return (
    <>
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi) => (
          <GridFrame key={kpi.label} borders="rb" ink="mint" strength={40}>
            <div className="flex flex-col items-center p-5 text-center">
              <p className="font-mono text-[9px] tracking-[0.12em] text-neue/50 uppercase">
                {kpi.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                <AnimatedNumber value={kpi.target} prefix={kpi.prefix} unit={kpi.unit} />
              </p>
              <p className="mt-1 font-mono text-[9px] text-mint">Target</p>
            </div>
          </GridFrame>
        ))}
      </div>

      {/* Funnel */}
      <GridFrame borders="rb" ink="mint" strength={40}>
        <div className="p-5 sm:p-8" ref={funnelRef}>
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Campaign Funnel
          </p>
          <div className="mt-6 flex flex-col gap-2">
            {funnel.map((step, i) => {
              const widthPct = (step.value / maxFunnel) * 100;
              return (
                <div key={step.stage} className="flex items-center gap-3">
                  <p className="w-24 shrink-0 text-right font-mono text-[10px] text-neue/60">
                    {step.stage}
                  </p>
                  <div className="relative h-8 flex-1 overflow-hidden rounded">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded bg-mint"
                      initial={{ width: 0 }}
                      animate={funnelInView ? { width: `${widthPct}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.12, ease: "easeOut" }}
                      style={{ opacity: 1 - i * 0.12 }}
                    />
                  </div>
                  <p className="w-20 font-mono text-[10px] text-white tabular-nums">
                    {step.value.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </GridFrame>
    </>
  );
}
