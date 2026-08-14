"use client";

import { FeatureStepper } from "@/components/landing/FeatureStepper";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { landingCopy } from "@/lib/messaging";
import { useState } from "react";

const themes = [
  {
    section: "bg-section-gray",
    ink: "black" as const,
    strength: 20,
    media: "/north/mux-1.webp",
  },
  {
    section: "bg-section-black",
    ink: "neue" as const,
    strength: 50,
    media: "/north/mux-2.webp",
  },
  {
    section: "bg-section-mint",
    ink: "black" as const,
    strength: 20,
    media: "/north/mux-3.webp",
  },
];

export function FeatureBlocks() {
  return (
    <section id="features">
      {landingCopy.features.map((feature, idx) => {
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
}: {
  feature: (typeof landingCopy.features)[number];
  theme: (typeof themes)[number];
  onLight: boolean;
  header: React.ReactNode;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={`${theme.section} py-site`}>
      <div className="px-site">
        {header}
        <div className="mt-0 grid min-w-0 lg:grid-cols-2">
          <GridFrame borders="tbr" ink={theme.ink} strength={theme.strength}>
            <Reveal>
              <div className="asset-content p-4 md:p-6">
                <div className="relative aspect-[16/11] overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={theme.media}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </GridFrame>

          <GridFrame borders="tb" ink={theme.ink} strength={theme.strength}>
            <ol className="space-y-2 p-4 md:p-6">
              {feature.beats.map((beat, i) => (
                <li key={beat.n}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full min-w-0 gap-3 rounded-lg p-3 text-left transition-opacity sm:gap-5 ${
                      active === i ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm ${
                        onLight ? "text-black/50" : "text-mint"
                      }`}
                    >
                      {beat.n}
                    </span>
                    <div>
                      <h3
                        className={`text-lg font-medium tracking-tight ${
                          onLight ? "text-black" : "text-white"
                        }`}
                      >
                        {beat.title}
                      </h3>
                      <p
                        className={`mt-2 text-[15px] leading-relaxed ${
                          onLight ? "text-black/65" : "text-neue"
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
