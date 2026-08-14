export const DISCLAIMER =
  "Independent portfolio work. Not commissioned by or affiliated with North.Cloud or Noros.";

export const CAMPAIGN_LINE = "Ask your cloud what it costs—and why.";

export const PRODUCT = {
  name: "Noros",
  tagline: "The AI for cloud operators.",
  support:
    "Noros analyzes your cloud cost data across cloud providers to answer questions, explain changes, and surface issues, all in plain language.",
};

export type AudienceId = "cfo" | "finops" | "engineer";

export const audiences: Record<
  AudienceId,
  {
    id: AudienceId;
    label: string;
    shortLabel: string;
    headline: string;
    subhead: string;
    emphasis: string;
    proofPoints: string[];
    adHeadline: string;
    adBody: string;
    cta: string;
  }
> = {
  cfo: {
    id: "cfo",
    label: "CFO",
    shortLabel: "CFO",
    headline: "Forecast confidence. Savings you can defend.",
    subhead:
      "See where cloud spend is heading, why variance appeared, and which risks matter to the business—before the board deck.",
    emphasis: "Financial visibility, forecast confidence, savings and business risk.",
    proofPoints: [
      "Budget pacing and threshold drift in plain language",
      "Variance explained by drivers, not dumps",
      "Savings ROI framed for finance and the board",
    ],
    adHeadline: "Know what your cloud will cost—before the board asks.",
    adBody:
      "Noros turns multi-cloud spend into forecast confidence, savings clarity, and risk you can brief in minutes.",
    cta: "See a 5-minute demo",
  },
  finops: {
    id: "finops",
    label: "FinOps leader",
    shortLabel: "FinOps",
    headline: "Allocation, governance, and the optimize loop—without the spreadsheet grind.",
    subhead:
      "Catch anomalies early, close coverage gaps, and move from alert to action with a workflow your team can run.",
    emphasis:
      "Allocation, governance, anomaly detection and optimization workflow.",
    proofPoints: [
      "Anomalies flagged with context on what changed",
      "Commitment coverage and idle waste surfaced continuously",
      "Alert → allocate → optimize without rebuilding reports",
    ],
    adHeadline: "From anomaly to action—before the month closes.",
    adBody:
      "Noros watches spend continuously so FinOps teams can govern allocation, catch drift, and optimize in one loop.",
    cta: "Ask Noros",
  },
  engineer: {
    id: "engineer",
    label: "Engineer",
    shortLabel: "Engineer",
    headline: "Ask like a teammate. Get the resource context—and the next step.",
    subhead:
      "Skip exports and query languages. Get answers grounded in services, regions, and tags—with recommendations you can act on.",
    emphasis: "Fast answers, resource context and actionable recommendations.",
    proofPoints: [
      "Plain-language Q&A on real cloud data",
      "Drivers by service, region, and tag",
      "Rightsizing and waste cues you can ship",
    ],
    adHeadline: "Stop digging. Ask your cloud what changed.",
    adBody:
      "Noros answers spend questions in seconds—with resource context and recommendations engineering can trust.",
    cta: "Ask Noros",
  },
};

export const carouselSlides = [
  {
    title: "Ask your cloud what it costs—and why.",
    body: "Noros is the AI FinOps agent that answers in plain language—across AWS, Azure, and GCP.",
    label: "01 · Launch",
  },
  {
    title: "For CFOs",
    body: "Forecast confidence, savings you can defend, and business risk you can brief without another export.",
    label: "02 · CFO",
  },
  {
    title: "For FinOps",
    body: "Allocation, governance, and anomaly → optimize—continuously, not once a quarter.",
    label: "03 · FinOps",
  },
  {
    title: "For Engineers",
    body: "Fast answers, real resource context, and recommendations you can act on today.",
    label: "04 · Engineer",
  },
  {
    title: "Meet Noros",
    body: "Chat with your cloud. Spot spend alerts. Build dashboards through conversation.",
    label: "05 · Product",
  },
];

