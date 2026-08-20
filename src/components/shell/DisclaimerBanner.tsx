import { getSiteContent } from "@/lib/get-site-content";
import Link from "next/link";

export async function DisclaimerBanner() {
  const { disclaimer } = await getSiteContent();
  return (
    <div
      className="no-print relative z-[60] border-b border-white/25 bg-black px-3 py-2 text-[12px] leading-snug text-neue sm:px-4 sm:text-center md:text-sm"
      role="note"
    >
      <p>
        <span className="font-medium text-mint">Portfolio add-on</span>
        <span className="mx-2 text-white/20">·</span>
        {disclaimer}
      </p>
      <Link
        href="/campaign"
        className="mt-1 inline-block text-mint underline-offset-2 hover:underline sm:mt-0 sm:ml-2"
      >
        Campaign kit
      </Link>
    </div>
  );
}
