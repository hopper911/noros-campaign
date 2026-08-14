import { CampaignShell } from "@/components/campaign/CampaignShell";
import { carouselSlides } from "@/lib/messaging";

export default function CarouselPage() {
  return (
    <CampaignShell title="Five-slide LinkedIn carousel">
      <p className="mb-8 max-w-2xl text-sm text-neue">
        1080×1080 frames. Swipe narrative: promise → three seats → product.
      </p>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 [-webkit-overflow-scrolling:touch]">
        {carouselSlides.map((slide, i) => (
          <article
            key={slide.label}
            className="kit-frame relative aspect-square w-[min(100%,320px)] shrink-0 snap-start constellation"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-nebula/20 via-transparent to-black" />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-neue">
                <span>{slide.label}</span>
                <span>
                  {i + 1}/5
                </span>
              </div>
              <div>
                <div className="font-medium text-mint">Noros</div>
                <h2 className="mt-2 text-2xl font-medium leading-tight tracking-tight text-white">
                  {slide.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neue">{slide.body}</p>
              </div>
              <div className="text-[10px] text-neue/70">
                Ask your cloud what it costs—and why.
              </div>
            </div>
          </article>
        ))}
      </div>
    </CampaignShell>
  );
}
