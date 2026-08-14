"use client";

import { BoxedH1 } from "@/components/north/BoxedTitle";
import { NorosMark } from "@/components/north/Marks";
import { boxedLines, type LandingContent } from "@/lib/site-content";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export function Hero({
  hero,
  imageUrl,
}: {
  hero: LandingContent["hero"];
  imageUrl: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="heroFeature accent-mint relative overflow-hidden bg-black">
      <motion.img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_32%] sm:object-center"
        initial={reduce ? false : { scale: 1 }}
        animate={reduce ? undefined : { scale: 1.04 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-site pt-16 pb-8 md:pt-36 md:pb-10">
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <NorosMark className="mx-auto mb-6 opacity-80 md:mb-8" />
        </motion.div>

        <motion.div
          className="text-center"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <BoxedH1 lines={boxedLines(hero.headline)} />
        </motion.div>

        <motion.p
          className="mt-6 w-full max-w-[40rem] text-center font-mono text-[10px] leading-[1.55] tracking-[0.04em] text-neue uppercase sm:text-[11px] md:mt-8 md:self-end md:text-right md:text-xs"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
        >
          {hero.support}
        </motion.p>

        <motion.div
          className="button-rail mt-6 mb-8 flex h-14 w-full max-w-[36rem] items-stretch gap-2 rounded-[8rem] p-1.5 sm:h-16 sm:p-2 md:mt-10 md:mb-16 md:h-24 md:gap-4 md:self-end md:p-4"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <Link href="/campaign/meet" className="hero-cta hero-cta-trial">
            {hero.primaryCta}
          </Link>
          <Link href="/campaign/meet" className="hero-cta hero-cta-demo">
            {hero.secondaryCta}
          </Link>
        </motion.div>

        <motion.div
          className="w-full min-w-0 overflow-hidden rounded-[0.4rem] bg-black/30 p-2 backdrop-blur-xl sm:p-4 md:rounded-[1.6rem] md:p-10"
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
