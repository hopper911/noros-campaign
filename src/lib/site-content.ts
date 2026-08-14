import {
  CAMPAIGN_LINE,
  DISCLAIMER,
  PRODUCT,
  audiences,
  carouselSlides,
  landingCopy,
  storyboardFrames,
  type AudienceId,
} from "@/lib/messaging";

export type { AudienceId };

export type AudienceContent = (typeof audiences)[AudienceId] & {
  adImageUrl: string;
};

export type LandingContent = typeof landingCopy & {
  heroImageUrl: string;
};

export type SiteContent = {
  campaignLine: string;
  disclaimer: string;
  product: typeof PRODUCT;
  audiences: Record<AudienceId, AudienceContent>;
  carouselSlides: (typeof carouselSlides)[number][];
  storyboardFrames: (typeof storyboardFrames)[number][];
  landing: LandingContent;
};

const DEFAULT_IMAGE = "/north/hero.jpg";

export function defaultSiteContent(): SiteContent {
  return {
    campaignLine: CAMPAIGN_LINE,
    disclaimer: DISCLAIMER,
    product: { ...PRODUCT },
    audiences: {
      cfo: { ...audiences.cfo, proofPoints: [...audiences.cfo.proofPoints], adImageUrl: DEFAULT_IMAGE },
      finops: {
        ...audiences.finops,
        proofPoints: [...audiences.finops.proofPoints],
        adImageUrl: DEFAULT_IMAGE,
      },
      engineer: {
        ...audiences.engineer,
        proofPoints: [...audiences.engineer.proofPoints],
        adImageUrl: DEFAULT_IMAGE,
      },
    },
    carouselSlides: carouselSlides.map((s) => ({ ...s })),
    storyboardFrames: storyboardFrames.map((s) => ({ ...s })),
    landing: {
      ...structuredClone(landingCopy),
      heroImageUrl: DEFAULT_IMAGE,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function str(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function strList(value: unknown, fallback: string[]) {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : fallback;
}

export function mergeSiteContent(stored: unknown): SiteContent {
  const base = defaultSiteContent();
  if (!isRecord(stored)) return base;

  const product = isRecord(stored.product) ? stored.product : {};
  const audiencesIn = isRecord(stored.audiences) ? stored.audiences : {};
  const landingIn = isRecord(stored.landing) ? stored.landing : {};
  const heroIn = isRecord(landingIn.hero) ? landingIn.hero : {};
  const valueIn = isRecord(landingIn.value) ? landingIn.value : {};
  const ctaIn = isRecord(landingIn.cta) ? landingIn.cta : {};
  const testimonialsIn = isRecord(landingIn.testimonials) ? landingIn.testimonials : {};

  const mergeAudience = (id: AudienceId): AudienceContent => {
    const raw = isRecord(audiencesIn[id]) ? audiencesIn[id] : {};
    const fallback = base.audiences[id];
    return {
      ...fallback,
      id,
      label: str(raw.label, fallback.label),
      shortLabel: str(raw.shortLabel, fallback.shortLabel),
      headline: str(raw.headline, fallback.headline),
      subhead: str(raw.subhead, fallback.subhead),
      emphasis: str(raw.emphasis, fallback.emphasis),
      proofPoints: strList(raw.proofPoints, fallback.proofPoints),
      adHeadline: str(raw.adHeadline, fallback.adHeadline),
      adBody: str(raw.adBody, fallback.adBody),
      cta: str(raw.cta, fallback.cta),
      adImageUrl: str(raw.adImageUrl, fallback.adImageUrl),
    };
  };

  return {
    campaignLine: str(stored.campaignLine, base.campaignLine),
    disclaimer: str(stored.disclaimer, base.disclaimer),
    product: {
      name: str(product.name, base.product.name),
      tagline: str(product.tagline, base.product.tagline),
      support: str(product.support, base.product.support),
    },
    audiences: {
      cfo: mergeAudience("cfo"),
      finops: mergeAudience("finops"),
      engineer: mergeAudience("engineer"),
    },
    carouselSlides: Array.isArray(stored.carouselSlides)
      ? stored.carouselSlides.map((slide, i) => {
          const raw = isRecord(slide) ? slide : {};
          const fallback = base.carouselSlides[i] ?? base.carouselSlides[0];
          return {
            title: str(raw.title, fallback.title),
            body: str(raw.body, fallback.body),
            label: str(raw.label, fallback.label),
          };
        })
      : base.carouselSlides,
    storyboardFrames: Array.isArray(stored.storyboardFrames)
      ? stored.storyboardFrames.map((frame, i) => {
          const raw = isRecord(frame) ? frame : {};
          const fallback = base.storyboardFrames[i] ?? base.storyboardFrames[0];
          return {
            t: str(raw.t, fallback.t),
            title: str(raw.title, fallback.title),
            visual: str(raw.visual, fallback.visual),
          };
        })
      : base.storyboardFrames,
    landing: {
      ...base.landing,
      heroImageUrl: str(landingIn.heroImageUrl, base.landing.heroImageUrl),
      hero: {
        ...base.landing.hero,
        brand: str(heroIn.brand, base.landing.hero.brand),
        headline: str(heroIn.headline, base.landing.hero.headline),
        support: str(heroIn.support, base.landing.hero.support),
        primaryCta: str(heroIn.primaryCta, base.landing.hero.primaryCta),
        secondaryCta: str(heroIn.secondaryCta, base.landing.hero.secondaryCta),
      },
      value: {
        ...base.landing.value,
        eyebrow: str(valueIn.eyebrow, base.landing.value.eyebrow),
        items: Array.isArray(valueIn.items)
          ? valueIn.items.map((item, i) => {
              const raw = isRecord(item) ? item : {};
              const fallback = base.landing.value.items[i] ?? base.landing.value.items[0];
              return {
                title: str(raw.title, fallback.title),
                body: str(raw.body, fallback.body),
              };
            })
          : base.landing.value.items,
      },
      features: Array.isArray(landingIn.features)
        ? (landingIn.features as LandingContent["features"])
        : base.landing.features,
      testimonials: {
        ...base.landing.testimonials,
        title: str(testimonialsIn.title, base.landing.testimonials.title),
        items: Array.isArray(testimonialsIn.items)
          ? (testimonialsIn.items as LandingContent["testimonials"]["items"])
          : base.landing.testimonials.items,
      },
      cta: {
        ...base.landing.cta,
        title: str(ctaIn.title, base.landing.cta.title),
        body: str(ctaIn.body, base.landing.cta.body),
        primary: str(ctaIn.primary, base.landing.cta.primary),
        secondary: str(ctaIn.secondary, base.landing.cta.secondary),
      },
      faqs: Array.isArray(landingIn.faqs)
        ? (landingIn.faqs as LandingContent["faqs"])
        : base.landing.faqs,
    },
  };
}

export function boxedLines(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [""];
  const known: Record<string, string[]> = {
    "The AI for cloud operators.": ["The AI for", "cloud operators."],
    "Ask your cloud what it costs—and why.": ["Ask your cloud", "what it costs—and why."],
    "Faster answers. Sharper decisions.": ["Faster answers.", "Sharper decisions."],
    "An AI teammate that pulls its weight.": ["An AI teammate", "that pulls its weight."],
  };
  if (known[trimmed]) return known[trimmed];
  if (trimmed.includes("—")) {
    const i = trimmed.indexOf("—");
    return [trimmed.slice(0, i).trim(), trimmed.slice(i).trim()];
  }
  const dot = trimmed.indexOf(". ");
  if (dot > 0 && dot < trimmed.length - 2) {
    return [trimmed.slice(0, dot + 1), trimmed.slice(dot + 2)];
  }
  return [trimmed];
}

export const MEDIA_KINDS = ["ad-cfo", "ad-finops", "ad-engineer", "hero"] as const;
export type MediaKind = (typeof MEDIA_KINDS)[number];

export function applyMediaUrl(content: SiteContent, kind: MediaKind, url: string): SiteContent {
  const next = structuredClone(content);
  if (kind === "hero") {
    next.landing.heroImageUrl = url;
    return next;
  }
  const id: AudienceId = kind === "ad-cfo" ? "cfo" : kind === "ad-finops" ? "finops" : "engineer";
  next.audiences[id].adImageUrl = url;
  return next;
}
