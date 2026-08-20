import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CloudWasteMedia } from "@/components/campaign/CloudWasteMedia";
import { CloudWasteSubNav } from "@/components/campaign/CloudWasteSubNav";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";

export default async function CloudWasteReportPage() {
  const { cloudWaste } = await getSiteContent();
  return (
    <CampaignShell title="Cloud Waste — Hidden Cost Report">
      {/* Landing hero */}
      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="relative overflow-hidden p-5 sm:p-8 md:p-10 lg:p-14">
          <div className="absolute inset-0">
            <CloudWasteMedia
              asset={cloudWaste.media.reportCover}
              className="h-full w-full object-cover"
              alt="Cloud Waste report cover media"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/55" />
          </div>
          <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Lead-Generation Landing · Downloadable Report
          </p>
          <BoxedTitle
            size="t2"
            className="mt-4"
            lines={[cloudWaste.report.title, cloudWaste.report.subtitle]}
          />
          <p className="t5 mt-4 text-neue">{cloudWaste.stat}</p>
          <p className="mt-1 font-mono text-[11px] text-neue/70">
            Source: {cloudWaste.statSource}
          </p>
          {/* Form preview only — not a live lead-gen form */}
          <div
            className="mt-8 max-w-sm rounded-lg border border-mint/40 bg-white/[0.02] p-5"
            role="group"
            aria-label="Report download form preview"
          >
            <p className="mb-1 font-mono text-[10px] tracking-[0.12em] text-mint uppercase">
              Get the report
            </p>
            <p className="mb-4 text-xs text-neue/70">Visual concept only — fields are not interactive.</p>
            {["Name", "Work email", "Company"].map((f) => (
              <div key={f} className="mb-3" aria-hidden="true">
                <p className="block text-xs text-neue/70">{f}</p>
                <div className="mt-1 h-11 rounded border border-white/25 bg-white/[0.03]" />
              </div>
            ))}
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="mt-2 min-h-11 w-full rounded-full bg-mint/80 py-2.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-black uppercase opacity-80"
            >
              Download Report
            </button>
          </div>
          </div>
        </Reveal>
      </GridFrame>

      {/* Report pages */}
      <div className="print:block">
        <RevealStagger className="grid md:grid-cols-2 print:grid-cols-1">
          {cloudWaste.report.pages.map((page) => (
            <RevealItem key={page.n}>
              <GridFrame borders="rb" ink="mint" strength={40}>
                <article className="flex min-h-[320px] flex-col p-5 sm:p-6 print:min-h-0 print:break-after-page">
                  <p className="font-mono text-[10px] text-neue/70">Page {page.n}</p>
                  <h3 className="t5 mt-2 text-white">{page.title}</h3>
                  {page.n === 1 && (
                    <div className="mt-4">
                      <p className="text-sm text-neue/70">{cloudWaste.report.subtitle}</p>
                      <p className="mt-2 font-mono text-[10px] text-mint">by Noros</p>
                    </div>
                  )}
                  {"body" in page && page.body && (
                    <p className="mt-3 text-sm leading-relaxed text-neue/70">{page.body}</p>
                  )}
                  {"items" in page && page.items && (
                    <ul className="mt-4 flex flex-col gap-3">
                      {page.items.map((item) => (
                        <li key={item.label}>
                          <p className="font-mono text-[10px] tracking-[0.08em] text-mint uppercase">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-xs leading-relaxed text-neue/70">
                            {item.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {"before" in page && page.before && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-mono text-[10px] text-neue/70">Before</p>
                        <p className="mt-1 text-xs text-neue/70">Monthly: {page.before.monthly}</p>
                        <p className="text-xs text-red-400">Waste: {page.before.waste}</p>
                        <p className="text-xs text-neue/70">{page.before.detected}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-mint">After (90 days)</p>
                        <p className="mt-1 text-xs text-neue/70">Monthly: {page.after!.monthly}</p>
                        <p className="text-xs text-neue/70">Identified: {page.after!.waste}</p>
                        <p className="text-xs text-mint">{page.after!.recovered}</p>
                      </div>
                    </div>
                  )}
                  {"cta" in page && page.cta && (
                    <p className="mt-auto pt-4 font-mono text-[10px] tracking-[0.08em] text-mint uppercase">
                      {page.cta} →
                    </p>
                  )}
                </article>
              </GridFrame>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
      <CloudWasteSubNav current="/campaign/cloud-waste/report" />
    </CampaignShell>
  );
}
