const PAGE_FOR = {
  "00-cover.svg": "Cover",
  "01-messaging.svg": "Messaging",
  "ad-cfo.svg": "Ads",
  "ad-finops.svg": "Ads",
  "ad-engineer.svg": "Ads",
  "carousel-01.svg": "Carousel",
  "carousel-02.svg": "Carousel",
  "carousel-03.svg": "Carousel",
  "carousel-04.svg": "Carousel",
  "carousel-05.svg": "Carousel",
  "meet-noros.svg": "Meet Noros",
  "ui-hero.svg": "UI hero",
  "brief-p1.svg": "Brief",
  "brief-p2.svg": "Brief",
  "email.svg": "Email",
  "event.svg": "Event",
  "storyboard-01.svg": "Storyboard",
  "storyboard-02.svg": "Storyboard",
  "storyboard-03.svg": "Storyboard",
  "storyboard-04.svg": "Storyboard",
  "storyboard-05.svg": "Storyboard",
  "storyboard-06.svg": "Storyboard",
  "launch.svg": "Launch",
  "announce-primary.svg": "Announce",
  "announce-secondary.svg": "Announce",
  "role-cfo.svg": "Role heroes",
  "role-finops.svg": "Role heroes",
  "role-engineer.svg": "Role heroes",
  "landing-nav.svg": "Landing",
  "landing-hero.svg": "Landing",
  "landing-value.svg": "Landing",
  "landing-ft01.svg": "Landing",
  "landing-ft02.svg": "Landing",
  "landing-ft03.svg": "Landing",
  "landing-quotes.svg": "Landing",
  "landing-integrations.svg": "Landing",
  "landing-pricing.svg": "Landing",
  "landing-cta.svg": "Landing",
  "landing-faq.svg": "Landing",
  "landing-footer.svg": "Landing",
};

figma.showUI(__html__, { width: 320, height: 220 });

figma.ui.onmessage = async (msg) => {
  if (msg.type !== "import") return;
  try {
    const origin = msg.origin || "http://localhost:3000";
    const res = await fetch(`${origin}/figma-kit/manifest.json`);
    if (!res.ok) throw new Error(`Could not load manifest from ${origin} (${res.status})`);
    const manifest = await res.json();
    const pages = new Map();
    const xByPage = new Map();

    for (const [file, label] of manifest) {
      const pageName = PAGE_FOR[file] || "Kit";
      figma.ui.postMessage({ type: "progress", text: `Placing ${label}…` });
      const svgRes = await fetch(`${origin}/figma-kit/${file}`);
      if (!svgRes.ok) throw new Error(`Missing ${file}`);
      const svg = await svgRes.text();
      const node = figma.createNodeFromSvg(svg);
      node.name = label;

      let page = pages.get(pageName);
      if (!page) {
        page = figma.root.children.find((p) => p.name === pageName);
        if (!page) {
          page = figma.createPage();
          page.name = pageName;
        }
        pages.set(pageName, page);
        xByPage.set(pageName, 0);
      }

      page.appendChild(node);
      node.x = xByPage.get(pageName) || 0;
      node.y = 0;
      xByPage.set(pageName, node.x + node.width + 80);
    }

    figma.ui.postMessage({
      type: "done",
      text: `Imported ${manifest.length} frames into this file.`,
    });
  } catch (err) {
    figma.ui.postMessage({
      type: "error",
      text: err && err.message ? err.message : String(err),
    });
  }
};
