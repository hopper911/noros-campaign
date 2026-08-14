import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/figma-kit");
mkdirSync(outDir, { recursive: true });

const BLACK = "#121314";
const MINT = "#a2f2e3";
const NEUE = "#afb8c2";
const WHITE = "#f8fcfd";

const audiences = {
  cfo: {
    short: "CFO",
    headline: "Forecast confidence. Savings you can defend.",
    subhead:
      "See where cloud spend is heading, why variance appeared, and which risks matter to the business—before the board deck.",
    ad: "Know what your cloud will cost—before the board asks.",
    body: "Noros turns multi-cloud spend into forecast confidence, savings clarity, and risk you can brief in minutes.",
    cta: "See a 5-minute demo",
    proofs: [
      "Budget pacing and threshold drift in plain language",
      "Variance explained by drivers, not dumps",
      "Savings ROI framed for finance and the board",
    ],
  },
  finops: {
    short: "FinOps",
    headline: "Allocation, governance, and the optimize loop.",
    subhead:
      "Catch anomalies early, close coverage gaps, and move from alert to action with a workflow your team can run.",
    ad: "From anomaly to action—before the month closes.",
    body: "Noros watches spend continuously so FinOps teams can govern allocation, catch drift, and optimize in one loop.",
    cta: "Ask Noros",
    proofs: [
      "Anomalies flagged with context on what changed",
      "Commitment coverage and idle waste surfaced continuously",
      "Alert → allocate → optimize without rebuilding reports",
    ],
  },
  engineer: {
    short: "Engineer",
    headline: "Ask like a teammate. Get the resource context.",
    subhead:
      "Skip exports and query languages. Get answers grounded in services, regions, and tags.",
    ad: "Stop digging. Ask your cloud what changed.",
    body: "Noros answers spend questions in seconds—with resource context and recommendations engineering can trust.",
    cta: "Ask Noros",
    proofs: [
      "Plain-language Q&A on real cloud data",
      "Drivers by service, region, and tag",
      "Rightsizing and waste cues you can ship",
    ],
  },
};

const carousel = [
  ["01 · Launch", "Ask your cloud what it costs—and why.", "Noros is the AI FinOps agent that answers in plain language—across AWS, Azure, and GCP."],
  ["02 · CFO", "For CFOs", "Forecast confidence, savings you can defend, and business risk you can brief without another export."],
  ["03 · FinOps", "For FinOps", "Allocation, governance, and anomaly → optimize—continuously, not once a quarter."],
  ["04 · Engineer", "For Engineers", "Fast answers, real resource context, and recommendations you can act on today."],
  ["05 · Product", "Meet Noros", "Chat with your cloud. Spot spend alerts. Build dashboards through conversation."],
];

const storyboard = [
  ["0–5s", "The question", "Dark space field. Cursor types: “Why did AWS spend jump 18%?”"],
  ["5–10s", "The answer", "Noros chat replies with drivers + auto chart. Nebula accent pulse."],
  ["10–15s", "The alert", "Anomaly card slides in—budget drift, idle resources, coverage gap."],
  ["15–20s", "Three seats", "Split: CFO forecast · FinOps loop · Engineer next action."],
  ["20–25s", "The workspace", "Pin answer → dashboard forms through conversation."],
  ["25–30s", "The ask", "Campaign line + CTA: Ask your cloud what it costs—and why."],
];

function mime(name) {
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

function dataUri(rel) {
  const buf = readFileSync(join(root, "public", rel));
  return `data:${mime(rel)};base64,${buf.toString("base64")}`;
}

const img = {
  hero: dataUri("north/hero.jpg"),
  chat: dataUri("north/feature-chat.jpg"),
  start: dataUri("north/get-started.jpg"),
  quotes: dataUri("north/quotes.png"),
  shard: dataUri("north/shard.png"),
  mux1: dataUri("north/mux-1.webp"),
  mux2: dataUri("north/mux-2.webp"),
  mux3: dataUri("north/mux-3.webp"),
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max) {
      if (cur) lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}

function tspan(lines, x, y, dy, fill, size, weight = 500, family = "Untitled Sans, Helvetica, Arial, sans-serif") {
  return lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * dy}" fill="${fill}" font-size="${size}" font-weight="${weight}" font-family="${family}">${esc(line)}</text>`,
    )
    .join("\n");
}

