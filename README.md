# Noros Campaign Kit

**Independent portfolio work. Not commissioned by or affiliated with North.Cloud or Noros.**

Faithful recreation of the [Noros AI Agent](https://north.cloud/features/ai-agent) landing page plus a three-audience launch campaign kit.

**Campaign line:** Ask your cloud what it costs—and why.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing recreation.
Campaign kit hub: [http://localhost:3000/campaign](http://localhost:3000/campaign)

## Routes

| Route | Deliverable |
|-------|-------------|
| `/` | Exact AI Agent landing recreation |
| `/campaign` | Messaging framework |
| `/campaign/meet` | Meet Noros hero |
| `/campaign/ads` | Three role ads (CFO / FinOps / Engineer) |
| `/campaign/carousel` | Five-slide LinkedIn carousel |
| `/campaign/ui` | Product UI hero graphic |
| `/campaign/brief` | Two-page solution brief |
| `/campaign/email` | Launch email |
| `/campaign/event` | Event-screen concept |
| `/campaign/storyboard` | 30s motion storyboard |
| `/campaign/launch` | Product Hunt–style assets |
| `/campaign/announce` | Executive announcement |
| `/campaign/figma` | Figma boards index |
| `/campaign/cfo` `/finops` `/engineers` | Role heroes |

## Figma

Design boards: [Noros Campaign Kit — Portfolio](https://www.figma.com/design/CTMlP9TsdTpS9MrKtaAp0m)

## Design fidelity

Landing `/` is a structural clone of the live AI Agent page:

- Blueprint grid: dotted `--bc-border` cells, 9px `#cross` corners, fake left edge
- Boxed uppercase headlines on black slabs
- Full-bleed hero still + NOROS wordmark + mint dual-button rail
- Feature / quotes / get-started media cached in `public/north/` from public Sanity/Mux URLs (portfolio recreation only)
- Type: Untitled Sans + Cygnito Mono (third-party IP; non-commercial recreation)

## Stack

Next.js App Router · TypeScript · Tailwind CSS v4 · Motion

See [BRIEF.md](BRIEF.md) for the full assignment checklist.
