import { getSiteContent } from "@/lib/get-site-content";
import { GridFrame } from "@/components/north/GridFrame";
import { NorthLogo } from "@/components/north/Marks";
import Link from "next/link";

const legal = [
  { label: "Privacy policy", href: "/#legal" },
  { label: "Terms of service", href: "/#legal" },
  { label: "AI Policy", href: "/#legal" },
  { label: "Trust Center", href: "/#legal" },
  { label: "Docs", href: "/#features" },
  { label: "Security", href: "/#legal" },
];

export async function SiteFooter() {
  const { disclaimer } = await getSiteContent();
  return (
    <footer className="bg-nebula-light text-black">
      <div className="px-site py-site">
        <h2 className="sr-only">Footer</h2>
        <div className="grid gap-0 md:grid-cols-3">
          <GridFrame borders="trb" ink="black" strength={40} top>
            <div className="flex h-full min-h-[16rem] flex-col justify-between p-6 md:p-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase">
                  GreenOps
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                  TokenFlow
                </p>
                <Link
                  href="/"
                  aria-label="Home"
                  className="mt-8 inline-block text-black"
                >
                  <NorthLogo className="[&_.logo]:h-8 [&_.logo]:w-[8.2rem] sm:[&_.logo]:h-10 sm:[&_.logo]:w-[10rem]" />
                </Link>
              </div>
              <p className="mt-10 font-mono text-[10px] leading-relaxed tracking-[0.08em] uppercase">
                © 2026 North Cloud Holdings Inc.
                <br />
                All rights reserved.
              </p>
            </div>
          </GridFrame>

          <GridFrame borders="rb" ink="black" strength={40} top>
            <div className="flex h-full min-h-[16rem] flex-col justify-between p-6 md:p-8">
              <div>
                <h3 className="text-base font-medium tracking-tight">Legal</h3>
                <ul className="mt-5 space-y-2 font-mono text-[11px] tracking-[0.1em] uppercase">
                  {legal.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="hover:underline">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-10 font-mono text-[10px] tracking-[0.1em] uppercase">
                * Website by{" "}
                <a
                  href="https://non-linear.studio"
                  className="underline underline-offset-2"
                  rel="noreferrer"
                  target="_blank"
                >
                  Non-Linear Studio
                </a>
              </p>
            </div>
          </GridFrame>

          <GridFrame borders="rb" ink="black" strength={40} top>
            <div className="flex h-full min-h-[16rem] flex-col p-6 md:p-8">
              <h3 className="text-base font-medium tracking-tight">North</h3>
              <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-[0.08em] uppercase">
                55 Washington Street
                <br />
                Suite 902
                <br />
                Brooklyn, NY 11201
              </p>
              <a
                href="mailto:hello@north.cloud"
                className="mt-6 inline-block font-mono text-[11px] tracking-[0.1em] uppercase underline underline-offset-2"
              >
                hello@north.cloud
              </a>
              <Link
                href="/campaign"
                className="mt-auto pt-10 font-mono text-[11px] tracking-[0.1em] uppercase underline underline-offset-2"
              >
                Portfolio campaign kit
              </Link>
            </div>
          </GridFrame>
        </div>
      </div>
      <div className="border-t border-black/25 px-site py-5 text-center text-[11px] text-black/75">
        <p className="font-mono tracking-[0.06em] uppercase">
          Recreated for portfolio purposes only — not affiliated with North.Cloud.
        </p>
        <p className="mx-auto mt-2 max-w-3xl">{disclaimer}</p>
      </div>
    </footer>
  );
}
