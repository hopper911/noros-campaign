import { CampaignShell } from "@/components/campaign/CampaignShell";
import { audiences } from "@/lib/messaging";
import Link from "next/link";

export default function AdsPage() {
  const ads = [audiences.cfo, audiences.finops, audiences.engineer];

  return (
    <CampaignShell title="Three role-specific ads">
      <p className="mb-8 max-w-2xl text-sm text-neue">
        LinkedIn single-image mocks (1.91:1). Shared campaign line, role-specific emphasis.
      </p>
      <div className="grid gap-6 lg:grid-cols-3">
        {ads.map((ad) => (
          <article key={ad.id} className="kit-frame">
            <div className="relative aspect-[1.91/1] overflow-hidden constellation border-b border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
                  Noros · {ad.shortLabel}
                </div>
                <h2 className="mt-1 text-lg font-medium leading-snug text-white">
                  {ad.adHeadline}
                </h2>
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs font-medium text-white">Noros</div>
              <p className="mt-2 text-sm font-medium text-white">{ad.adHeadline}</p>
              <p className="mt-2 text-xs leading-relaxed text-neue">{ad.adBody}</p>
              <div className="mt-4 inline-flex rounded-full bg-mint px-3 py-1 text-xs font-medium text-black">
                {ad.cta}
              </div>
              <Link
                href={`/campaign/${ad.id === "engineer" ? "engineers" : ad.id}`}
                className="mt-3 block text-[11px] text-neue hover:text-mint"
              >
                View role landing →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </CampaignShell>
  );
}
