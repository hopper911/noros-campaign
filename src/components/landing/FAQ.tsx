"use client";

import { GridFrame } from "@/components/north/GridFrame";
import { landingCopy } from "@/lib/messaging";
import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-section-black py-site">
      <div className="px-site">
        <GridFrame borders="tr" ink="mint" strength={40}>
          <div className="p-6 md:p-10">
            <h2 className="t2 text-white">FAQs</h2>
            <p className="t6 mt-4 text-neue">
              Find answers to commonly asked questions about Noros.
            </p>
          </div>
        </GridFrame>
        <GridFrame borders="trb" ink="mint" strength={40}>
          <div className="divide-y divide-white/10">
            {landingCopy.faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="px-6 md:px-10">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="min-w-0 text-[15px] font-medium text-white md:text-base">
                      {faq.q}
                    </span>
                    <span className="text-mint">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-[15px] leading-relaxed text-neue">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </GridFrame>
      </div>
    </section>
  );
}
