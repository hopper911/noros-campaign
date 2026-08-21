import { SiteNav } from "@/components/landing/SiteNav";
import { Hero } from "@/components/landing/Hero";
import { ValueProps } from "@/components/landing/ValueProps";
import { FeatureBlocks } from "@/components/landing/FeatureBlocks";
import { Testimonials } from "@/components/landing/Testimonials";
import { IntegrationsBand } from "@/components/landing/IntegrationsBand";
import { PricingSection } from "@/components/landing/PricingSection";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { FAQ } from "@/components/landing/FAQ";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { getSiteContent } from "@/lib/get-site-content";

export default async function HomePage() {
  const content = await getSiteContent();
  const { landing } = content;

  return (
    <>
      <SiteNav />
      <main id="main-content" className="min-w-0 overflow-x-clip">
        <Hero
          hero={landing.hero}
          imageUrl={landing.heroImageUrl}
          insetUrl={landing.heroInsetUrl}
        />
        <ValueProps value={landing.value} imageUrl={landing.valueImageUrl} />
        <FeatureBlocks features={landing.features} />
        <Testimonials testimonials={landing.testimonials} imageUrl={landing.quotesImageUrl} />
        <IntegrationsBand />
        <PricingSection />
        <ClosingCta cta={landing.cta} />
        <FAQ faqs={landing.faqs} />
      </main>
      <SiteFooter />
    </>
  );
}
