import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CloudWasteMedia } from "@/components/campaign/CloudWasteMedia";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";

export default async function CloudWasteWebinarPage() {
  const { cloudWaste } = await getSiteContent();
  const titleLines = cloudWaste.webinar.title.includes(" ")
    ? (() => {
        const words = cloudWaste.webinar.title.split(" ");
        const mid = Math.ceil(words.length / 2);
        return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")].filter(Boolean);
      })()
    : [cloudWaste.webinar.title];

  return (
    <CampaignShell title="Cloud Waste — Webinar & Sales Deck">
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="relative overflow-hidden">
          <div className="absolute inset-0">
            {cloudWaste.media.webinar ? (
              <CloudWasteMedia
                asset={cloudWaste.media.webinar}
                className="h-full w-full object-cover"
                alt="Cloud Waste webinar background"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 15% 20%, rgba(162,242,227,0.18), transparent 45%), radial-gradient(ellipse at 85% 80%, rgba(162,242,227,0.08), transparent 40%), linear-gradient(160deg, #0a0b0c 0%, #121314 50%, #000 100%)",
                }}
              />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/45" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

          <div className="relative z-10 grid gap-10 p-5 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:gap-12 md:p-10 lg:p-14">
            <div className="flex flex-col">
              <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
                Webinar Registration
              </p>
              <BoxedTitle size="t2" className="mt-4" lines={titleLines} />
              <p className="t6 mt-5 max-w-xl text-white/85">{cloudWaste.webinar.subtitle}</p>

              <div className="mt-10">
                <p className="font-mono text-[10px] tracking-[0.14em] text-mint uppercase">
                  Agenda
                </p>
                <ol className="mt-4 space-y-3">
                  {cloudWaste.webinar.agenda.map((item, i) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                      <span className="mt-0.5 font-mono text-[11px] text-mint/80 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="font-mono text-[10px] tracking-[0.12em] text-neue/50 uppercase">
                  Speaker
                </p>
                <p className="mt-2 text-lg text-white">{cloudWaste.webinar.speaker.name}</p>
                <p className="text-sm text-neue/65">{cloudWaste.webinar.speaker.role}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full border border-white/15 bg-black/70 p-5 shadow-[0_0_0_1px_rgba(162,242,227,0.08)] backdrop-blur-md sm:p-7">
                <p className="font-mono text-[10px] tracking-[0.14em] text-mint uppercase">
                  Reserve your seat
                </p>
                <p className="mt-2 text-sm text-white/60">
                  30 minutes. No pitch deck spam — just the waste sources most teams miss.
                </p>
                <div className="mt-6 space-y-3">
                  {["First name", "Last name", "Work email", "Company", "Role"].map((field) => (
                    <label key={field} className="block">
                      <span className="font-mono text-[10px] tracking-[0.08em] text-neue/55 uppercase">
                        {field}
                      </span>
                      <span className="mt-1.5 block h-11 border border-white/12 bg-white/[0.04]" />
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-6 w-full bg-mint py-3.5 font-mono text-[11px] font-semibold tracking-[0.1em] text-black uppercase transition hover:bg-white"
                >
                  Register now
                </button>
                <p className="mt-3 text-center font-mono text-[10px] text-neue/40 uppercase">
                  Visual mock · no data collected
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </GridFrame>

      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Sales Follow-Up Deck
          </p>
          <p className="mt-2 max-w-xl text-sm text-neue/70">
            Eight slides for the post-webinar conversation — problem, proof, and next step.
          </p>
        </Reveal>
      </GridFrame>

      <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cloudWaste.salesDeck.map((slide) => (
          <RevealItem key={slide.n}>
            <GridFrame borders="rb" ink="mint" strength={40}>
              <article className="flex min-h-[11rem] flex-col justify-between p-5 transition hover:bg-white/[0.02] sm:min-h-[13rem]">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-mint uppercase">
                    Slide {String(slide.n).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <div className="mt-6">
                  <h3 className="text-base font-medium leading-snug tracking-tight text-white">
                    {slide.title}
                  </h3>
                  {"subtitle" in slide && slide.subtitle ? (
                    <p className="mt-2 text-sm text-mint/80">{slide.subtitle}</p>
                  ) : null}
                  {"body" in slide && slide.body ? (
                    <p className="mt-2 text-sm leading-relaxed text-neue/65">{slide.body}</p>
                  ) : null}
                </div>
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>
    </CampaignShell>
  );
}