export const landingCopy = {
  hero: {
    brand: "Noros",
    headline: "The AI for cloud operators.",
    support:
      "Noros analyzes your cloud cost data across cloud providers to answer questions, explain changes, and surface issues, all in plain language.",
    primaryCta: "Free trial",
    secondaryCta: "Free Demo",
  },
  value: {
    eyebrow: "Faster answers. Sharper decisions.",
    items: [
      {
        title: "Ask anything in plain language",
        body: "Get answers about your cloud spend without learning a new tool, building a query, or pulling an export.",
      },
      {
        title: "Stay ahead of what matters",
        body: "Noros monitors your environment continuously, surfacing anomalies, budget drifts, and savings opportunities the moment they appear.",
      },
      {
        title: "Build your own view as you go",
        body: "Turn any answer into a saved report, chart, or dashboard, so the questions you ask most become the views you always come back to.",
      },
    ],
  },
  features: [
    {
      code: "FT. 01",
      label: "AI Agent",
      kicker: "Get answers grounded in your real cloud data.",
      title: "Chat with your cloud.",
      beats: [
        {
          n: "01",
          title: "Ask like you'd ask a teammate",
          body: "Pose questions in plain language and get answers in seconds, whether you're looking up a number or unpacking a complex spend pattern.",
        },
        {
          n: "02",
          title: "See the reasoning behind every answer",
          body: "Every response is grounded in your real cloud data and traces back to the underlying drivers, so finance and engineering can trust what they see.",
        },
        {
          n: "03",
          title: "Get the chart automatically",
          body: "When a visual helps, Noros generates the right kind of chart for you, whether that's a trend line, a category breakdown, or a flow diagram.",
        },
      ],
    },
    {
      code: "FT. 02",
      label: "AI Agent",
      kicker: "Catch what matters, no asking required.",
      title: "Spot spend alerts.",
      beats: [
        {
          n: "01",
          title: "Spot spend anomalies as they happen",
          body: "Noros watches your environment continuously and flags unusual spending patterns the moment they appear, with context on what changed.",
        },
        {
          n: "02",
          title: "Track budgets without building reports",
          body: "Set yearly, monthly, or custom budgets and let Noros report on pacing, drift, and approaching thresholds automatically.",
        },
        {
          n: "03",
          title: "Surface savings opportunities continuously",
          body: "Get notified about commitment gaps, idle resources, and waste as they emerge.",
        },
      ],
    },
    {
      code: "FT. 03",
      label: "AI Agent",
      kicker: "Turn answers into a workspace that grows with you.",
      title: "Build your own dashboard.",
      beats: [
        {
          n: "01",
          title: "Build dashboards through conversation",
          body: "Ask, save, refine, repeat. Your dashboard takes shape through the questions you ask most, not through configuration menus.",
        },
        {
          n: "02",
          title: "Pin any answer to a dashboard",
          body: "Save the insights you ask for most into sticky dashboards, so recurring questions don't need to be re-asked.",
        },
        {
          n: "03",
          title: "Schedule answers to send themselves",
          body: "Set up daily, weekly, or monthly delivery and Noros will send the answer to your inbox or Slack on cadence.",
        },
      ],
    },
  ],
  testimonials: {
    title: "An AI teammate that pulls its weight.",
    items: [
      {
        quote:
          "North took 5 minutes to setup and showed me we could save 40%. To this day, it's the fastest & clearest demo of ROI I have ever seen in business.",
        name: "Andrew Gostine",
        role: "Co-founder & CEO Artisight",
      },
      {
        quote:
          "North is helping us get the right reservations and savings plans in place as we stabilize our infrastructure. And down the line, we'll look at extending this strategy even further.",
        name: "Primoz Fonda",
        role: "VP of Engineering SumUp",
      },
      {
        quote:
          "The flexibility and ease of integration really stood out. If someone told me from the start it would be this easy to try, use, and save, I wouldn't have believed them. But it is. And the savings are real.",
        name: "Yossi Mastalon",
        role: "Director of Cloud Infrastructure and Security Stayntouch",
      },
    ],
  },
  cta: {
    title: "Cloud with confidence.",
    body: "Put Noros to work on your cloud and see savings in minutes.",
    primary: "Start your Free trial",
    secondary: "Schedule a Free Demo",
  },
  faqs: [
    {
      q: "What is Noros?",
      a: "Noros is North's AI-powered cloud operations assistant. Instead of navigating dashboards or building reports, you ask questions about your cloud costs in plain language and get answers in seconds—grounded in your actual AWS, Azure, and GCP data. Noros analyzes costs, detects anomalies, finds savings opportunities, monitors commitments, generates reports, and forecasts future spend, all through conversation.",
    },
    {
      q: "Why would I use Noros instead of manually analyzing my cloud bill?",
      a: "Noros turns tedious analysis into a conversation. Instead of exporting CSVs, building spreadsheets, and hunting for insights, you ask questions like \"What's my top savings opportunity?\" or \"Are there any cost anomalies?\" and get answers instantly. Noros surfaces patterns and opportunities you'd have to dig for manually, and it scales—as your cloud footprint grows, Noros keeps up without adding to your team's workload.",
    },
    {
      q: "What kinds of questions can I ask Noros?",
      a: "Noros can answer cost breakdowns by service, region, or tag; trend analysis and forecasting; anomaly detection; commitment utilization and coverage; budget status; savings opportunities; sustainability metrics; and advanced data queries. It maintains context across a conversation so follow-ups flow naturally.",
    },
    {
      q: "How quickly can I get started with Noros?",
      a: "Setup takes 5 minutes. Connect your AWS, GCP, or Azure account through guided onboarding (read-only access only). Noros analyzes your data within 24 hours. Explore with a 14-day free trial before committing.",
    },
    {
      q: "Is my cloud data secure with Noros?",
      a: "Yes. Read-only permissions only—never writes to your accounts or accesses sensitive workload data. Data is encrypted in transit and at rest, segregated by customer, and never used to train AI models. SOC 2 Type II certified. Revoke access anytime.",
    },
    {
      q: "Which cloud providers does Noros support?",
      a: "AWS, GCP, and Azure. Connect multiple accounts and switch between them seamlessly—Noros queries the currently selected account.",
    },
    {
      q: "Can I integrate Noros with the tools my team already uses?",
      a: "Yes. Noros connects to Slack so alerts and insights—cost anomalies, budget status, savings opportunities, and scheduled reports—land in your channels. Export data or generate reports for stakeholders anytime.",
    },
  ],
};

export const storyboardFrames = [
  {
    t: "0–5s",
    title: "The question",
    visual: "Dark space field. Cursor types: “Why did AWS spend jump 18%?”",
  },
  {
    t: "5–10s",
    title: "The answer",
    visual: "Noros chat replies with drivers + auto chart. Nebula accent pulse.",
  },
  {
    t: "10–15s",
    title: "The alert",
    visual: "Anomaly card slides in—budget drift, idle resources, coverage gap.",
  },
  {
    t: "15–20s",
    title: "Three seats",
    visual: "Split: CFO forecast · FinOps loop · Engineer next action.",
  },
  {
    t: "20–25s",
    title: "The workspace",
    visual: "Pin answer → dashboard forms through conversation.",
  },
  {
    t: "25–30s",
    title: "The ask",
    visual: "Campaign line + CTA: Ask your cloud what it costs—and why.",
  },
];
