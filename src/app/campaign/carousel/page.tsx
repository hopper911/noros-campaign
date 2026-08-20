import { CampaignShell } from "@/components/campaign/CampaignShell";
import { GridFrame } from "@/components/north/GridFrame";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteContent } from "@/lib/get-site-content";

export default async function CarouselPage() {
  const { carouselSlides, campaignLine } = await getSiteContent();

  return (
    <CampaignShell title="Five-slide LinkedIn carousel">
      <GridFrame borders="tr" ink="mint" strength={40}>
        <div className="p-5 sm:p-8 md:p-10">
          <p className="font-mono text-[11px] tracking-[0.16em] text-mint uppercase">
            1080 × 1080
          </p>
          <p className="t6 mt-4 max-w-2xl text-neue">
            Swipe narrative: promise → three seats → product.
          </p>
        </div>
      </GridFrame>
      <Reveal>
        <div className="flex snap-x snap-mandatory gap-0 overflow-x-auto overscroll-x-contain pb-4 [-webkit-overflow-scrolling:touch]">
          {carouselSlides.map((slide, i) => (
            <article
              key={slide.label}
              className="relative aspect-square w-[min(100%,320px)] shrink-0 snap-start overflow-hidden"
            >
              <GridFrame borders="rb" ink="mint" strength={40} className="h-full">
                <div className="relative h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.imageUrl}
                    alt={`Carousel slide ${i + 1}: ${slide.title}`}
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-neue uppercase">
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
                    <div className="font-mono text-[10px] tracking-[0.08em] text-neue/70 uppercase">
                      {campaignLine}
                    </div>
                  </div>
                </div>
              </GridFrame>
            </article>
          ))}
        </div>
      </Reveal>
    </CampaignShell>
  );
}
