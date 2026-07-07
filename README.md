# Nichapa Nopparat — Portfolio

Personal portfolio website. Editorial / print-inspired design built with Next.js.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** — scroll & entrance animations
- **next/font** — Fraunces (display), Inter (body), JetBrains Mono (labels)

## Getting Started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/          layout, page, global styles
components/    Nav, Hero, Marquee, About, Experience, Skills, Education, Contact
data/          portfolio.ts — all site content in one place
```

Edit everything (bio, experience, skills, links) in [`data/portfolio.ts`](data/portfolio.ts).
