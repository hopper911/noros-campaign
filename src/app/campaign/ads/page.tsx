import { CampaignShell } from "@/components/campaign/CampaignShell";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";
import Link from "next/link";

export default async function AdsPage() {
  const { audiences } = await getSiteContent();
  const ads = [audiences.cfo, audiences.finops, audiences.engineer];

  return (
    <CampaignShell title="Three role-specific ads">
      <GridFrame borders="tr" ink="mint" strength={40}>
        <div className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
            LinkedIn · 1.91:1
          </p>
          <p className="t6 mt-4 max-w-2xl text-neue">
            Shared campaign line, role-specific emphasis.
          </p>
        </div>
      </GridFrame>
      <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (
          <RevealItem key={ad.id}>
            <GridFrame borders="rb" ink="mint" strength={40}>
              <article>
                <div className="relative aspect-[1.91/1] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ad.adImageUrl}
                    alt={`Noros LinkedIn ad for ${ad.shortLabel}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-5">
                    <div className="font-mono text-[10px] tracking-[0.16em] text-mint uppercase">
                      Noros · {ad.shortLabel}
                    </div>
                    <h2 className="mt-1 text-lg font-medium leading-snug text-white">
                      {ad.adHeadline}
                    </h2>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium text-white">{ad.adHeadline}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-neue">{ad.adBody}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href="/campaign/meet" className="btn-trial">
                      {ad.cta}
                    </Link>
                    <Link
                      href={`/campaign/${ad.id === "engineer" ? "engineers" : ad.id}`}
                      className="btn-nav"
                    >
                      Role hero
                    </Link>
                  </div>
                </div>
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>
    </CampaignShell>
  );
}
