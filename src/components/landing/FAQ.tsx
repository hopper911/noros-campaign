"use client";

import { GridFrame } from "@/components/north/GridFrame";
import type { LandingContent } from "@/lib/site-content";
import { useState } from "react";

export function FAQ({ faqs }: { faqs: LandingContent["faqs"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-section-black py-site" aria-labelledby="faq-heading">
      <div className="px-site">
        <GridFrame borders="tr" ink="nebula" strength={55} top>
          <div className="p-6 md:p-10">
            <h2 id="faq-heading" className="t2 text-white uppercase">
              FAQs
            </h2>
            <p className="t6 mt-4 text-neue">
              Find answers to commonly asked questions about Noros.
            </p>
          </div>
        </GridFrame>
        <GridFrame borders="trb" ink="nebula" strength={55} top>
          <div className="divide-y divide-[color-mix(in_srgb,var(--nebula)_35%,transparent)]">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <div key={faq.q} className="px-6 md:px-10">
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="min-w-0 text-[15px] font-medium text-white md:text-base">
                      {faq.q}
                    </span>
                    <span className="text-nebula-light" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                  >
                    {isOpen ? (
                      <p className="pb-5 text-[15px] leading-relaxed text-neue">{faq.a}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </GridFrame>
      </div>
    </section>
  );
}
