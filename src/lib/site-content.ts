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
import {
  CW_ADS,
  CW_AUDIENCES,
  CW_CAMPAIGN_LINE,
  CW_DASHBOARD_KPIS,
  CW_EMAILS,
  CW_FUNNEL,
  CW_HERO,
  CW_INSIGHT,
  CW_MESSAGE_FRAMEWORK,
  CW_OOH,
  CW_PRODUCT,
  CW_REPORT,
  CW_SALES_DECK,
  CW_STAT,
  CW_STAT_SOURCE,
  CW_WEBINAR,
  type CwAudienceId,
} from "@/lib/cloud-waste-messaging";

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

export type CloudWasteMediaAsset = {
  url: string;
  mime: string;
  mediaType: "image" | "video";
};

export type CloudWasteAudience = {
  id: CwAudienceId;
  label: string;
  shortLabel: string;
  pain: string;
  promise: string;
  proof: string[];
  cta: string;
};

export type CloudWasteReportPage = {
  n: number;
  title: string;
  body?: string | null;
  items?: { label: string; body: string }[];
  before?: { monthly: string; waste: string; detected: string };
  after?: { monthly: string; waste: string; recovered: string };
  cta?: string;
};

export type CloudWasteEmail = {
  n: number;
  subject: string;
  preview: string;
  body: string;
  cta: string;
};

export type CloudWasteSalesDeckSlide = {
  n: number;
  title: string;
  subtitle?: string;
  body?: string;
};

export type CloudWasteKpi = {
  label: string;
  target: number;
  unit: string;
  prefix: string;
};

export type CloudWasteFunnelStep = {
  stage: string;
  value: number;
};

export type CloudWasteContent = {
  campaignLine: string;
  insight: string;
  stat: string;
  statSource: string;
  hero: typeof CW_HERO;
  messageFramework: typeof CW_MESSAGE_FRAMEWORK;
  product: typeof CW_PRODUCT;
  audiences: Record<CwAudienceId, CloudWasteAudience>;
  report: {
    title: string;
    subtitle: string;
    pages: CloudWasteReportPage[];
  };
  ads: {
    static: { headline: string; body: string; cta: string }[];
    carousel: { slide: number; title: string; body: string }[];
    display: typeof CW_ADS.display;
  };
  emails: CloudWasteEmail[];
  webinar: {
    title: string;
    subtitle: string;
    agenda: string[];
    speaker: { name: string; role: string };
  };
  salesDeck: CloudWasteSalesDeckSlide[];
  dashboard: {
    kpis: CloudWasteKpi[];
    funnel: CloudWasteFunnelStep[];
  };
  ooh: {
    headline: string;
    subline: string;
    placement: string;
    spec: string;
    conference: string;
  };
  media: {
    hero: CloudWasteMediaAsset | null;
    reportCover: CloudWasteMediaAsset | null;
    ads: (CloudWasteMediaAsset | null)[];
    carousel: (CloudWasteMediaAsset | null)[];
    webinar: CloudWasteMediaAsset | null;
    ooh: CloudWasteMediaAsset | null;
    dashboard: CloudWasteMediaAsset | null;
  };
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
  cloudWaste: CloudWasteContent;
  figmaKit: FigmaKitContent;
};

