"use client";

import { FeatureStepper } from "@/components/landing/FeatureStepper";
import { AnomalyChart } from "@/components/north/AnomalyChart";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import type { LandingContent } from "@/lib/site-content";
import { useState } from "react";

const themes = [
  {
    section: "bg-section-gray",
    ink: "black" as const,
    strength: 20,
  },
  {
    section: "bg-section-black",
    ink: "neue" as const,
    strength: 50,
  },
  {
    section: "bg-section-mint",
    ink: "black" as const,
    strength: 20,
  },
];

export function FeatureBlocks({ features }: { features: LandingContent["features"] }) {
  return (
    <section id="features" className="scroll-mt-28">
      {features.map((feature, idx) => {
        const theme = themes[idx];
        const onLight = theme.section !== "bg-section-black";
        const header = (
          <GridFrame borders="tr" ink={theme.ink} strength={theme.strength}>
            <div className="header-content p-6 md:p-8">
              <div
                className={`flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[15px] ${
                  onLight ? "text-black" : "text-neue"
                }`}
              >
                <p className="label-nr">{feature.code}</p>
                <div className="flex flex-wrap gap-x-8">
                  <span>Noros</span>
                  <span>{feature.label}</span>
                </div>
              </div>
              <p
                className={`t6 mt-6 max-w-[28ch] ${
                  onLight ? "text-black/70" : "text-neue"
                }`}
              >
                {feature.kicker}
              </p>
              <h2
                className={`t2 mt-4 max-w-[16ch] ${
                  onLight ? "text-black" : "text-white"
                }`}
              >
                {feature.title}
              </h2>
            </div>
          </GridFrame>
        );

        if (idx === 2) {
          return (
            <div key={feature.code} className={`${theme.section} py-site`}>
              <div className="px-site">
                <FeatureStepper beats={feature.beats} header={header} />
              </div>
            </div>
          );
        }

        return (
          <StillFeature
            key={feature.code}
            feature={feature}
            theme={theme}
            onLight={onLight}
            header={header}
            visual={idx === 1 ? "anomaly" : "media"}
          />
        );
      })}
    </section>
  );
}

function StillFeature({
  feature,
  theme,
  onLight,
  header,
  visual,
}: {
  feature: LandingContent["features"][number];
  theme: (typeof themes)[number];
  onLight: boolean;
  header: React.ReactNode;
  visual: "media" | "anomaly";
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={`${theme.section} py-site`}>
      <div className="px-site">
        {header}
        <div className="mt-0 grid min-w-0 lg:grid-cols-2">
          <GridFrame borders="tbr" ink={theme.ink} strength={theme.strength}>
            {visual === "anomaly" ? (
              <div className="asset-content p-4 md:p-6">
                <div className="relative min-h-[22rem] overflow-hidden bg-black sm:min-h-0 sm:aspect-[16/11]">
                  <AnomalyChart />
                </div>
              </div>
            ) : (
              <Reveal>
                <div className="asset-content p-4 md:p-6">
                  <div className="relative aspect-[16/11] overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={feature.media}
                      alt={`${feature.title} product still`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            )}
          </GridFrame>

          <GridFrame borders="tb" ink={theme.ink} strength={theme.strength}>
            <ol className="space-y-2 p-4 md:p-6">
              {feature.beats.map((beat, i) => (
                <li key={beat.n}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full min-w-0 gap-3 rounded-lg border-l-2 p-3 text-left transition-colors sm:gap-5 ${
                      active === i
                        ? onLight
                          ? "border-black bg-black/5"
                          : "border-mint bg-white/5"
                        : "border-transparent"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm ${
                        active === i
                          ? onLight
                            ? "text-black/70"
                            : "text-mint"
                          : onLight
                            ? "text-black/70"
                            : "text-neue"
                      }`}
                    >
                      {beat.n}
                    </span>
                    <div>
                      <h3
                        className={`text-lg font-medium tracking-tight ${
                          active === i
                            ? onLight
                              ? "text-black"
                              : "text-white"
                            : onLight
                              ? "text-black/70"
                              : "text-neue"
                        }`}
                      >
                        {beat.title}
                      </h3>
                      <p
                        className={`mt-2 text-[15px] leading-relaxed ${
                          onLight ? "text-black/70" : "text-neue"
                        }`}
                      >
                        {beat.body}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </GridFrame>
        </div>
      </div>
    </div>
  );
}
