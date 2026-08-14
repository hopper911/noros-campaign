import { CampaignShell } from "@/components/campaign/CampaignShell";
import { storyboardFrames } from "@/lib/messaging";

export default function StoryboardPage() {
  return (
    <CampaignShell title="30-second motion storyboard">
      <p className="mb-8 max-w-2xl text-sm text-muted">
        Six beats. Calm motion: type → answer → alert → three seats → dashboard → CTA.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {storyboardFrames.map((frame, i) => (
          <article key={frame.t} className="kit-frame overflow-hidden">
            <div className="aspect-video constellation relative border-b border-border">
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="font-display text-4xl text-nebula/40">{i + 1}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-[0.14em] text-nebula-bright">
                {frame.t}
              </div>
              <h3 className="mt-1 font-semibold text-star">{frame.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{frame.visual}</p>
            </div>
          </article>
        ))}
      </div>
    </CampaignShell>
  );
}
