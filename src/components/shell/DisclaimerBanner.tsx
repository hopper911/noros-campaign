import { DISCLAIMER } from "@/lib/messaging";
import Link from "next/link";

export function DisclaimerBanner() {
  return (
    <div className="no-print relative z-[60] border-b border-white/10 bg-black px-4 py-2 text-center text-[11px] leading-snug text-neue md:text-xs">
      <span className="font-medium text-mint">Portfolio add-on</span>
      <span className="mx-2 text-white/20">·</span>
      {DISCLAIMER}
      <span className="mx-2 hidden text-white/20 sm:inline">·</span>
      <Link
        href="/campaign"
        className="mt-1 inline-block text-mint underline-offset-2 hover:underline sm:mt-0 sm:ml-1"
      >
        Campaign kit
      </Link>
    </div>
  );
}
