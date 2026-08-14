import { SiteNav } from "@/components/landing/SiteNav";
import { Hero } from "@/components/landing/Hero";
import { ValueProps } from "@/components/landing/ValueProps";
import { FeatureBlocks } from "@/components/landing/FeatureBlocks";
import { Testimonials } from "@/components/landing/Testimonials";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { FAQ } from "@/components/landing/FAQ";
import { SiteFooter } from "@/components/landing/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="min-w-0 overflow-x-clip">
        <Hero />
        <ValueProps />
        <FeatureBlocks />
        <Testimonials />
        <ClosingCta />
        <FAQ />
        <section id="integrations" className="sr-only" aria-hidden>
          Integrations
        </section>
        <section id="pricing" className="sr-only" aria-hidden>
          Pricing
        </section>
        <section id="sign-in" className="sr-only" aria-hidden>
          Sign In
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