export type FigmaKitContent = {
  backgrounds: Record<string, string | null>;
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
    cloudWaste: {
      campaignLine: CW_CAMPAIGN_LINE,
      insight: CW_INSIGHT,
      stat: CW_STAT,
      statSource: CW_STAT_SOURCE,
      hero: structuredClone(CW_HERO),
      messageFramework: structuredClone(CW_MESSAGE_FRAMEWORK),
      product: { ...CW_PRODUCT },
      audiences: {
        vp: {
          ...CW_AUDIENCES.vp,
          proof: [...CW_AUDIENCES.vp.proof],
        },
        finops: {
          ...CW_AUDIENCES.finops,
          proof: [...CW_AUDIENCES.finops.proof],
        },
        cfo: {
          ...CW_AUDIENCES.cfo,
          proof: [...CW_AUDIENCES.cfo.proof],
        },
      },
      report: {
        title: CW_REPORT.title,
        subtitle: CW_REPORT.subtitle,
        pages: structuredClone(CW_REPORT.pages),
      },
      ads: {
        static: structuredClone(CW_ADS.static),
        carousel: structuredClone(CW_ADS.carousel),
        display: structuredClone(CW_ADS.display),
      },
      emails: structuredClone(CW_EMAILS),
      webinar: {
        title: CW_WEBINAR.title,
        subtitle: CW_WEBINAR.subtitle,
        agenda: [...CW_WEBINAR.agenda],
        speaker: { ...CW_WEBINAR.speaker },
      },
      salesDeck: structuredClone(CW_SALES_DECK),
      dashboard: {
        kpis: structuredClone(CW_DASHBOARD_KPIS),
        funnel: structuredClone(CW_FUNNEL),
      },
      ooh: { ...CW_OOH },
      media: {
        hero: null,
        reportCover: null,
        ads: CW_ADS.static.map(() => null),
        carousel: CW_ADS.carousel.map(() => null),
        webinar: null,
        ooh: null,
        dashboard: null,
      },
    },
    figmaKit: {
      backgrounds: {},
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

function num(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function cloudWasteMedia(
  value: unknown,
  fallback: CloudWasteMediaAsset | null,
): CloudWasteMediaAsset | null {
  if (!isRecord(value)) return fallback;
  const url = typeof value.url === "string" ? value.url : fallback?.url;
  const mime = typeof value.mime === "string" ? value.mime : fallback?.mime;
  const mediaType =
    value.mediaType === "video" || value.mediaType === "image"
      ? value.mediaType
      : fallback?.mediaType;
  if (!url || !mime || !mediaType) return null;

  const isInternalApiMedia = /^\/api\/media\/[0-9a-f-]{36}$/i.test(url);
  const isInternalNorthAsset = url.startsWith("/north/");
  if (!isInternalApiMedia && !isInternalNorthAsset) return null;
  if (mediaType === "video" && !isInternalApiMedia) return null;

  return { url, mime, mediaType };
}

const FIGMA_KIT_BG_KEY = /^[a-z0-9][a-z0-9._-]*\.svg$/i;
const API_MEDIA_URL = /^\/api\/media\/[0-9a-f-]{36}$/i;

export function figmaKitBackgroundKind(svgName: string) {
  const base = svgName.replace(/\.svg$/i, "");
  return `fk-bg-${base}`;
}

function figmaKitBackgroundUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return API_MEDIA_URL.test(value) ? value : null;
}

function mergeFigmaKitBackgrounds(
  raw: Record<string, unknown>,
  base: Record<string, string | null>,
): Record<string, string | null> {
  const out = { ...base };
  for (const [key, value] of Object.entries(raw)) {
    if (!FIGMA_KIT_BG_KEY.test(key)) continue;
    if (value === null) {
      delete out[key];
      continue;
    }
    const url = figmaKitBackgroundUrl(value);
    if (url) out[key] = url;
  }
  return out;
}

export function mergeSiteContent(stored: unknown): SiteContent {
  const base = defaultSiteContent();
  if (!isRecord(stored)) return base;

  const product = isRecord(stored.product) ? stored.product : {};
  const audiencesIn = isRecord(stored.audiences) ? stored.audiences : {};
  const landingIn = isRecord(stored.landing) ? stored.landing : {};
  const kitIn = isRecord(stored.kit) ? stored.kit : {};
  const cloudWasteIn = isRecord(stored.cloudWaste) ? stored.cloudWaste : {};
  const heroIn = isRecord(landingIn.hero) ? landingIn.hero : {};
  const valueIn = isRecord(landingIn.value) ? landingIn.value : {};
  const ctaIn = isRecord(landingIn.cta) ? landingIn.cta : {};
  const testimonialsIn = isRecord(landingIn.testimonials) ? landingIn.testimonials : {};
  const cwProductIn = isRecord(cloudWasteIn.product) ? cloudWasteIn.product : {};
  const cwHeroIn = isRecord(cloudWasteIn.hero) ? cloudWasteIn.hero : {};
  const cwHeroPrimaryIn = isRecord(cwHeroIn.primaryCta) ? cwHeroIn.primaryCta : {};
  const cwHeroSecondaryIn = isRecord(cwHeroIn.secondaryCta) ? cwHeroIn.secondaryCta : {};
  const cwFrameworkIn = isRecord(cloudWasteIn.messageFramework) ? cloudWasteIn.messageFramework : {};
  const cwAudiencesIn = isRecord(cloudWasteIn.audiences) ? cloudWasteIn.audiences : {};
  const cwReportIn = isRecord(cloudWasteIn.report) ? cloudWasteIn.report : {};
  const cwAdsIn = isRecord(cloudWasteIn.ads) ? cloudWasteIn.ads : {};
  const cwWebinarIn = isRecord(cloudWasteIn.webinar) ? cloudWasteIn.webinar : {};
  const cwSpeakerIn = isRecord(cwWebinarIn.speaker) ? cwWebinarIn.speaker : {};
  const cwDashboardIn = isRecord(cloudWasteIn.dashboard) ? cloudWasteIn.dashboard : {};
  const cwOohIn = isRecord(cloudWasteIn.ooh) ? cloudWasteIn.ooh : {};
  const cwMediaIn = isRecord(cloudWasteIn.media) ? cloudWasteIn.media : {};
  const figmaKitIn = isRecord(stored.figmaKit) ? stored.figmaKit : {};
  const figmaBgIn = isRecord(figmaKitIn.backgrounds) ? figmaKitIn.backgrounds : {};

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
    cloudWaste: {
      campaignLine: str(cloudWasteIn.campaignLine, base.cloudWaste.campaignLine),
      insight: str(cloudWasteIn.insight, base.cloudWaste.insight),
      stat: str(cloudWasteIn.stat, base.cloudWaste.stat),
      statSource: str(cloudWasteIn.statSource, base.cloudWaste.statSource),
      hero: {
        eyebrow: str(cwHeroIn.eyebrow, base.cloudWaste.hero.eyebrow),
        primaryCta: {
          label: str(cwHeroPrimaryIn.label, base.cloudWaste.hero.primaryCta.label),
          href: str(cwHeroPrimaryIn.href, base.cloudWaste.hero.primaryCta.href),
        },
        secondaryCta: {
          label: str(cwHeroSecondaryIn.label, base.cloudWaste.hero.secondaryCta.label),
          href: str(cwHeroSecondaryIn.href, base.cloudWaste.hero.secondaryCta.href),
        },
      },
      messageFramework: {
        hook: str(cwFrameworkIn.hook, base.cloudWaste.messageFramework.hook),
        proof: str(cwFrameworkIn.proof, base.cloudWaste.messageFramework.proof),
        ask: str(cwFrameworkIn.ask, base.cloudWaste.messageFramework.ask),
      },
      product: {
        name: str(cwProductIn.name, base.cloudWaste.product.name),
        tagline: str(cwProductIn.tagline, base.cloudWaste.product.tagline),
        support: str(cwProductIn.support, base.cloudWaste.product.support),
      },
      audiences: {
        vp: mergeCloudWasteAudience("vp", cwAudiencesIn, base.cloudWaste),
        finops: mergeCloudWasteAudience("finops", cwAudiencesIn, base.cloudWaste),
        cfo: mergeCloudWasteAudience("cfo", cwAudiencesIn, base.cloudWaste),
      },
      report: {
        title: str(cwReportIn.title, base.cloudWaste.report.title),
        subtitle: str(cwReportIn.subtitle, base.cloudWaste.report.subtitle),
        pages: Array.isArray(cwReportIn.pages)
          ? cwReportIn.pages.map((page, i) => mergeReportPage(page, base.cloudWaste.report.pages[i]))
          : base.cloudWaste.report.pages,
      },
      ads: {
        static: Array.isArray(cwAdsIn.static)
          ? cwAdsIn.static.map((ad, i) => mergeStaticAd(ad, base.cloudWaste.ads.static[i]))
          : base.cloudWaste.ads.static,
        carousel: Array.isArray(cwAdsIn.carousel)
          ? cwAdsIn.carousel.map((slide, i) => mergeCarouselSlide(slide, base.cloudWaste.ads.carousel[i]))
          : base.cloudWaste.ads.carousel,
        display: base.cloudWaste.ads.display,
      },
      emails: Array.isArray(cloudWasteIn.emails)
        ? cloudWasteIn.emails.map((email, i) => mergeEmail(email, base.cloudWaste.emails[i]))
        : base.cloudWaste.emails,
      webinar: {
        title: str(cwWebinarIn.title, base.cloudWaste.webinar.title),
        subtitle: str(cwWebinarIn.subtitle, base.cloudWaste.webinar.subtitle),
        agenda: strList(cwWebinarIn.agenda, base.cloudWaste.webinar.agenda),
        speaker: {
          name: str(cwSpeakerIn.name, base.cloudWaste.webinar.speaker.name),
          role: str(cwSpeakerIn.role, base.cloudWaste.webinar.speaker.role),
        },
      },
      salesDeck: Array.isArray(cloudWasteIn.salesDeck)
        ? cloudWasteIn.salesDeck.map((slide, i) =>
            mergeSalesDeckSlide(slide, base.cloudWaste.salesDeck[i]),
          )
        : base.cloudWaste.salesDeck,
      dashboard: {
        kpis: Array.isArray(cwDashboardIn.kpis)
          ? cwDashboardIn.kpis.map((kpi, i) => mergeKpi(kpi, base.cloudWaste.dashboard.kpis[i]))
          : base.cloudWaste.dashboard.kpis,
        funnel: Array.isArray(cwDashboardIn.funnel)
          ? cwDashboardIn.funnel.map((step, i) =>
              mergeFunnelStep(step, base.cloudWaste.dashboard.funnel[i]),
            )
          : base.cloudWaste.dashboard.funnel,
      },
      ooh: {
        headline: str(cwOohIn.headline, base.cloudWaste.ooh.headline),
        subline: str(cwOohIn.subline, base.cloudWaste.ooh.subline),
        placement: str(cwOohIn.placement, base.cloudWaste.ooh.placement),
        spec: str(cwOohIn.spec, base.cloudWaste.ooh.spec),
        conference: str(cwOohIn.conference, base.cloudWaste.ooh.conference),
      },
      media: {
        hero: cloudWasteMedia(cwMediaIn.hero, base.cloudWaste.media.hero),
        reportCover: cloudWasteMedia(cwMediaIn.reportCover, base.cloudWaste.media.reportCover),
        ads: Array.isArray(cwMediaIn.ads)
          ? cwMediaIn.ads.map((asset, i) => cloudWasteMedia(asset, base.cloudWaste.media.ads[i]))
          : base.cloudWaste.media.ads,
        carousel: Array.isArray(cwMediaIn.carousel)
          ? cwMediaIn.carousel.map((asset, i) =>
              cloudWasteMedia(asset, base.cloudWaste.media.carousel[i]),
            )
          : base.cloudWaste.media.carousel,
        webinar: cloudWasteMedia(cwMediaIn.webinar, base.cloudWaste.media.webinar),
        ooh: cloudWasteMedia(cwMediaIn.ooh, base.cloudWaste.media.ooh),
        dashboard: cloudWasteMedia(cwMediaIn.dashboard, base.cloudWaste.media.dashboard),
      },
    },
    figmaKit: {
      backgrounds: mergeFigmaKitBackgrounds(figmaBgIn, base.figmaKit.backgrounds),
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
  "cw-hero",
  "cw-report-cover",
  "cw-ad-0",
  "cw-ad-1",
  "cw-ad-2",
  "cw-carousel-0",
  "cw-carousel-1",
  "cw-carousel-2",
  "cw-carousel-3",
  "cw-carousel-4",
  "cw-webinar",
  "cw-ooh",
  "cw-dashboard",
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

export function applyMediaUrl(content: SiteContent, kind: MediaKind, url: string, mime?: string): SiteContent {
  const next = structuredClone(content);
  const mediaAsset =
    mime && (kind.startsWith("cw-") || kind === "cw-ooh" || kind === "cw-webinar")
      ? {
          url,
          mime,
          mediaType: mime.startsWith("video/") ? ("video" as const) : ("image" as const),
        }
      : null;
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
  if (kind === "cw-hero" && mediaAsset) next.cloudWaste.media.hero = mediaAsset;
  if (kind === "cw-report-cover" && mediaAsset) next.cloudWaste.media.reportCover = mediaAsset;
  if (kind.startsWith("cw-ad-") && mediaAsset) {
    const i = Number(kind.slice("cw-ad-".length));
    if (next.cloudWaste.media.ads[i] !== undefined) next.cloudWaste.media.ads[i] = mediaAsset;
  }
  if (kind.startsWith("cw-carousel-") && mediaAsset) {
    const i = Number(kind.slice("cw-carousel-".length));
    if (next.cloudWaste.media.carousel[i] !== undefined) {
      next.cloudWaste.media.carousel[i] = mediaAsset;
    }
  }
  if (kind === "cw-webinar" && mediaAsset) next.cloudWaste.media.webinar = mediaAsset;
  if (kind === "cw-ooh" && mediaAsset) next.cloudWaste.media.ooh = mediaAsset;
  if (kind === "cw-dashboard" && mediaAsset) next.cloudWaste.media.dashboard = mediaAsset;
  return next;
}

function mergeCloudWasteAudience(
  id: CwAudienceId,
  audiencesIn: Record<string, unknown>,
  base: CloudWasteContent,
): CloudWasteAudience {
  const raw = isRecord(audiencesIn[id]) ? audiencesIn[id] : {};
  const fallback = base.audiences[id];
  return {
    ...fallback,
    id,
    label: str(raw.label, fallback.label),
    shortLabel: str(raw.shortLabel, fallback.shortLabel),
    pain: str(raw.pain, fallback.pain),
    promise: str(raw.promise, fallback.promise),
    proof: strList(raw.proof, fallback.proof),
    cta: str(raw.cta, fallback.cta),
  };
}

function mergeReportPage(rawPage: unknown, fallback?: CloudWasteReportPage): CloudWasteReportPage {
  const fb = fallback ?? {
    n: 0,
    title: "",
    body: null,
  };
  const raw = isRecord(rawPage) ? rawPage : {};
  return {
    n: num(raw.n, fb.n),
    title: str(raw.title, fb.title),
    body: raw.body === null ? null : str(raw.body, fb.body ?? ""),
    items: Array.isArray(raw.items)
      ? raw.items.map((item, i) => {
          const fallbackItem = fb.items?.[i] ?? fb.items?.[0] ?? { label: "", body: "" };
          const row = isRecord(item) ? item : {};
          return {
            label: str(row.label, fallbackItem.label),
            body: str(row.body, fallbackItem.body),
          };
        })
      : fb.items,
    before:
      isRecord(raw.before) && fb.before
        ? {
            monthly: str(raw.before.monthly, fb.before.monthly),
            waste: str(raw.before.waste, fb.before.waste),
            detected: str(raw.before.detected, fb.before.detected),
          }
        : fb.before,
    after:
      isRecord(raw.after) && fb.after
        ? {
            monthly: str(raw.after.monthly, fb.after.monthly),
            waste: str(raw.after.waste, fb.after.waste),
            recovered: str(raw.after.recovered, fb.after.recovered),
          }
        : fb.after,
    cta: typeof raw.cta === "string" ? raw.cta : fb.cta,
  };
}

function mergeStaticAd(
  value: unknown,
  fallback?: CloudWasteContent["ads"]["static"][number],
) {
  const fb = fallback ?? { headline: "", body: "", cta: "" };
  const raw = isRecord(value) ? value : {};
  return {
    headline: str(raw.headline, fb.headline),
    body: str(raw.body, fb.body),
    cta: str(raw.cta, fb.cta),
  };
}

function mergeCarouselSlide(
  value: unknown,
  fallback?: CloudWasteContent["ads"]["carousel"][number],
) {
  const fb = fallback ?? { slide: 1, title: "", body: "" };
  const raw = isRecord(value) ? value : {};
  return {
    slide: num(raw.slide, fb.slide),
    title: str(raw.title, fb.title),
    body: str(raw.body, fb.body),
  };
}

function mergeEmail(value: unknown, fallback?: CloudWasteEmail): CloudWasteEmail {
  const fb = fallback ?? { n: 1, subject: "", preview: "", body: "", cta: "" };
  const raw = isRecord(value) ? value : {};
  return {
    n: num(raw.n, fb.n),
    subject: str(raw.subject, fb.subject),
    preview: str(raw.preview, fb.preview),
    body: str(raw.body, fb.body),
    cta: str(raw.cta, fb.cta),
  };
}

function mergeSalesDeckSlide(
  value: unknown,
  fallback?: CloudWasteSalesDeckSlide,
): CloudWasteSalesDeckSlide {
  const fb = fallback ?? { n: 1, title: "" };
  const raw = isRecord(value) ? value : {};
  return {
    n: num(raw.n, fb.n),
    title: str(raw.title, fb.title),
    subtitle: typeof raw.subtitle === "string" ? raw.subtitle : fb.subtitle,
    body: typeof raw.body === "string" ? raw.body : fb.body,
  };
}

function mergeKpi(value: unknown, fallback?: CloudWasteKpi): CloudWasteKpi {
  const fb = fallback ?? { label: "", target: 0, unit: "", prefix: "" };
  const raw = isRecord(value) ? value : {};
  return {
    label: str(raw.label, fb.label),
    target: num(raw.target, fb.target),
    unit: str(raw.unit, fb.unit),
    prefix: str(raw.prefix, fb.prefix),
  };
}

function mergeFunnelStep(value: unknown, fallback?: CloudWasteFunnelStep): CloudWasteFunnelStep {
  const fb = fallback ?? { stage: "", value: 0 };
  const raw = isRecord(value) ? value : {};
  return {
    stage: str(raw.stage, fb.stage),
    value: num(raw.value, fb.value),
  };
}
