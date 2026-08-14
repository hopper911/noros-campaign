"use client";

import { BoxedH1 } from "@/components/north/BoxedTitle";
import { NorosMark } from "@/components/north/Marks";
import { landingCopy } from "@/lib/messaging";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const { hero } = landingCopy;
  const reduce = useReducedMotion();

  return (
    <section className="heroFeature accent-mint relative overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/north/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-site pt-28 pb-10 text-center md:pt-36">
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <NorosMark className="mx-auto mb-6 opacity-80 md:mb-8" />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <BoxedH1 lines={["The AI for", "cloud operators."]} />
        </motion.div>

        <motion.p
          className="mt-6 max-w-[36rem] text-[15px] leading-relaxed text-neue md:text-base"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
        >
          {hero.support}
        </motion.p>

        <motion.div
          className="button-rail mt-8 mb-10 flex h-16 w-full max-w-[36rem] items-stretch gap-2 rounded-[8rem] p-2 md:mt-10 md:mb-16 md:h-24 md:gap-4 md:p-4"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <a
            href="#trial"
            className="flex h-full flex-1 items-center justify-center rounded-[8rem] bg-black text-[15px] font-medium text-white"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#demo"
            className="flex h-full flex-1 items-center justify-center rounded-[8rem] bg-black text-[15px] font-medium text-white"
          >
            {hero.secondaryCta}
          </a>
        </motion.div>

        <motion.div
          className="w-full overflow-hidden rounded-[0.4rem] bg-black/30 p-4 backdrop-blur-xl md:rounded-[1.6rem] md:p-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <div className="relative aspect-[1.45/1] overflow-hidden rounded-[0.2rem] md:rounded-[0.8rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/north/feature-chat.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
