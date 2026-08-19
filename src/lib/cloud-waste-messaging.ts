export const CW_CAMPAIGN_LINE = "Cloud waste is hiding in plain sight.";

export const CW_INSIGHT =
  "A cloud bill can look normal while hiding significant waste — unused instances, over-provisioned storage, forgotten dev environments, orphaned snapshots.";

export const CW_STAT = "Teams waste 32% of cloud spend without knowing it.";
export const CW_STAT_SOURCE = "Flexera 2025 State of the Cloud";

export const CW_PRODUCT = {
  name: "Noros",
  tagline: "The AI that finds the waste your dashboard hides.",
  support:
    "Noros watches multi-cloud spend continuously and surfaces waste the moment it appears — idle compute, orphaned storage, uncovered reservations — so teams can act before the next bill lands.",
};

export const CW_AUDIENCES = {
  vp: {
    id: "vp" as const,
    label: "VP Engineering",
    shortLabel: "VP Eng",
    pain: "Engineering owns the resources but never sees the bill until finance asks why it jumped.",
    promise: "Get a real-time waste signal tied to the services your team actually runs.",
    proof: [
      "Idle instances flagged by service owner, not a spreadsheet",
      "Dev/staging zombies surfaced before month-end",
      "Rightsizing recs mapped to deployment context",
    ],
    cta: "See waste by team",
  },
  finops: {
    id: "finops" as const,
    label: "FinOps Lead",
    shortLabel: "FinOps",
    pain: "Dashboards show totals, not waste. You rebuild reports every month to find what changed.",
    promise: "Move from detective work to a continuous waste feed with prioritized actions.",
    proof: [
      "Six waste categories scored and ranked automatically",
      "Coverage gaps and orphaned resources in one view",
      "Alert → action without rebuilding the pivot table",
    ],
    cta: "Start the waste audit",
  },
  cfo: {
    id: "cfo" as const,
    label: "CFO",
    shortLabel: "CFO",
    pain: "Cloud is the fastest-growing line item, but no one can explain why variance appeared or where savings live.",
    promise: "See waste as a dollar figure you can defend — not a percentage in a deck you don't trust.",
    proof: [
      "Waste quantified in dollars, not utilization percentages",
      "Savings tied to forecast confidence and budget pacing",
      "Board-ready framing without another export",
    ],
    cta: "Quantify hidden waste",
  },
};

export type CwAudienceId = keyof typeof CW_AUDIENCES;

export const CW_REPORT = {
  title: "The Hidden Cost Report",
  subtitle: "Six sources of cloud waste most teams miss",
  pages: [
    {
      n: 1,
      title: "Cover",
      body: null,
    },
    {
      n: 2,
      title: "The problem — looks normal, hides waste",
      body: "Your cloud bill passed review. Spend is within budget. Dashboards show expected growth. But underneath the totals, waste is compounding — invisible because nothing flags it, unreported because no one asked the right question.",
    },
    {
      n: 3,
      title: "Six sources of hidden waste",
      items: [
        {
          label: "Idle compute",
          body: "Instances running at <5% CPU for weeks — dev boxes left on, batch jobs that finished, canary deploys nobody removed.",
        },
        {
          label: "Orphaned storage",
          body: "EBS volumes, snapshots, and S3 prefixes detached from any running workload. They accumulate silently.",
        },
        {
          label: "Over-provisioned databases",
          body: "RDS and Aurora instances sized for peak that never came. Memory and IOPS billed whether used or not.",
        },
        {
          label: "Zombie dev environments",
          body: "Staging clusters, feature-branch namespaces, and sandbox accounts that outlived their pull request.",
        },
        {
          label: "Unattached network resources",
          body: "Elastic IPs, idle load balancers, and NAT gateways serving no traffic — small per-unit, large in aggregate.",
        },
        {
          label: "Uncovered reservations",
          body: "On-demand pricing for predictable workloads. The savings plan was never bought, or it expired without renewal.",
        },
      ],
    },
    {
      n: 4,
      title: "How Noros detects each",
      body: "Noros connects read-only to AWS, Azure, and GCP. It watches cost and usage data continuously — not once a month — and maps every dollar to a resource, owner, and action.",
    },
    {
      n: 5,
      title: "Case math — before and after",
      before: {
        monthly: "$420,000",
        waste: "$134,400 (32%)",
        detected: "$0 flagged automatically",
      },
      after: {
        monthly: "$420,000",
        waste: "$134,400 identified",
        recovered: "$98,200 / mo recovered in 90 days",
      },
    },
    {
      n: 6,
      title: "Next steps",
      body: "Connect your first account in 5 minutes. Noros surfaces waste within 24 hours. No agents, no write access, no risk.",
      cta: "Start your free waste audit",
    },
  ],
};

