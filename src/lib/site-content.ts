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
  heroImageUrl: string;
};

export type CarouselSlide = (typeof carouselSlides)[number] & {
  imageUrl: string;
};

export type StoryboardFrame = (typeof storyboardFrames)[number] & {
  imageUrl: string;
};

export type LandingFeature = (typeof landingCopy.features)[number] & {
  media: string;
};

export type LandingContent = Omit<typeof landingCopy, "features"> & {
  heroImageUrl: string;
  heroInsetUrl: string;
  valueImageUrl: string;
  quotesImageUrl: string;
  ctaImageUrl: string;
  features: LandingFeature[];
};

export type KitGraphics = {
  meetImageUrl: string;
  uiImageUrl: string;
  briefImageUrl: string;
  emailImageUrl: string;
  eventImageUrl: string;
  launchImageUrl: string;
  announceImageUrl: string;
  announceSecondaryImageUrl: string;
};

export type SiteContent = {
  campaignLine: string;
  disclaimer: string;
  product: typeof PRODUCT;
  audiences: Record<AudienceId, AudienceContent>;
  carouselSlides: CarouselSlide[];
  storyboardFrames: StoryboardFrame[];
  landing: LandingContent;
  kit: KitGraphics;
};

const DEFAULT_IMAGE = "/north/hero.jpg";
const FEATURE_MEDIA = ["/north/mux-1.webp", "/north/mux-2.webp", "/north/mux-3.webp"];

