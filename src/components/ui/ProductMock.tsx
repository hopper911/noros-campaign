"use client";

import { SpendChart } from "@/components/north/SpendChart";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const scenarios = [
  {
    id: "jump",
    label: "Spend jump",
    prompt: "Why did AWS spend jump 18% this week?",
    answer:
      "EC2 in us-east-1 drove +$42.6k. Top drivers: m6i.4xlarge fleet (+31%) and unattached EBS (+$8.2k).",
    rec: "Rightsize 14 instances and reclaim idle volumes — est. $11.4k / mo.",
    highlight: "ec2",
  },
  {
    id: "anomaly",
    label: "Anomaly",
    prompt: "Any cost anomalies I should know about?",
    answer:
      "S3 in us-west-2 spiked +$9.1k vs the trailing 4-week baseline. Prefix logs/ accounted for 72% of the delta.",
    rec: "Lifecycle on logs/ older than 30 days — est. $6.2k / mo.",
    highlight: "s3",
  },
  {
    id: "savings",
    label: "Savings",
    prompt: "Where can we save this quarter?",
    answer:
      "Compute Savings Plans coverage is 61%. Closing the gap on the m6i family is the largest lever.",
    rec: "1-year No Upfront SP on remaining compute — est. $18.7k / mo.",
    highlight: "sp",
  },
] as const;

type Scenario = (typeof scenarios)[number];

export function ProductMock({
  compact = false,
  autoPlay = false,
}: {
  compact?: boolean;
  autoPlay?: boolean;
}) {
  const reduce = useReducedMotion();
  const [scenario, setScenario] = useState<Scenario>(scenarios[0]);
  const [typed, setTyped] = useState(autoPlay ? "" : scenarios[0].prompt);
  const [showUser, setShowUser] = useState(!autoPlay);
  const [showAnswer, setShowAnswer] = useState(!autoPlay);
  const [grow, setGrow] = useState(true);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<number[]>([]);
  const started = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = window.setTimeout(resolve, ms);
      timers.current.push(id);
    });

  const play = useCallback(
    async (next: Scenario) => {
      clearTimers();
      setScenario(next);
      setTyped("");
      setShowUser(false);
      setShowAnswer(false);
      setGrow(true);
      setPlaying(true);

      if (reduce) {
        setTyped(next.prompt);
        setShowUser(true);
        setShowAnswer(true);
        setGrow(true);
        setPlaying(false);
        return;
      }

      for (let i = 1; i <= next.prompt.length; i++) {
        setTyped(next.prompt.slice(0, i));
        await wait(22);
      }
      await wait(280);
      setShowUser(true);
      await wait(420);
      setShowAnswer(true);
      setGrow(true);
      await wait(600);
      setPlaying(false);
    },
    [reduce],
  );

  useEffect(() => {
    if (!autoPlay || started.current) return;
    started.current = true;
    const id = window.setTimeout(() => {
      void play(scenarios[0]);
    }, 400);
    return () => {
      window.clearTimeout(id);
      clearTimers();
    };
  }, [autoPlay, play]);

  return (
    <div className="overflow-hidden rounded-[0.4rem] bg-black/30 p-2 backdrop-blur-xl md:rounded-[1.6rem] md:p-6">
      <div
        className={`rounded-[0.2rem] border border-white/10 bg-[#1a2228] md:rounded-[0.8rem] ${
          compact ? "p-3" : "p-3 sm:p-4 md:p-5"
        }`}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="font-mono text-[10px] tracking-[0.16em] text-neue uppercase">
            Noros · AI Agent
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-neue uppercase">
              AWS · GCP · Azure
            </span>
            <button
              type="button"
              className="btn-nav !h-8 !px-3 !text-[10px]"
              onClick={() => void play(scenario)}
              disabled={playing}
            >
              {playing ? "Playing" : "Play demo"}
            </button>
          </div>
        </div>

        <div className={`grid min-w-0 gap-4 ${compact ? "" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
          <div className="flex min-w-0 flex-col">
            <div className={`space-y-2.5 ${compact ? "min-h-[8rem]" : "min-h-[11rem]"}`}>
              {showUser && (
                <div className="flex justify-end">
                  <div className="max-w-[95%] rounded-2xl rounded-br-md bg-neue px-3 py-2 text-xs leading-relaxed text-black">
                    {scenario.prompt}
                  </div>
                </div>
              )}
              {showAnswer && (
                <div className="flex justify-start">
                  <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-white/10 bg-black/50 px-3 py-2 text-xs leading-relaxed text-neue">
                    <div className="mb-1 font-mono text-[10px] tracking-[0.12em] text-mint uppercase">
                      Noros
                    </div>
                    <p>{scenario.answer}</p>
                    <p className="mt-2 text-mint">{scenario.rec}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="accent-mint mt-4">
              <div className="button-rail flex h-12 items-stretch gap-1.5 rounded-[8rem] p-1.5">
                <div className="flex flex-1 items-center px-3 font-mono text-[10px] tracking-[0.06em] text-black uppercase sm:text-[11px]">
                  {typed || "Ask Noros anything about cloud spend…"}
                </div>
                <span className="hero-cta hero-cta-demo !flex-none px-4">Ask</span>
              </div>
            </div>

            {!compact && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="nav-item !h-8 !text-[10px]"
                    data-open={scenario.id === s.id ? "true" : undefined}
                    onClick={() => void play(s)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!compact && (
            <SpendChart
              compact
              grow={grow}
              highlightSeries={showAnswer ? scenario.highlight : null}
            />
          )}
        </div>
      </div>
    </div>
  );
}