function photo(href, w, h, opacity = 1) {
  const op = opacity < 1 ? ` opacity="${opacity}"` : "";
  return `<image href="${href}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"${op}/>`;
}

function svg(w, h, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" fill="${BLACK}"/>
${body}
</svg>
`;
}

function write(name, contents) {
  writeFileSync(join(outDir, name), contents);
  console.log(name);
}

write(
  "00-cover.svg",
  svg(
    1440,
    900,
    `${photo(img.hero, 1440, 900, 0.55)}
<rect width="1440" height="900" fill="url(#g)"/>
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${BLACK}" stop-opacity="0.2"/><stop offset="1" stop-color="${BLACK}" stop-opacity="0.85"/></linearGradient></defs>
<text x="80" y="120" fill="${MINT}" font-size="14" letter-spacing="4" font-family="Cygnito Mono, ui-monospace, monospace">NOROS CAMPAIGN KIT</text>
${tspan(["Ask your cloud", "what it costs—and why."], 80, 280, 72, WHITE, 64)}
<text x="80" y="480" fill="${NEUE}" font-size="22" font-family="Untitled Sans, Helvetica, Arial, sans-serif">Independent portfolio work. Three seats. One line.</text>
<text x="80" y="820" fill="${NEUE}" font-size="13" letter-spacing="2" font-family="Cygnito Mono, ui-monospace, monospace">CFO  ·  FINOPS  ·  ENGINEER</text>`,
  ),
);

write(
  "01-messaging.svg",
  svg(
    1440,
    900,
    `<text x="80" y="90" fill="${MINT}" font-size="13" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">01  MESSAGING FRAMEWORK</text>
${tspan(["Ask your cloud what it costs—and why."], 80, 160, 40, WHITE, 36)}
${Object.entries(audiences)
  .map(([id, a], i) => {
    const x = 80 + i * 440;
    return `<rect x="${x}" y="240" width="400" height="560" fill="none" stroke="rgba(162,242,227,0.25)"/>
<text x="${x + 24}" y="280" fill="${MINT}" font-size="13" letter-spacing="2" font-family="Cygnito Mono, ui-monospace, monospace">${esc(a.short)}</text>
${tspan(wrap(a.headline, 28), x + 24, 330, 28, WHITE, 22)}
${tspan(wrap(a.subhead, 36), x + 24, 430, 22, NEUE, 15, 400)}
${a.proofs.map((p, pi) => `<text x="${x + 24}" y="${560 + pi * 28}" fill="${NEUE}" font-size="12" font-family="Cygnito Mono, ui-monospace, monospace">— ${esc(p)}</text>`).join("")}`;
  })
  .join("\n")}`,
  ),
);

for (const [id, a] of Object.entries(audiences)) {
  write(
    `ad-${id}.svg`,
    svg(
      1200,
      628,
      `${photo(img.hero, 1200, 628)}
<rect width="1200" height="628" fill="url(#ag)"/>
<defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0.35" stop-color="${BLACK}" stop-opacity="0"/><stop offset="1" stop-color="${BLACK}" stop-opacity="0.92"/></linearGradient></defs>
<text x="48" y="430" fill="${MINT}" font-size="13" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">NOROS  ·  ${esc(a.short)}</text>
${tspan(wrap(a.ad, 36), 48, 480, 36, WHITE, 32)}
<text x="48" y="590" fill="${MINT}" font-size="14" font-family="Untitled Sans, Helvetica, Arial, sans-serif">${esc(a.cta)}</text>`,
    ),
  );
}

carousel.forEach(([label, title, body], i) => {
  write(
    `carousel-0${i + 1}.svg`,
    svg(
      1080,
      1080,
      `${photo(img.hero, 1080, 1080, 0.4)}
<rect width="1080" height="1080" fill="${BLACK}" opacity="0.45"/>
<text x="64" y="80" fill="${NEUE}" font-size="16" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">${esc(label)}</text>
<text x="980" y="80" fill="${NEUE}" font-size="16" font-family="Cygnito Mono, ui-monospace, monospace">${i + 1}/5</text>
<text x="64" y="720" fill="${MINT}" font-size="22" font-family="Untitled Sans, Helvetica, Arial, sans-serif">Noros</text>
${tspan(wrap(title, 22), 64, 780, 48, WHITE, 40)}
${tspan(wrap(body, 42), 64, 900, 26, NEUE, 18, 400)}
<text x="64" y="1020" fill="${NEUE}" font-size="13" letter-spacing="1" font-family="Cygnito Mono, ui-monospace, monospace">Ask your cloud what it costs—and why.</text>`,
    ),
  );
});

write(
  "meet-noros.svg",
  svg(
    1440,
    900,
    `${photo(img.hero, 1440, 900, 0.5)}
<rect width="1440" height="900" fill="${BLACK}" opacity="0.55"/>
<text x="72" y="120" fill="${MINT}" font-size="13" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">MEET NOROS</text>
${tspan(["The AI for", "cloud operators."], 72, 280, 64, WHITE, 56)}
<text x="72" y="460" fill="${WHITE}" font-size="24" font-family="Untitled Sans, Helvetica, Arial, sans-serif">Ask your cloud what it costs—and why.</text>
${tspan(wrap("Answers, anomalies, and dashboards—through conversation, grounded in your real multi-cloud spend.", 42), 72, 520, 26, NEUE, 16, 400)}
<rect x="72" y="640" width="220" height="52" rx="26" fill="${MINT}"/>
<text x="118" y="672" fill="${BLACK}" font-size="16" font-weight="500">Ask Noros</text>
<image href="${img.chat}" x="780" y="180" width="580" height="400" preserveAspectRatio="xMidYMid slice"/>`,
  ),
);

write(
  "ui-hero.svg",
  svg(
    1440,
    900,
    `${photo(img.hero, 1440, 900, 0.35)}
<rect width="1440" height="900" fill="${BLACK}" opacity="0.6"/>
<text x="72" y="100" fill="${MINT}" font-size="13" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">NOROS  ·  LIVE CONSOLE</text>
${tspan(["Chat with", "your cloud."], 72, 180, 56, WHITE, 48)}
<image href="${img.chat}" x="72" y="340" width="1296" height="500" preserveAspectRatio="xMidYMid slice"/>`,
  ),
);

function briefPage(page, extra) {
  return svg(
    816,
    1056,
    `<text x="56" y="70" fill="${MINT}" font-size="12" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">SOLUTION BRIEF  ·  AI FINOPS AGENT</text>
<text x="56" y="110" fill="${WHITE}" font-size="28" font-weight="500">Noros</text>
${extra}
<text x="56" y="1010" fill="${NEUE}" font-size="11" font-family="Cygnito Mono, ui-monospace, monospace">Page ${page} of 2  ·  Independent portfolio work</text>`,
  );
}

write(
  "brief-p1.svg",
  briefPage(
    1,
    `${photo(img.hero, 704, 280, 0.9).replace("<image", '<image x="56" y="140"')}
${tspan(["Ask your cloud", "what it costs—and why."], 56, 480, 40, WHITE, 34)}
${tspan(wrap("Noros is an AI-powered cloud operations assistant. Finance, FinOps, and engineering ask questions in plain language and get answers grounded in AWS, Azure, and GCP cost data.", 58), 56, 590, 24, NEUE, 16, 400)}
<text x="56" y="720" fill="${MINT}" font-size="12" letter-spacing="2" font-family="Cygnito Mono, ui-monospace, monospace">THE PROBLEM</text>
${tspan(wrap("Cloud bills still arrive as exports, dashboards, and tribal knowledge. CFOs lack forecast confidence. FinOps rebuilds reports. Engineers dig for drivers instead of shipping fixes.", 58), 56, 760, 24, WHITE, 16, 400)}
<text x="56" y="880" fill="${MINT}" font-size="12" letter-spacing="2" font-family="Cygnito Mono, ui-monospace, monospace">THE ANSWER</text>
<text x="56" y="916" fill="${NEUE}" font-size="13" font-family="Cygnito Mono, ui-monospace, monospace">— Chat with your cloud</text>
<text x="56" y="940" fill="${NEUE}" font-size="13" font-family="Cygnito Mono, ui-monospace, monospace">— Spot spend alerts continuously</text>
<text x="56" y="964" fill="${NEUE}" font-size="13" font-family="Cygnito Mono, ui-monospace, monospace">— Build dashboards through conversation</text>`,
  ),
);

write(
  "brief-p2.svg",
  briefPage(
    2,
    `<text x="56" y="180" fill="${MINT}" font-size="12" letter-spacing="2" font-family="Cygnito Mono, ui-monospace, monospace">BUILT FOR THREE SEATS</text>
${Object.values(audiences)
  .map((a, i) => {
    const y = 230 + i * 180;
    return `<text x="56" y="${y}" fill="${WHITE}" font-size="20">${esc(a.short)}</text>
${tspan(wrap(a.headline, 48), 56, y + 32, 22, NEUE, 15, 400)}
${a.proofs.map((p, pi) => `<text x="56" y="${y + 90 + pi * 20}" fill="${NEUE}" font-size="12" font-family="Cygnito Mono, ui-monospace, monospace">— ${esc(p)}</text>`).join("")}`;
  })
  .join("\n")}`,
  ),
);

write(
  "email.svg",
  svg(
    600,
    860,
    `${photo(img.hero, 600, 220, 0.45)}
<text x="36" y="60" fill="${MINT}" font-size="12" letter-spacing="2" font-family="Cygnito Mono, ui-monospace, monospace">LAUNCH ANNOUNCEMENT</text>
<text x="36" y="100" fill="${WHITE}" font-size="28">Noros</text>
<text x="36" y="270" fill="${NEUE}" font-size="12" font-family="Cygnito Mono, ui-monospace, monospace">Subject: Ask your cloud what it costs—and why.</text>
${tspan(["Hi {{first_name}},", "", "Today we’re introducing Noros—the AI for cloud operators. Ask questions about AWS, Azure, and GCP spend in plain language."], 36, 330, 28, NEUE, 16, 400)}
${tspan(["Ask your cloud what it costs—and why."], 36, 500, 28, WHITE, 22)}
<rect x="36" y="620" width="180" height="44" rx="22" fill="${MINT}"/>
<text x="78" y="648" fill="${BLACK}" font-size="15">Free Demo</text>
<text x="36" y="820" fill="${NEUE}" font-size="10" font-family="Cygnito Mono, ui-monospace, monospace">Independent portfolio work. Not affiliated with North.Cloud.</text>`,
  ),
);

write(
  "event.svg",
  svg(
    1920,
    1080,
    `${photo(img.hero, 1920, 1080)}
<rect width="1920" height="1080" fill="${BLACK}" opacity="0.5"/>
<text x="960" y="280" text-anchor="middle" fill="${MINT}" font-size="18" letter-spacing="8" font-family="Cygnito Mono, ui-monospace, monospace">NOROS</text>
${tspan(["Ask your cloud", "what it costs—and why."], 960, 420, 80, WHITE, 68).replace(/x="960"/g, 'x="960" text-anchor="middle"')}
<text x="960" y="640" text-anchor="middle" fill="${WHITE}" font-size="24">The AI for cloud operators—answers, alerts, and dashboards through conversation.</text>
<rect x="760" y="720" width="180" height="52" rx="26" fill="${MINT}"/>
<text x="800" y="753" fill="${BLACK}" font-size="16">Ask Noros</text>
<rect x="960" y="720" width="180" height="52" rx="26" fill="none" stroke="${MINT}"/>
<text x="1008" y="753" fill="${WHITE}" font-size="16">Booth 14</text>`,
  ),
);

storyboard.forEach(([t, title, visual], i) => {
  write(
    `storyboard-0${i + 1}.svg`,
    svg(
      1920,
      1080,
      `${photo(img.hero, 1920, 1080, 0.35)}
<rect width="1920" height="1080" fill="${BLACK}" opacity="0.45"/>
<text x="960" y="480" text-anchor="middle" fill="${WHITE}" opacity="0.25" font-size="180" font-weight="500">${String(i + 1).padStart(2, "0")}</text>
<text x="80" y="860" fill="${MINT}" font-size="18" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">${esc(t)}</text>
<text x="80" y="930" fill="${WHITE}" font-size="48">${esc(title)}</text>
<text x="80" y="990" fill="${NEUE}" font-size="22">${esc(visual)}</text>`,
    ),
  );
});

write(
  "launch.svg",
  svg(
    1200,
    600,
    `${photo(img.hero, 1200, 600)}
<rect width="1200" height="600" fill="url(#lg)"/>
<defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0.2" stop-color="${BLACK}" stop-opacity="0"/><stop offset="1" stop-color="${BLACK}" stop-opacity="0.9"/></linearGradient></defs>
<text x="48" y="480" fill="${MINT}" font-size="22">Noros</text>
<text x="48" y="540" fill="${WHITE}" font-size="32">Ask your cloud what it costs—and why.</text>`,
  ),
);

write(
  "announce-primary.svg",
  svg(
    1080,
    1080,
    `${photo(img.hero, 1080, 1080)}
<rect width="1080" height="1080" fill="${BLACK}" opacity="0.45"/>
<text x="64" y="80" fill="${MINT}" font-size="14" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">INTERNAL  ·  LEADERSHIP</text>
<text x="64" y="720" fill="${MINT}" font-size="22">Noros is live</text>
${tspan(["Ask your cloud", "what it costs—and why."], 64, 790, 48, WHITE, 40)}
<text x="64" y="1020" fill="${NEUE}" font-size="12" font-family="Cygnito Mono, ui-monospace, monospace">Independent portfolio work. Not affiliated with North.Cloud.</text>`,
  ),
);

write(
  "announce-secondary.svg",
  svg(
    1440,
    900,
    `${photo(img.start, 1440, 900)}
<rect width="1440" height="900" fill="${BLACK}" opacity="0.5"/>
<text x="80" y="360" fill="${MINT}" font-size="14" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">ANNOUNCEMENT</text>
<text x="80" y="460" fill="${WHITE}" font-size="56">Introducing Noros</text>
<text x="80" y="540" fill="${WHITE}" font-size="24">The AI for cloud operators. Ask your cloud what it costs—and why.</text>`,
  ),
);

for (const [id, a] of Object.entries(audiences)) {
  write(
    `role-${id}.svg`,
    svg(
      1440,
      900,
      `${photo(img.hero, 1440, 900, 0.5)}
<rect width="1440" height="900" fill="${BLACK}" opacity="0.6"/>
<text x="72" y="100" fill="${MINT}" font-size="13" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">NOROS FOR ${esc(a.short.toUpperCase())}</text>
${tspan(wrap(a.headline, 28), 72, 200, 52, WHITE, 42)}
${tspan(wrap(a.subhead, 48), 72, 360, 26, WHITE, 18, 400)}
${a.proofs.map((p, pi) => `<text x="72" y="${480 + pi * 28}" fill="${NEUE}" font-size="14" font-family="Cygnito Mono, ui-monospace, monospace">— ${esc(p)}</text>`).join("")}
<rect x="72" y="620" width="220" height="48" rx="24" fill="${MINT}"/>
<text x="118" y="650" fill="${BLACK}" font-size="16">${esc(a.cta)}</text>`,
    ),
  );
}

write(
  "landing-hero.svg",
  svg(
    1440,
    900,
    `${photo(img.hero, 1440, 900)}
<rect width="1440" height="900" fill="${BLACK}" opacity="0.35"/>
<text x="720" y="220" text-anchor="middle" fill="${MINT}" font-size="14" letter-spacing="6" font-family="Cygnito Mono, ui-monospace, monospace">NOROS</text>
${tspan(["The AI for", "cloud operators."], 720, 320, 64, WHITE, 56).replace(/x="720"/g, 'x="720" text-anchor="middle"')}
<text x="720" y="500" text-anchor="middle" fill="${NEUE}" font-size="16">Noros analyzes your cloud cost data across cloud providers.</text>
<image href="${img.chat}" x="220" y="560" width="1000" height="300" preserveAspectRatio="xMidYMid slice"/>`,
  ),
);

write(
  "landing-value.svg",
  svg(
    1440,
    800,
    `<rect width="1440" height="800" fill="${MINT}"/>
<image href="${img.shard}" x="1000" y="80" width="360" height="360" preserveAspectRatio="xMidYMid meet"/>
${tspan(["Faster answers.", "Sharper decisions."], 72, 140, 56, BLACK, 48)}
<text x="72" y="300" fill="${BLACK}" font-size="18" opacity="0.7">Ask anything about your cloud spend in plain language.</text>
${[
  ["Ask anything in plain language", "Get answers about your cloud spend without learning a new tool."],
  ["Stay ahead of what matters", "Noros monitors continuously, surfacing anomalies and savings."],
  ["Build your own view as you go", "Turn any answer into a saved report, chart, or dashboard."],
]
  .map(
    ([t, b], i) =>
      `<text x="${72 + i * 440}" y="480" fill="${BLACK}" font-size="22">${esc(t)}</text>
<text x="${72 + i * 440}" y="520" fill="${BLACK}" font-size="15" opacity="0.65">${esc(b)}</text>`,
  )
  .join("\n")}`,
  ),
);

[
  ["landing-ft01.svg", img.mux1, "FT. 01", "Chat with your cloud."],
  ["landing-ft02.svg", img.mux2, "FT. 02", "Spot spend alerts."],
  ["landing-ft03.svg", img.mux3, "FT. 03", "Build your own dashboard."],
].forEach(([name, src, code, title]) => {
  write(
    name,
    svg(
      1440,
      720,
      `<text x="72" y="80" fill="${MINT}" font-size="14" font-family="Cygnito Mono, ui-monospace, monospace">${code}</text>
<text x="72" y="140" fill="${WHITE}" font-size="40">${esc(title)}</text>
<image href="${src}" x="72" y="200" width="1296" height="460" preserveAspectRatio="xMidYMid slice"/>`,
    ),
  );
});

write(
  "landing-quotes.svg",
  svg(
    1440,
    720,
    `${tspan(["An AI teammate", "that pulls its weight."], 72, 90, 48, WHITE, 40)}
<image href="${img.quotes}" x="72" y="220" width="1296" height="420" preserveAspectRatio="xMidYMid slice"/>`,
  ),
);

write(
  "landing-cta.svg",
  svg(
    1440,
    800,
    `${photo(img.start, 1440, 800)}
<rect width="1440" height="800" fill="${BLACK}" opacity="0.4"/>
<text x="72" y="180" fill="${WHITE}" font-size="56">Cloud with confidence.</text>
<text x="72" y="620" fill="${WHITE}" font-size="22">Put Noros to work on your cloud and see savings in minutes.</text>
<rect x="72" y="680" width="240" height="52" rx="26" fill="${MINT}"/>
<text x="108" y="713" fill="${BLACK}" font-size="16">Start your Free trial</text>`,
  ),
);

write(
  "landing-nav.svg",
  svg(
    1440,
    80,
    `<text x="48" y="50" fill="${WHITE}" font-size="18" font-weight="500">Noros</text>
<text x="520" y="50" fill="${NEUE}" font-size="13" letter-spacing="1" font-family="Cygnito Mono, ui-monospace, monospace">Features   Integrations   Pricing</text>
<rect x="1180" y="22" width="100" height="36" rx="18" fill="none" stroke="${MINT}"/>
<text x="1204" y="45" fill="${WHITE}" font-size="12">Sign in</text>
<rect x="1292" y="22" width="100" height="36" rx="18" fill="${MINT}"/>
<text x="1310" y="45" fill="${BLACK}" font-size="12">Free trial</text>`,
  ),
);

write(
  "landing-integrations.svg",
  svg(
    1440,
    720,
    `<text x="72" y="80" fill="${MINT}" font-size="13" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">INTEGRATIONS</text>
<text x="72" y="140" fill="${WHITE}" font-size="40">AWS, GCP, and Azure.</text>
<text x="72" y="190" fill="${NEUE}" font-size="16">One conversation layer on multi-cloud spend. Switch accounts without switching tools.</text>
${[
  ["AWS", "Connect accounts in minutes. Read-only access to cost and usage data."],
  ["GCP", "Query spend across projects and billing accounts in the same conversation."],
  ["Azure", "Subscriptions and resource groups, explained in plain language."],
]
  .map(
    ([n, b], i) =>
      `<rect x="${72 + i * 440}" y="280" width="400" height="280" fill="none" stroke="rgba(162,242,227,0.25)"/>
<text x="${96 + i * 440}" y="340" fill="${WHITE}" font-size="24">${esc(n)}</text>
${tspan(wrap(b, 32), 96 + i * 440, 390, 24, NEUE, 15, 400)}`,
  )
  .join("\n")}`,
  ),
);

write(
  "landing-pricing.svg",
  svg(
    1440,
    720,
    `<text x="72" y="80" fill="${MINT}" font-size="13" letter-spacing="3" font-family="Cygnito Mono, ui-monospace, monospace">PRICING</text>
<text x="72" y="140" fill="${WHITE}" font-size="40">Start in five minutes.</text>
<text x="72" y="190" fill="${NEUE}" font-size="16">Portfolio demo—no live checkout. Every plan opens the Noros console.</text>
${[
  ["14-day trial", "Free", "Read-only connect. Answers within hours—not another quarter of exports.", "Start trial"],
  ["Team", "Talk to us", "FinOps, finance, and engineering in one workspace. Slack delivery included.", "Free Demo"],
  ["Enterprise", "Custom", "SSO, dedicated support, and multi-account governance at scale.", "Meet Noros"],
]
  .map(
    ([n, p, b, c], i) =>
      `<rect x="${72 + i * 440}" y="250" width="400" height="380" fill="none" stroke="rgba(162,242,227,0.25)"/>
<text x="${96 + i * 440}" y="300" fill="${MINT}" font-size="12" letter-spacing="2" font-family="Cygnito Mono, ui-monospace, monospace">${esc(n)}</text>
<text x="${96 + i * 440}" y="350" fill="${WHITE}" font-size="28">${esc(p)}</text>
${tspan(wrap(b, 30), 96 + i * 440, 400, 22, NEUE, 14, 400)}
<rect x="${96 + i * 440}" y="540" width="160" height="40" rx="20" fill="${MINT}"/>
<text x="${118 + i * 440}" y="566" fill="${BLACK}" font-size="13">${esc(c)}</text>`,
  )
  .join("\n")}`,
  ),
);

const faqs = [
  ["What is Noros?", "Noros is North's AI-powered cloud operations assistant. Ask about AWS, Azure, and GCP spend in plain language."],
  ["Why not analyze the bill manually?", "Noros turns tedious analysis into a conversation—answers in seconds instead of another export."],
  ["How quickly can I get started?", "Setup takes 5 minutes. Read-only connect. 14-day trial."],
  ["Which clouds?", "AWS, GCP, and Azure. Switch accounts in one conversation."],
];

write(
  "landing-faq.svg",
  svg(
    1440,
    900,
    `<text x="72" y="80" fill="${WHITE}" font-size="40">FAQs</text>
<text x="72" y="130" fill="${NEUE}" font-size="16">Find answers to commonly asked questions about Noros.</text>
${faqs
  .map(([q, a], i) => {
    const y = 190 + i * 160;
    return `<line x1="72" y1="${y}" x2="1368" y2="${y}" stroke="rgba(255,255,255,0.12)"/>
<text x="72" y="${y + 40}" fill="${WHITE}" font-size="18">${esc(q)}</text>
${tspan(wrap(a, 88), 72, y + 78, 22, NEUE, 15, 400)}`;
  })
  .join("\n")}`,
  ),
);

write(
  "landing-footer.svg",
  svg(
    1440,
    560,
    `<text x="72" y="80" fill="${WHITE}" font-size="14">Contact</text>
<text x="72" y="110" fill="${MINT}" font-size="14">hello@north.cloud</text>
<text x="400" y="80" fill="${WHITE}" font-size="18">Noros</text>
<text x="400" y="120" fill="${NEUE}" font-size="14">55 Washington Street</text>
<text x="400" y="142" fill="${NEUE}" font-size="14">Suite 902 · Brooklyn, NY 11201</text>
<text x="800" y="80" fill="${WHITE}" font-size="14">Features</text>
<text x="800" y="120" fill="${NEUE}" font-size="13">AI Agent · Coststreams · Analyze</text>
<text x="800" y="144" fill="${NEUE}" font-size="13">Anomalies · Coverage · Rightsize</text>
<text x="1100" y="80" fill="${WHITE}" font-size="14">Integrations</text>
<text x="1100" y="120" fill="${NEUE}" font-size="13">AWS · GCP · Azure</text>
<text x="72" y="500" fill="${NEUE}" font-size="11">© 2026 North Cloud Holdings Inc. — Recreated for portfolio purposes only.</text>
<text x="72" y="528" fill="${NEUE}" font-size="11">Independent portfolio work. Not affiliated with North.Cloud or Noros.</text>`,
  ),
);

const manifest = [
  ["00-cover.svg", "Cover", "1440×900"],
  ["01-messaging.svg", "Messaging framework", "1440×900"],
  ["ad-cfo.svg", "Ad · CFO", "1200×628"],
  ["ad-finops.svg", "Ad · FinOps", "1200×628"],
  ["ad-engineer.svg", "Ad · Engineer", "1200×628"],
  ["carousel-01.svg", "Carousel 01", "1080×1080"],
  ["carousel-02.svg", "Carousel 02", "1080×1080"],
  ["carousel-03.svg", "Carousel 03", "1080×1080"],
  ["carousel-04.svg", "Carousel 04", "1080×1080"],
  ["carousel-05.svg", "Carousel 05", "1080×1080"],
  ["meet-noros.svg", "Meet Noros", "1440×900"],
  ["ui-hero.svg", "UI hero", "1440×900"],
  ["brief-p1.svg", "Brief p.1", "816×1056"],
  ["brief-p2.svg", "Brief p.2", "816×1056"],
  ["email.svg", "Launch email", "600×860"],
  ["event.svg", "Event screen", "1920×1080"],
  ["storyboard-01.svg", "Storyboard 01", "1920×1080"],
  ["storyboard-02.svg", "Storyboard 02", "1920×1080"],
  ["storyboard-03.svg", "Storyboard 03", "1920×1080"],
  ["storyboard-04.svg", "Storyboard 04", "1920×1080"],
  ["storyboard-05.svg", "Storyboard 05", "1920×1080"],
  ["storyboard-06.svg", "Storyboard 06", "1920×1080"],
  ["launch.svg", "Launch gallery", "1200×600"],
  ["announce-primary.svg", "Announce primary", "1080×1080"],
  ["announce-secondary.svg", "Announce secondary", "1440×900"],
  ["role-cfo.svg", "Role · CFO", "1440×900"],
  ["role-finops.svg", "Role · FinOps", "1440×900"],
  ["role-engineer.svg", "Role · Engineer", "1440×900"],
  ["landing-hero.svg", "Landing hero", "1440×900"],
  ["landing-value.svg", "Landing value", "1440×800"],
  ["landing-ft01.svg", "Landing FT.01", "1440×720"],
  ["landing-ft02.svg", "Landing FT.02", "1440×720"],
  ["landing-ft03.svg", "Landing FT.03", "1440×720"],
  ["landing-quotes.svg", "Landing quotes", "1440×720"],
  ["landing-cta.svg", "Landing CTA", "1440×800"],
  ["landing-nav.svg", "Landing nav", "1440×80"],
  ["landing-integrations.svg", "Landing integrations", "1440×720"],
  ["landing-pricing.svg", "Landing pricing", "1440×720"],
  ["landing-faq.svg", "Landing FAQ", "1440×900"],
  ["landing-footer.svg", "Landing footer", "1440×560"],
];

writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`wrote ${manifest.length} frames`);
