import { CampaignShell } from "@/components/campaign/CampaignShell";
import { BoxedTitle } from "@/components/north/BoxedTitle";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { CW_WEBINAR, CW_SALES_DECK } from "@/lib/cloud-waste-messaging";

export default function CloudWasteWebinarPage() {
  return (
    <CampaignShell title="Cloud Waste — Webinar & Sales Deck">
      {/* Registration page */}
      <GridFrame borders="trb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8 md:p-10 lg:p-14">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Webinar Registration Page
          </p>
          <BoxedTitle size="t2" className="mt-4" lines={["Finding the waste", "your dashboard hides"]} />
          <p className="t6 mt-4 text-neue">{CW_WEBINAR.subtitle}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Agenda */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.12em] text-mint uppercase">Agenda</p>
              <ul className="mt-3 flex flex-col gap-2">
                {CW_WEBINAR.agenda.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neue/70">
                    <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-mint" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded border border-white/10 bg-white/[0.02] p-4">
                <p className="font-mono text-[10px] text-neue/40">Speaker</p>
                <p className="mt-1 text-sm text-white">{CW_WEBINAR.speaker.name}</p>
                <p className="text-xs text-neue/50">{CW_WEBINAR.speaker.role}</p>
              </div>
            </div>

            {/* Registration form (visual only) */}
            <div className="rounded-lg border border-mint/20 bg-white/[0.02] p-5">
              <p className="mb-4 font-mono text-[10px] tracking-[0.12em] text-mint uppercase">
                Reserve your seat
              </p>
              {["First name", "Last name", "Work email", "Company", "Role"].map((f) => (
                <div key={f} className="mb-3">
                  <label className="block text-xs text-neue/60">{f}</label>
                  <div className="mt-1 h-9 rounded border border-white/10 bg-white/[0.03]" />
                </div>
              ))}
              <button className="mt-2 w-full rounded-full bg-mint py-2.5 font-mono text-[11px] font-semibold tracking-[0.08em] text-black uppercase">
                Register Now
              </button>
            </div>
          </div>
        </Reveal>
      </GridFrame>

      {/* Sales follow-up deck */}
      <GridFrame borders="rb" ink="mint" strength={40}>
        <Reveal className="p-5 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-mint uppercase">
            Sales Follow-Up Deck · 8 Slides
          </p>
        </Reveal>
      </GridFrame>

      <RevealStagger className="grid grid-cols-2 md:grid-cols-4">
        {CW_SALES_DECK.map((slide) => (
          <RevealItem key={slide.n}>
            <GridFrame borders="rb" ink="mint" strength={40}>
              <article className="flex aspect-[16/10] flex-col justify-end p-4">
                <p className="font-mono text-[9px] text-neue/40">Slide {slide.n}</p>
                <h3 className="mt-1 text-[11px] font-semibold leading-tight text-white">
                  {slide.title}
                </h3>
                {"subtitle" in slide && slide.subtitle && (
                  <p className="mt-0.5 text-[9px] text-neue/50">{slide.subtitle}</p>
                )}
                {"body" in slide && slide.body && (
                  <p className="mt-1 text-[9px] leading-snug text-neue/60">{slide.body}</p>
                )}
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>
    </CampaignShell>
  );
}
