import { getSiteContent } from "@/lib/get-site-content";
import { GridFrame } from "@/components/north/GridFrame";
import { NorthLogo } from "@/components/north/Marks";
import Link from "next/link";

export async function SiteFooter() {
  const { disclaimer } = await getSiteContent();
  return (
    <footer className="bg-black text-neue">
      <div className="px-site py-site">
        <GridFrame borders="trb" ink="mint" strength={40}>
          <div className="grid gap-12 p-6 md:grid-cols-4 md:p-10">
            <div>
              <h3 className="text-sm font-medium text-white">Contact</h3>
              <a
                href="mailto:hello@north.cloud"
                className="mt-4 inline-block text-sm text-mint hover:underline"
              >
                hello@north.cloud
              </a>
            </div>
            <div>
              <h3 className="mb-4 text-white">
                <Link href="/" aria-label="Home">
                  <NorthLogo />
                </Link>
              </h3>
              <p className="text-sm leading-relaxed">
                55 Washington Street
                <br />
                Suite 902
                <br />
                Brooklyn, NY 11201
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Features</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "AI Agent",
                  "Coststreams",
                  "Analyze",
                  "Anomalies",
                  "Coverage",
                  "Rightsize",
                  "GreenOps",
                  "TokenFlow",
                ].map((i) => (
                  <li key={i}>
                    <Link href="/#features" className="hover:text-white">
                      {i}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-white">Integrations</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {["AWS", "GCP", "Azure"].map((i) => (
                    <li key={i}>
                      <Link href="/#integrations" className="hover:text-white">
                        {i}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Company</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="/#pricing" className="hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaign/meet" className="hover:text-white">
                      Book a demo
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaign" className="text-mint hover:underline">
                      Portfolio campaign kit
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </GridFrame>
      </div>
      <div className="border-t border-white/10 px-site py-5 text-center text-[11px] text-neue/70">
        <p>© 2026 North Cloud Holdings Inc. — Recreated for portfolio purposes only.</p>
        <p className="mx-auto mt-2 max-w-3xl">{disclaimer}</p>
      </div>
    </footer>
  );
}