export function defaultSiteContent(): SiteContent {
  return {
    campaignLine: CAMPAIGN_LINE,
    disclaimer: DISCLAIMER,
    product: { ...PRODUCT },
    audiences: {
      cfo: {
        ...audiences.cfo,
        proofPoints: [...audiences.cfo.proofPoints],
        adImageUrl: DEFAULT_IMAGE,
        heroImageUrl: DEFAULT_IMAGE,
      },
      finops: {
        ...audiences.finops,
        proofPoints: [...audiences.finops.proofPoints],
        adImageUrl: DEFAULT_IMAGE,
        heroImageUrl: DEFAULT_IMAGE,
      },
      engineer: {
        ...audiences.engineer,
        proofPoints: [...audiences.engineer.proofPoints],
        adImageUrl: DEFAULT_IMAGE,
        heroImageUrl: DEFAULT_IMAGE,
      },
    },
    carouselSlides: carouselSlides.map((s) => ({ ...s, imageUrl: DEFAULT_IMAGE })),
    storyboardFrames: storyboardFrames.map((s) => ({ ...s, imageUrl: DEFAULT_IMAGE })),
    landing: {
      ...structuredClone(landingCopy),
      heroImageUrl: DEFAULT_IMAGE,
      heroInsetUrl: "/north/feature-chat.jpg",
      valueImageUrl: "/north/shard.png",
      quotesImageUrl: "/north/quotes.png",
      ctaImageUrl: "/north/get-started.jpg",
      features: landingCopy.features.map((feature, i) => ({
        ...structuredClone(feature),
        media: FEATURE_MEDIA[i] ?? DEFAULT_IMAGE,
      })),
    },
    kit: {
      meetImageUrl: DEFAULT_IMAGE,
      uiImageUrl: DEFAULT_IMAGE,
      briefImageUrl: DEFAULT_IMAGE,
      emailImageUrl: DEFAULT_IMAGE,
      eventImageUrl: DEFAULT_IMAGE,
      launchImageUrl: DEFAULT_IMAGE,
      announceImageUrl: DEFAULT_IMAGE,
      announceSecondaryImageUrl: "/north/get-started.jpg",
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
  const kitIn = isRecord(stored.kit) ? stored.kit : {};
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
      heroImageUrl: str(raw.heroImageUrl, fallback.heroImageUrl),
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
            imageUrl: str(raw.imageUrl, fallback.imageUrl),
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
            imageUrl: str(raw.imageUrl, fallback.imageUrl),
          };
        })
      : base.storyboardFrames,
    landing: {
      ...base.landing,
      heroImageUrl: str(landingIn.heroImageUrl, base.landing.heroImageUrl),
      heroInsetUrl: str(landingIn.heroInsetUrl, base.landing.heroInsetUrl),
      valueImageUrl: str(landingIn.valueImageUrl, base.landing.valueImageUrl),
      quotesImageUrl: str(landingIn.quotesImageUrl, base.landing.quotesImageUrl),
      ctaImageUrl: str(landingIn.ctaImageUrl, base.landing.ctaImageUrl),
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
        ? landingIn.features.map((feature, i) => {
            const raw = isRecord(feature) ? feature : {};
            const fallback = base.landing.features[i] ?? base.landing.features[0];
            const beats = Array.isArray(raw.beats) ? raw.beats : fallback.beats;
            return {
              ...fallback,
              code: str(raw.code, fallback.code),
              label: str(raw.label, fallback.label),
              kicker: str(raw.kicker, fallback.kicker),
              title: str(raw.title, fallback.title),
              media: str(raw.media, fallback.media),
              beats: beats.map((beat, bi) => {
                const b = isRecord(beat) ? beat : {};
                const fb = fallback.beats[bi] ?? fallback.beats[0];
                return {
                  n: str(b.n, fb.n),
                  title: str(b.title, fb.title),
                  body: str(b.body, fb.body),
                };
              }),
            };
          })
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
    kit: {
      meetImageUrl: str(kitIn.meetImageUrl, base.kit.meetImageUrl),
      uiImageUrl: str(kitIn.uiImageUrl, base.kit.uiImageUrl),
      briefImageUrl: str(kitIn.briefImageUrl, base.kit.briefImageUrl),
      emailImageUrl: str(kitIn.emailImageUrl, base.kit.emailImageUrl),
      eventImageUrl: str(kitIn.eventImageUrl, base.kit.eventImageUrl),
      launchImageUrl: str(kitIn.launchImageUrl, base.kit.launchImageUrl),
      announceImageUrl: str(kitIn.announceImageUrl, base.kit.announceImageUrl),
      announceSecondaryImageUrl: str(
        kitIn.announceSecondaryImageUrl,
        base.kit.announceSecondaryImageUrl,
      ),
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

export const MEDIA_KINDS = [
  "ad-cfo",
  "ad-finops",
  "ad-engineer",
  "role-cfo",
  "role-finops",
  "role-engineer",
  "carousel-0",
  "carousel-1",
  "carousel-2",
  "carousel-3",
  "carousel-4",
  "storyboard-0",
  "storyboard-1",
  "storyboard-2",
  "storyboard-3",
  "storyboard-4",
  "storyboard-5",
  "kit-meet",
  "kit-ui",
  "kit-brief",
  "kit-email",
  "kit-event",
  "kit-launch",
  "kit-announce",
  "kit-announce-secondary",
  "hero",
  "hero-inset",
  "landing-value",
  "landing-quotes",
  "landing-cta",
  "feature-0",
  "feature-1",
  "feature-2",
] as const;

export type MediaKind = (typeof MEDIA_KINDS)[number];

const KIT_FIELDS: Partial<Record<MediaKind, keyof KitGraphics>> = {
  "kit-meet": "meetImageUrl",
  "kit-ui": "uiImageUrl",
  "kit-brief": "briefImageUrl",
  "kit-email": "emailImageUrl",
  "kit-event": "eventImageUrl",
  "kit-launch": "launchImageUrl",
  "kit-announce": "announceImageUrl",
  "kit-announce-secondary": "announceSecondaryImageUrl",
};

export function applyMediaUrl(content: SiteContent, kind: MediaKind, url: string): SiteContent {
  const next = structuredClone(content);
  if (kind.startsWith("ad-")) {
    const id = kind.slice(3) as AudienceId;
    next.audiences[id].adImageUrl = url;
    return next;
  }
  if (kind.startsWith("role-")) {
    const id = kind.slice(5) as AudienceId;
    next.audiences[id].heroImageUrl = url;
    return next;
  }
  if (kind.startsWith("carousel-")) {
    const i = Number(kind.slice("carousel-".length));
    if (next.carouselSlides[i]) next.carouselSlides[i].imageUrl = url;
    return next;
  }
  if (kind.startsWith("storyboard-")) {
    const i = Number(kind.slice("storyboard-".length));
    if (next.storyboardFrames[i]) next.storyboardFrames[i].imageUrl = url;
    return next;
  }
  if (kind.startsWith("feature-")) {
    const i = Number(kind.slice("feature-".length));
    if (next.landing.features[i]) next.landing.features[i].media = url;
    return next;
  }
  const kitField = KIT_FIELDS[kind];
  if (kitField) {
    next.kit[kitField] = url;
    return next;
  }
  if (kind === "hero") next.landing.heroImageUrl = url;
  if (kind === "hero-inset") next.landing.heroInsetUrl = url;
  if (kind === "landing-value") next.landing.valueImageUrl = url;
  if (kind === "landing-quotes") next.landing.quotesImageUrl = url;
  if (kind === "landing-cta") next.landing.ctaImageUrl = url;
  return next;
}
