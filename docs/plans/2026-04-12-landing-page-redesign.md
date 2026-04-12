# MambaHR Landing Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the MambaHR landing page from a compliance-heavy feature brochure into a dark, product-forward, conversion-optimized site that collects emails from HR leaders and signals credibility to investors.

**Architecture:** Complete rewrite of all components. Dark-mode-first design with warm gold accents. Single narrative arc: Vision → Why now → Product demo → Moat → Social proof → Convert. One CTA everywhere: "Request Access." Tailwind v4 utilities + CSS custom properties, no external UI libs, CSS-only animations.

**Tech Stack:** Next.js 16.2.3 (App Router), React 19, TypeScript, Tailwind CSS v4, next/font (Inter 400/500/600/700/900 + JetBrains Mono 400/500), CSS animations via Intersection Observer.

---

## Design System Changes

**FROM → TO:**
- Cream background (#F0EBE1) → Dark (#09090B) with subtle warm tint
- Playfair Display serif → Drop it. Inter only. JetBrains Mono for lab/technical sections
- Gold (#B08D57) stays as primary accent for CTAs and highlights
- 4 different CTAs → Single "Request Access" everywhere
- Feature-list narrative → Story-driven: vision → proof → convert

**Color tokens (new):**
```
--bg:          #09090B      (near-black, warm)
--bg-surface:  #111113      (card surfaces)
--bg-elevated: #19191B      (elevated cards, hover)
--text:        #FAFAF9      (primary text, warm white)
--text-muted:  #A1A1AA      (secondary text)
--text-faint:  #52525B      (tertiary, labels)
--gold:        #B08D57      (primary accent, CTAs)
--gold-light:  #C9A96E      (hover state)
--green:       #22C55E      (status indicators)
--border:      rgba(255,255,255,0.04)   (subtle borders)
--border-mid:  rgba(255,255,255,0.07)   (medium borders)
```

## New Section Order & Content

```
1. Nav           — Logo + "Request Access" pill (gold). No page links.
2. Hero          — "Your next HR hire isn't human." + product dashboard as hero image
3. Proof bar     — "Design partners:" + 3 company names + "4 spots left this quarter"
4. The shift     — Why now? 3 stats reframed as urgency, not pain
5. Product demo  — PTO request → resolved in 4.2s timeline walkthrough
6. Capabilities  — 4 cards: Leave, Onboarding, Compliance, Intelligence (shorter copy)
7. The Lab       — HR-Bench score (94.2% vs GPT-4 31%), terminal, 3 research pillars
8. Built for     — "Teams of 50–500 with 1–3 HR people doing the work of 10"
9. Request       — 2-field form: Work email + Company. "Request Access."
10. Footer       — Logo, legal, investor deck link, LinkedIn
```

---

### Task 1: Update globals.css — New dark design system

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Rewrite globals.css with new tokens and dark base**

```css
@import 'tailwindcss';

@theme {
  --color-bg: #09090B;
  --color-bg-surface: #111113;
  --color-bg-elevated: #19191B;
  --color-text: #FAFAF9;
  --color-text-muted: #A1A1AA;
  --color-text-faint: #52525B;
  --color-gold: #B08D57;
  --color-gold-light: #C9A96E;
  --color-green: #22C55E;
  --color-border: #ffffff0a;
  --color-border-mid: #ffffff12;
}

:root {
  --bg: #09090B;
  --bg-surface: #111113;
  --bg-elevated: #19191B;
  --text: #FAFAF9;
  --text-muted: #A1A1AA;
  --text-faint: #52525B;
  --gold: #B08D57;
  --gold-light: #C9A96E;
  --green: #22C55E;
  --border: rgba(255,255,255,0.04);
  --border-mid: rgba(255,255,255,0.07);
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  line-height: 1.7;
  font-size: 16px;
}

[data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 64px 64px;
}

.glow-gold {
  box-shadow: 0 0 80px rgba(176, 141, 87, 0.15),
              0 0 160px rgba(176, 141, 87, 0.05);
}

::selection {
  background: var(--gold);
  color: #fff;
}
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: dark design system with new color tokens"
```

---

### Task 2: Update layout.tsx — Drop Playfair, add JetBrains Mono

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Rewrite layout.tsx**

Remove Playfair_Display. Add JetBrains_Mono. Update metadata to "AI employee" positioning. Keep Inter as primary. Static JSON-LD is a hardcoded constant — safe to inline.

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mambahr.com'),
  title: 'MambaHR — The AI Agent for People Operations',
  description:
    'MambaHR is an autonomous AI agent that handles leave, onboarding, and compliance for HR teams of 50-500. Built on a proprietary compliance engine with 95K lines of employment law.',
  keywords: [
    'HR AI agent',
    'people operations AI',
    'HR automation',
    'AI HR software',
    'HR compliance engine',
    'autonomous HR',
  ],
  openGraph: {
    title: 'MambaHR — Your next HR hire isn\'t human.',
    description: 'The autonomous AI agent for people operations. Leave, onboarding, compliance — handled in seconds.',
    url: 'https://mambahr.com',
    siteName: 'MambaHR',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MambaHR — Your next HR hire isn\'t human.',
    description: 'The autonomous AI agent for people operations.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://mambahr.com' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const jsonLdString = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MambaHR',
  applicationCategory: 'BusinessApplication',
  description: 'Autonomous AI agent for HR and people operations',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Private beta — request access',
  },
  operatingSystem: 'Web',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
```

**Step 2: Verify build**

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: update layout — Inter + JetBrains Mono, new metadata"
```

---

### Task 3: Rewrite Nav — Minimal, dark, single CTA

**Files:**
- Modify: `src/components/nav.tsx`

**Step 1: Rewrite nav.tsx**

Dark transparent nav. Logo left, "Request Access" gold pill right. No page links.

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(9,9,11,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-mid)' : '1px solid transparent',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1100, padding: '18px 24px' }}
      >
        <a href="#" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          MambaHR
        </a>

        <a
          href="#request-access"
          className="transition-all duration-200"
          style={{
            backgroundColor: 'var(--gold)',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--gold-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--gold)')}
        >
          Request Access
        </a>
      </div>
    </nav>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/nav.tsx
git commit -m "feat: minimal dark nav with single Request Access CTA"
```

---

### Task 4: Rewrite Hero — Vision headline + product dashboard centerpiece

**Files:**
- Modify: `src/components/hero.tsx`

**Step 1: Rewrite hero.tsx**

Centered headline "Your next HR hire isn't human." with gold accent. Single CTA. Full-width product dashboard mockup below as the visual centerpiece with glow effect. Trust signals at bottom.

The hero is a server component (no state needed — removed email form from hero). The dashboard mockup from the current hero (topbar, sidebar, main panel with greeting/stats/queue/activity) should be preserved and placed full-width inside the `.glow-gold` container.

**Step 2: Verify build + take screenshot**

**Step 3: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat: vision-led hero with centered headline and product dashboard"
```

---

### Task 5: Rewrite logo-bar.tsx → Proof Bar

**Files:**
- Modify: `src/components/logo-bar.tsx`

**Step 1: Rewrite as simple static proof bar**

No marquee animation. Static row: "Design partners:" + 3 company names. Dark surface background.

**Step 2: Commit**

```bash
git add src/components/logo-bar.tsx
git commit -m "feat: proof bar with design partner names"
```

---

### Task 6: Rewrite problem.tsx → "The Shift"

**Files:**
- Modify: `src/components/problem.tsx`

**Step 1: Rewrite with "why now" framing**

Reframe from "HR is broken" to "The moment has arrived." New headline: "HR teams of 3 are doing the work of 10. AI is finally good enough to help." Three stats reframed: 40% admin time, 200hrs/quarter lost, $4,700 cost-per-hire.

**Step 2: Commit**

```bash
git add src/components/problem.tsx
git commit -m "feat: reframe problem as 'the shift' — why now"
```

---

### Task 7: New product-demo.tsx — Show the product working

**Files:**
- Create: `src/components/product-demo.tsx`

**Step 1: Write product-demo.tsx**

Scenario walkthrough: "Sarah requests PTO → resolved in 4.2s." Timeline with monospace timestamps in a dark card. Headline: "4.2 seconds. Zero humans." Six steps showing inbound → policy check → compliance → action → notify → done.

**Step 2: Commit**

```bash
git add src/components/product-demo.tsx
git commit -m "feat: product walkthrough showing PTO resolved in 4.2s"
```

---

### Task 8: Rewrite features.tsx → Capabilities (shorter, reframed)

**Files:**
- Modify: `src/components/features.tsx`

**Step 1: Rewrite with shorter copy**

Must be `'use client'` because of hover handlers. Four cards with monospace numbers (01–04), outcome-oriented descriptions. "Compliance" card renamed to "Continuous Compliance" — mentioned once, not the lead.

**Step 2: Commit**

```bash
git add src/components/features.tsx
git commit -m "feat: shorter outcome-oriented capability cards"
```

---

### Task 9: Rewrite lab.tsx — Benchmark front-and-center

**Files:**
- Modify: `src/components/lab.tsx`

**Step 1: Rewrite with HR-Bench score as hero element**

Lead with benchmark: "94.2% MambaHR vs 31% GPT-4" on HR compliance accuracy. Then terminal visual (preserve current terminal JSX). Then 3 research pillars (Compliance Engine, HR-Bench, Self-Learning). Drop the "7 Patents" card — patents mentioned elsewhere.

**Step 2: Commit**

```bash
git add src/components/lab.tsx
git commit -m "feat: lab with HR-Bench benchmark front and center"
```

---

### Task 10: New built-for.tsx — Persona targeting

**Files:**
- Create: `src/components/built-for.tsx`

**Step 1: Write built-for.tsx**

Headline: "Teams of 50–500 where HR runs on grit and Google Sheets." Three columns: "1–3 HR people" / "Growing fast" / "Using Gusto, BambooHR, or Rippling." Makes the ideal customer say "that's us."

**Step 2: Commit**

```bash
git add src/components/built-for.tsx
git commit -m "feat: built-for section targeting HR teams of 50-500"
```

---

### Task 11: Rewrite waitlist.tsx → Request Access form

**Files:**
- Modify: `src/components/waitlist.tsx`
- Modify: `src/lib/actions.ts`

**Step 1: Simplify to 2-field form**

Only work email + company name. Gold submit button. Success state: "You're in." Below form: visible links for "Investor deck" and "Contact us."

Also update `src/lib/actions.ts` to match (remove name/size fields).

**Step 2: Commit**

```bash
git add src/components/waitlist.tsx src/lib/actions.ts
git commit -m "feat: simplified request access — 2 fields, one CTA"
```

---

### Task 12: Rewrite footer.tsx — Minimal with investor link

**Files:**
- Modify: `src/components/footer.tsx`

**Step 1: Rewrite footer**

Server component (no hover handlers). Logo, legal links (Privacy/Security/Terms), "Investors" mailto link, copyright, LinkedIn icon.

**Step 2: Commit**

```bash
git add src/components/footer.tsx
git commit -m "feat: minimal footer with investor link"
```

---

### Task 13: Delete unused files and update page.tsx

**Files:**
- Delete: `src/components/how-it-works.tsx`
- Delete: `src/app/page.module.css`
- Modify: `src/app/page.tsx`

**Step 1: Update page.tsx with new section order**

```
Nav → Hero → ProofBar → TheShift → ProductDemo → Capabilities → Lab → BuiltFor → RequestAccess → Footer → AnimateOnScroll
```

Import from the same filenames (logo-bar.tsx, problem.tsx, features.tsx, etc.) using the new component names.

**Step 2: Delete unused files**

```bash
rm src/components/how-it-works.tsx src/app/page.module.css
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: assemble redesigned page with new narrative arc"
```

---

### Task 14: Final build, screenshot, and verify

**Step 1: Production build**

```bash
npx next build 2>&1 | tail -15
```

Expected: Clean build, all pages static.

**Step 2: Dev server + screenshots**

Start dev server, take screenshots at 1440x900 (desktop), 1440x6000 (full page), 390x844 (mobile).

**Step 3: Verify checklist**

- [ ] Single CTA "Request Access" — nav, hero, form section (3x, consistent)
- [ ] Dark design throughout, product-forward
- [ ] No Playfair serif anywhere
- [ ] "Compliance" mentioned max 2-3 times, never as the lead
- [ ] HR-Bench benchmark visible (94.2% vs 31%)
- [ ] Urgency signal ("4 spots left this quarter")
- [ ] Persona targeting ("teams of 50-500")
- [ ] Investor deck link visible
- [ ] Mobile responsive — all grids stack
- [ ] One H1 on the page
- [ ] JSON-LD, OG tags, canonical URL set
- [ ] Form submits without reload, shows success state

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete landing page redesign — dark, product-forward, conversion-optimized"
```
