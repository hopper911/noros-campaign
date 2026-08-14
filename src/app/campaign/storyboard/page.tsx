import { CampaignShell } from "@/components/campaign/CampaignShell";
import { GridFrame } from "@/components/north/GridFrame";
import { HeaderBar } from "@/components/north/HeaderBar";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { storyboardFrames } from "@/lib/messaging";

export default function StoryboardPage() {
  return (
    <CampaignShell title="30-second motion storyboard">
      <GridFrame borders="tr" ink="mint" strength={40}>
        <div className="p-5 sm:p-8 md:p-10">
          <HeaderBar />
          <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
            Six beats
          </p>
          <p className="t6 mt-4 max-w-2xl text-neue">
            Calm motion: type → answer → alert → three seats → dashboard → CTA.
          </p>
        </div>
      </GridFrame>
      <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-3">
        {storyboardFrames.map((frame, i) => (
          <RevealItem key={frame.t}>
            <GridFrame borders="rb" ink="mint" strength={40}>
              <article>
                <div className="relative aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/north/hero.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-35"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-5xl font-medium tracking-tight text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-mono text-[10px] tracking-[0.14em] text-mint uppercase">
                    {frame.t}
                  </div>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-white">
                    {frame.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-neue">{frame.visual}</p>
                </div>
              </article>
            </GridFrame>
          </RevealItem>
        ))}
      </RevealStagger>
    </CampaignShell>
  );
}