export const CW_ADS = {
  static: [
    {
      headline: "Your cloud bill looks fine. It isn't.",
      body: "32% of cloud spend is waste hiding in plain sight. Get the report.",
      cta: "Download the Hidden Cost Report",
    },
    {
      headline: "32% waste. Zero alerts.",
      body: "Dashboards show totals, not waste. Noros shows both.",
      cta: "See what you're missing",
    },
    {
      headline: "The bill passed. The waste didn't.",
      body: "Six sources of cloud waste most teams miss — and how to find them automatically.",
      cta: "Get the report",
    },
  ],
  carousel: [
    { slide: 1, title: "32% of cloud spend is waste.", body: "And most teams don't know it." },
    { slide: 2, title: "Idle compute", body: "Instances running at <5% CPU for weeks." },
    { slide: 3, title: "Orphaned storage", body: "Volumes and snapshots attached to nothing." },
    { slide: 4, title: "Zombie environments", body: "Dev clusters that outlived their PR." },
    { slide: 5, title: "Get the Hidden Cost Report", body: "Six sources. One fix. Free." },
  ],
  display: {
    leaderboard: { w: 728, h: 90 },
    mpu: { w: 300, h: 250 },
    skyscraper: { w: 160, h: 600 },
  },
};

export const CW_EMAILS = [
  {
    n: 1,
    subject: "Your cloud bill is hiding something",
    preview: "32% waste, zero alerts. Here's what to look for.",
    body: "Hi {{first_name}},\n\nMost cloud bills pass review without a flag. Spend is within budget. Growth looks normal.\n\nBut underneath, waste compounds — idle instances, orphaned storage, zombie dev environments. Teams waste 32% of spend without knowing it.\n\nWe wrote a short report on the six sources most teams miss and how to find them automatically.",
    cta: "Read the Hidden Cost Report",
  },
  {
    n: 2,
    subject: "Six places cloud waste hides",
    preview: "Idle compute, orphaned storage, and four more.",
    body: "Hi {{first_name}},\n\nLast week we shared the Hidden Cost Report. Here's a quick summary of what's inside:\n\n1. Idle compute — instances at <5% CPU for weeks\n2. Orphaned storage — EBS and snapshots attached to nothing\n3. Over-provisioned DBs — RDS sized for peak that never came\n4. Zombie dev envs — staging that outlived its PR\n5. Unattached network — idle IPs and NAT gateways\n6. Uncovered reservations — on-demand for predictable workloads\n\nNoros detects all six continuously.",
    cta: "See how Noros finds waste",
  },
  {
    n: 3,
    subject: "Live: Finding the waste your dashboard hides",
    preview: "Join us for a 30-minute walkthrough.",
    body: "Hi {{first_name}},\n\nWe're hosting a live session showing how teams find and recover hidden cloud waste in under 30 minutes.\n\nWhat we'll cover:\n• Why dashboards miss waste\n• The six most common sources\n• A live Noros demo on real data\n• Q&A\n\nSeats are limited.",
    cta: "Register for the webinar",
  },
];

export const CW_WEBINAR = {
  title: "Live: Finding the waste your dashboard hides",
  subtitle: "A 30-minute walkthrough of the six sources most teams miss",
  agenda: [
    "Why dashboards show totals, not waste",
    "The six hidden waste sources (with examples)",
    "Live Noros demo on anonymized cloud data",
    "Before/after: $98K recovered in 90 days",
    "Q&A",
  ],
  speaker: {
    name: "Speaker Name",
    role: "Cloud Economics, Noros",
  },
};

export const CW_SALES_DECK = [
  { n: 1, title: "Cloud Waste Is Hiding in Plain Sight", subtitle: "Sales follow-up" },
  { n: 2, title: "The problem", body: "Cloud bills pass review while waste compounds silently. Teams spend 32% more than they need to." },
  { n: 3, title: "Why now", body: "Cloud is the fastest-growing line item. CFOs want answers. FinOps teams are stretched. Engineering doesn't see the bill." },
  { n: 4, title: "Idle compute & zombie envs", body: "Instances at <5% CPU, dev clusters left running, batch jobs that finished." },
  { n: 5, title: "Storage & network orphans", body: "Detached EBS, forgotten snapshots, unattached IPs — small per-unit, large in aggregate." },
  { n: 6, title: "Uncovered reservations", body: "On-demand pricing for workloads that haven't changed in months." },
  { n: 7, title: "ROI", body: "$134K waste identified → $98K recovered in 90 days. 5-minute setup. Read-only. No risk." },
  { n: 8, title: "Next step", body: "Connect one account today. Noros surfaces waste within 24 hours." },
];

export const CW_DASHBOARD_KPIS = [
  { label: "Report downloads", target: 2500, unit: "", prefix: "" },
  { label: "MQLs generated", target: 400, unit: "", prefix: "" },
  { label: "Webinar registrations", target: 600, unit: "", prefix: "" },
  { label: "SQL rate", target: 18, unit: "%", prefix: "" },
  { label: "Pipeline influenced", target: 1.2, unit: "M", prefix: "$" },
  { label: "CAC payback", target: 4.2, unit: " mo", prefix: "" },
];

export const CW_FUNNEL = [
  { stage: "Impressions", value: 840000 },
  { stage: "Clicks", value: 18400 },
  { stage: "Downloads", value: 2500 },
  { stage: "MQLs", value: 400 },
  { stage: "SQLs", value: 72 },
  { stage: "Opportunities", value: 28 },
];

export const CW_OOH = {
  headline: "Cloud waste is hiding in plain sight.",
  subline: "Scan to see what your dashboard misses.",
  placement: "Bus shelter or pillar wrap, 200m from venue entrance",
  spec: "1080 × 1920 portrait, illuminated backlight",
  conference: "KubeCon / re:Invent / FinOps X",
};
