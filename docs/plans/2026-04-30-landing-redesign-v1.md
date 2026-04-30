# MambaHR Landing v2 — Design Document

**Date:** 2026-04-30
**Owner:** Sebastian Kirsch (CTO), Brian Bell (CEO)
**Supersedes:** `2026-04-12-landing-page-redesign.md` (the dark-mode-first plan)
**Inspirations:** [shapes.co](https://shapes.co), [bolto.com](https://www.bolto.com) — hybrid of Shapes' editorial product surface and Bolto's bold human photography
**Status:** Approved scope. Ready for implementation.

---

## 0. Why we're rebuilding

The current single-page site is a brochure. It tells investors who we are. It does not tell a CHRO why their HR department should be replaced by an agent that already lives in their Slack.

Three things change in v2:

1. **Multi-page architecture** mirroring the actual product sidebar (Today / Mamba / People / Hiring / Payroll / Workspaces / Vault / Settings) so that a buyer landing on any page sees the same nouns the product uses.
2. **Light + gold palette** (no dark mode). The current dark plan was scrapped — light is warmer, more editorial, photographs better against human imagery.
3. **The wedge** moves to the headline: **"Your HR team, in Slack."** No migration, no training, no new app — it lives where employees already work. This is the single biggest objection-killer for replacing a legacy HRIS, and it's nowhere on the current site.

**v1 ships 8 pages.** Switch pages, payroll, vault, workspaces, settings, and platform/security pages come in v2.

---

## 1. The voice — calibrated to 6/10 kickass

### 1.1 Voice rules

- **Subject. Verb. Period.** Cut adjectives. "Your HR doesn't call in sick" beats "Your HR works tirelessly around the clock."
- **One contrast per line.** The rhythm of the site is contrasts — work vs human limits, agents vs department, 30 minutes vs 40 hours.
- **Specific over clever.** "Resolved in 4.2 seconds" beats "lightning fast." Real numbers from HR-Bench (94.2%) and the product (4.2s PTO resolution) appear throughout.
- **Verbs the agent does.** *Runs, approves, files, hires, drafts, sends, audits, terminates.* Never "helps," "empowers," "streamlines."
- **Honest about being AI.** Confident, not apologetic. The CHRO knows AI is doing the work — pretending otherwise is condescending.
- **Never name competitors in main copy.** Generic phrasing only — "legacy HRIS," "old-school HR software," "the spreadsheet era." Switch pages (v2) are the exception; there names are factual.
- **US English only.** No "organisation," no "colour."

### 1.2 What we don't say

- Never "AI fires people" (too hard).
- Never "revolutionizing HR" (corporate filler).
- Never "the future of work" (corporate filler).
- Never claim autonomy beyond what HIL gates allow — every always-human action stays always-human in copy.

### 1.3 Headline bank — approved

| Slot | Line |
|---|---|
| Homepage hero | **Your HR team, in Slack.** |
| Homepage hero alt (A/B) | Your HR doesn't call in sick. |
| Homepage subhead | An AI HR department that runs in the tools you already use. Hiring, payroll, leave, performance, compliance — the agents do the work. One human approves the calls that matter. |
| `/today` | 30 minutes. Your whole HR day. |
| `/mamba` | @mamba, take it from here. |
| `/people` | People ops without the ops. |
| `/hiring` | From req to offer. Without the loop. |

### 1.4 Truth-bomb sections (used across pages)

- **"Replaces the department. Keeps the human."** — MambaHR isn't HR software. It's the HR team. The Chief People Officer stays — for judgment, not work.
- **"No migration. No training. No new app."** — It already lives where your team works. Slack. Teams. Email. The web app is optional.
- **"Built for HR teams of 1–3 doing the work of 10."** — uses real human photography.
- **"The agent does the boring 80%. You do the 20% that matters."** — replaces any "AI fires people" framing with the same idea, less knife.

---

## 2. Design system

### 2.1 Color tokens — light + gold, no dark mode

```css
@theme {
  /* Surfaces */
  --color-bg:           #FFFFFF;   /* primary background */
  --color-bg-warm:      #FAF7F2;   /* warm cream — section breaks, hero backdrop */
  --color-bg-cream:     #F0EBE1;   /* deep cream — feature callouts, CTA panels */
  --color-bg-surface:   #FAFAF9;   /* card surfaces */
  --color-bg-elevated:  #F5F5F4;   /* hover states on cards */

  /* Text */
  --color-text:         #1C1917;   /* primary — near-black, warm */
  --color-text-muted:   #57534E;   /* secondary */
  --color-text-faint:   #A8A29E;   /* tertiary, labels, captions */

  /* Brand */
  --color-gold:         #B08D57;   /* primary accent — CTAs, highlights, links */
  --color-gold-dark:    #8E6F40;   /* AA-contrast gold for body links on white */
  --color-gold-light:   #C9A96E;   /* hover, soft accents */
  --color-gold-tint:    #F5EFE3;   /* gold-tinted background, "Mamba"-pill style */

  /* Borders */
  --color-border:       #E7E5E4;   /* default */
  --color-border-mid:   #D6D3D1;   /* emphasized */
  --color-border-faint: #F1EFEC;   /* hairline, used inside cards */

  /* Status */
  --color-green:        #15803D;   /* success */
  --color-red:          #B91C1C;   /* error */
}
```

**No dark mode.** No `prefers-color-scheme: dark`. No theme toggle. Light only — this is a deliberate brand choice and it photographs better with human imagery.

### 2.2 Typography

- **Sans:** Inter (already loaded — 400/500/600/700/900). Body, nav, UI, captions.
- **Serif:** Instrument Serif (already loaded — weight 400). H1, H2, H3 only. Used at weight 400, never bolded — gives editorial, premium feel like Shapes.
- **Mono:** JetBrains Mono (add — 400/500). Used in:
  - Slack/Teams thread mockups (the visual proof of "lives in your tools")
  - Today queue card timestamps
  - Code/command examples on `/mamba`
  - HR-Bench numbers (94.2%, 4.2s)

**Type scale (desktop):**

| Token | Size | Line | Weight | Family |
|---|---|---|---|---|
| display | 72px | 1.05 | 400 | serif |
| h1 | 56px | 1.1 | 400 | serif |
| h2 | 40px | 1.15 | 400 | serif |
| h3 | 28px | 1.25 | 500 | sans |
| h4 | 20px | 1.35 | 600 | sans |
| body-lg | 18px | 1.6 | 400 | sans |
| body | 16px | 1.6 | 400 | sans |
| body-sm | 14px | 1.55 | 400 | sans |
| caption | 13px | 1.45 | 500 | sans |
| eyebrow | 12px | 1.4 | 600 | sans (tracked +0.08em, uppercase) |
| mono | 14px | 1.5 | 400 | mono |

Mobile scales display→48, h1→40, h2→30, h3→22.

### 2.3 Spacing & layout

- **Container max-width:** 1200px (homepage hero), 1100px (content pages), 720px (long-form copy).
- **Section padding:** `padding-block: 120px` desktop, `80px` tablet, `64px` mobile.
- **Grid:** 12-col, 32px gutter desktop. Most sections use either 12-col, asymmetric 7+5, or centered 8-col.
- **Card radius:** 16px (default), 12px (small), 24px (hero callouts), 999px (pills).

### 2.4 Imagery & illustration direction

**Photography (humans):**
- **Where:** Built-for sections, About page, customer quotes, hiring funnel page (recruiter scene), homepage section "Built for HR teams of 1–3."
- **Subjects:** Real-looking HR people — 30s–50s, mostly women (HR is ~70% women), diverse, in actual workplaces. Not stock-glossy. Bolto-style: someone at a kitchen counter with a laptop, someone in a small office, someone on a phone call walking through a warehouse.
- **Treatment:** Warm, slightly desaturated, natural light. Subtle film grain. NEVER cool/blue-tinted corporate stock.
- **Sourcing:** Custom shoot if budget allows. Otherwise: Stocksy / Unsplash+ curated selection, NEVER Shutterstock generic stock.

**Product imagery:**
- **Where:** Homepage hero, every product page hero, dedicated product mockup sections.
- **Style:** Real screenshots from app.mambahr.com (light theme), framed in a stylized browser chrome with subtle drop shadow. Slack/Teams threads are mocked using actual Slack visual language — not abstracted.
- **NO 3D abstract illustrations.** No floating UI cards in space. No "AI brain" iconography.

**Illustration:**
- Minimal. Used only for: small section dividers (gold hairline + tiny serif "§" or numeric eyebrow), category icons (linear, single-stroke, gold).

### 2.5 Motion

- **Page enter:** content fades up 12px over 500ms, staggered 50ms per element, `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Hover physics:** buttons lift 1px, shadow grows from `0 1px 2px rgba(0,0,0,0.04)` to `0 4px 12px rgba(0,0,0,0.08)` over 200ms.
- **Scroll-triggered:** existing `[data-animate]` system from `globals.css` is reused.
- **No parallax.** No autoplay video. No mouse-follow effects.
- **One marquee:** the integration logo bar. Gentle, 60s loop, pauses on hover.

### 2.6 Component primitives

These components live in `src/components/ui/` and are reused everywhere:

- `<Container>` — max-width wrapper with responsive padding
- `<Section>` — `<section>` with vertical padding tokens
- `<Eyebrow>` — gold uppercase tag above headlines
- `<Headline>` — serif H1/H2 with consistent tracking
- `<Button>` — primary (charcoal `#1C1917`), secondary (outline), gold (CTA)
- `<Pill>` — small rounded label (used in nav for "New," in cards for status)
- `<Card>` — bordered container, hover-elevates
- `<SlackThread>` — mocked Slack DM/channel exchange
- `<TeamsThread>` — same for Teams
- `<EmailThread>` — Gmail-style stack
- `<TodayCard>` — Decision Card visual (the HIL approval card)
- `<AppFrame>` — browser chrome wrapping a product screenshot
- `<HumanPhoto>` — photo with caption + role attribution

---

## 3. Mega menu

The mega menu is the first thing every visitor sees and it sets up the IA for the entire site. It mirrors the product sidebar 1:1 so the language is consistent from marketing → app.

### 3.1 Top-level structure

```
[ MambaHR logo ]      Product ▾    Platform ▾    Pricing    Customers    Company ▾      [ Sign in ]  [ Request Access ]
```

### 3.2 "Product" mega panel (4-column)

Hover opens a 1100×420 panel.

| Column 1: Daily | Column 2: People | Column 3: Workflows | Column 4: Foundation |
|---|---|---|---|
| **Today** — your HIL queue *(live in v1)* | **People** — directory, comp, performance, leave *(live in v1)* | **Hiring** — reqs to offer *(live in v1)* | **Vault** — docs, e-sign, audit |
| **Mamba** — the agent in Slack *(live in v1)* | **Performance** — reviews, PIPs, growth | **Payroll** — multi-state, equity, 1099 | **Workspaces** — multi-entity |
| | **Time Off** — PTO, FMLA, parental | **Onboarding** — day-one ready | **Settings** — RBAC, audit, HIL policy |

In v1, only the *(live in v1)* pages route to real pages. Others route to `/coming-soon/[slug]` — a polished one-screen "what this will do" page with a CTA. Never 404.

Each menu item has: small linear gold icon, two-word label (sans 600), one-line description (sans 400, `text-muted`).

### 3.3 "Platform" mega panel (3-column, v2 mostly)

| Column 1: Where it lives | Column 2: How it thinks | Column 3: How it's safe |
|---|---|---|
| **Channels** — Slack, Teams, email | **Agent Architecture** — orchestrator + 13 sub-agents | **Security & Trust** — SOC2, audit log, RBAC |
| **Integrations** — Gusto, Workday, Okta, Carta | **Human-in-the-Loop** — Decision Cards, gating | **Compliance Engine** — the moat |
| **API** — *(later)* | **HR-Bench** — 94.2% vs GPT-4 31% | **PII-by-reference** — what the agent never sees |

In v1 all of these are `/coming-soon` stubs except potentially **Security** (which we may copy from current site).

### 3.4 "Company" simple dropdown

About · Customers · Pricing · Changelog · Blog · Careers · Contact

### 3.5 Mobile menu

Full-screen overlay, sectioned. No mega-panel — just collapsible groups with the same labels and descriptions, single-column. CTA pinned at bottom.

### 3.6 Nav behavior

- Transparent over hero, fades to white-with-blur (`rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)`) after 20px scroll.
- Mega panel opens on hover (desktop) with 100ms delay; tap-toggle on mobile/touch.
- Panel closes on outside-click, Escape, or mouse-leave with 200ms grace.
- Active page indicator: thin gold underline under top-level item.

---

## 4. `/` — Homepage

Total length: ~6 sections. Reads top-to-bottom in 90 seconds.

### Section 1 — Hero (full-bleed, ~720px tall)

**Layout:** centered, max-width 1100. Eyebrow + headline + subhead + dual CTA + trust microcopy. Below the CTA: split-screen product preview (Slack thread left, Today app right) — both labeled "MambaHR."

**Background:** `--bg-warm` (`#FAF7F2`). Subtle radial gradient with gold tint at top-center, fading to cream.

**Copy:**
- Eyebrow (gold, tracked): `THE AI HR DEPARTMENT`
- Headline (serif, 72px): **Your HR team, in Slack.**
- Subhead (18px, max-width 640): An AI HR department that runs in the tools you already use. Hiring, payroll, leave, performance, compliance — the agents do the work. One human approves the calls that matter.
- Primary CTA: `Request access →` (gold pill, `--gold` background, white text)
- Secondary CTA: `See it in Slack` (text link with gold underline)
- Trust microcopy below CTAs (caption gray): `In private beta · 4 design partner spots open this quarter · SOC 2 in progress`

**Visual centerpiece (below CTAs, full-width 1100):**
- Left half: A real Slack thread mockup. Message: "@mamba I need 3 days off next week — Mon to Wed for a wedding 🎉" → bot reply (with Mamba avatar, gold dot): "Approved. PTO balance: 12 → 9 days. Calendar updated, manager notified, out-of-office set for Mon Apr 6 – Wed Apr 8. ✨"
- Right half: The Today app screenshot showing the HIL queue with 6 cards visible.
- Caption underneath spanning both: `Same agent. Two surfaces. The employee never leaves Slack. The CHRO sees every decision in Today.`

### Section 2 — "Where MambaHR lives" (the wedge)

**Background:** white.

**Headline (serif H2):** No new app. No retraining. No migration risk.

**Subhead:** MambaHR meets your team where they already work. Mention it. Email it. DM it. Forward it a contract. It just works.

**Four channel tiles (4-column grid, desktop; 2x2 mobile):**

Each tile: 280×320, white background with 1px border, hover lifts. Logo at top, title, one-line copy, mini-screenshot below.

| Tile | Title | Copy | Visual |
|---|---|---|---|
| Slack logo | **Already in Slack.** | Mention `@mamba`. Slash commands. DMs. Channel-aware. | Tiny thread mockup |
| Teams logo | **Already in Teams.** | Same agent, Microsoft surface. Tabs, mentions, adaptive cards. | Tiny Teams card |
| Email icon | **Already in your inbox.** | Forward an offer letter. Reply to a leave request. CC the agent. | Tiny email row |
| App icon | **Also a real app.** | A web app for the CHRO doing approvals + analytics. Optional. | Tiny app frame |

### Section 3 — "Replaces the department. Keeps the human." (the pivot)

**Background:** `--bg-cream` (`#F0EBE1`). Section feels like a panel.

**Layout:** 7+5 asymmetric.

**Left (7 cols):**
- Eyebrow: `THE WORK`
- Headline (serif): **MambaHR isn't HR software. It's the HR team.**
- Body (18px, max-width 540): The agents handle the daily work — recruiting screens, leave requests, payroll runs, performance reviews, compliance filings, offboarding paperwork. The Chief People Officer stays. Their day compresses to 30 minutes of judgment calls. Every decision logged, audited, reversible where it should be.
- Inline pill list of agent domains (12 small gold-tinted pills): Hiring · Onboarding · Lifecycle · Comp & Benefits · Time Off · Performance · L&D · Employee Relations · Compliance · Offboarding · Reports · Culture

**Right (5 cols):**
- Stack of three Today queue cards (TodayCard component), each showing a real-feeling decision the agent surfaces. The third card is gold-bordered ("urgent"). Caption: `What 30 minutes looks like.`

### Section 4 — Built for (with humans)

**Background:** white.

**Headline (serif, centered):** Built for HR teams of 1–3 doing the work of 10.

**Subhead (centered, 18px):** Companies between 50 and 500 employees. Growing fast. HR is one or two people, plus a lot of Sheets. We're for them.

**Three-column grid (desktop), each column a photo + caption:**

| Photo | Caption |
|---|---|
| HR person at laptop in small office, mid-laugh on a video call | **The Head of People** — running comp, hiring, performance — alone. |
| Two people reviewing something on a screen together | **The PeopleOps duo** — drowning in tickets, trying to ship policy. |
| Founder/COO looking at a spreadsheet | **The founder doing HR** — until they hire someone. |

Below grid, centered: small charcoal pill `Are you us? →` linking to the request form.

### Section 5 — The lab / the moat

**Background:** `--bg-warm`.

**Layout:** centered, 8-col content.

**Eyebrow:** `THE MOAT`

**Headline (serif):** 94.2% on HR-Bench. The next-best LLM scores 31%.

**Body:** We built our own benchmark for HR compliance accuracy across federal employment law, 50 state codes, and edge cases like FMLA + state PFML stacking. MambaHR scores 94.2%. Frontier general-purpose models score in the low 30s. That gap is the product.

**Visual:** A clean horizontal bar chart comparing MambaHR (94.2%, gold) vs four competitor labels ("Frontier model A," etc., gray) — never named. JetBrains Mono numbers.

Below: three small cards in a row — `Compliance Engine: 95K lines of employment law` · `HR-Bench: 1,200 graded scenarios` · `Self-learning: every decision improves the next`

### Section 6 — Request access (CTA)

**Background:** charcoal `#1C1917`, white text. Only dark section on the entire site (used as a closing punctuation, not a theme).

**Layout:** centered, max-width 720.

**Eyebrow (gold):** `REQUEST ACCESS`

**Headline (serif, white):** Hire the agent. Promote the human.

**Subhead (white, 70% opacity):** We're onboarding four design-partner companies this quarter. Two-field form. We respond personally within 48 hours.

**Form (existing waitlist component, restyled for dark):**
- Work email
- Company name
- Submit: `Request access` (gold pill)

**Trust line below:** Investor deck · Security · About — three links, white 70%, gold on hover.

### Section 7 — Footer

White background, charcoal text. Three columns:
- **Product** — Today, Mamba, People, Hiring, Pricing
- **Company** — About, Customers, Changelog, Careers, Contact
- **Legal & Trust** — Security, Privacy, Terms, SOC 2, Investor deck

Bottom row: logo, copyright, LinkedIn icon, version pill.

---

## 5. `/today` — The HIL queue

The proof page. This is what convinces the CHRO that the math works.

### Section 1 — Hero

**Background:** `--bg-warm`.

**Eyebrow:** `TODAY`

**Headline (serif, 72px):** 30 minutes. Your whole HR day.

**Subhead:** The agents ran the night shift. Recruiting screens, leave requests, comp changes, offboarding paperwork — done while you slept. This morning, a queue. Approve. Decline. Move on.

**Visual:** Wide product screenshot of the Today screen at 1280px wide, with eight Decision Cards visible. Frame in `<AppFrame>` browser chrome. Subtle gold glow.

**CTA:** `Request access →`

### Section 2 — "What's in the queue" (anatomy)

**Layout:** Single Decision Card centered, oversized (480px wide), with annotated callouts pointing to its parts.

**Headline (serif H2):** Every card is decision-ready.

**Annotated parts:**
1. **The action** — what the agent did or wants to do (e.g., "Terminate Sarah Chen — performance, end-of-PIP")
2. **The rationale** — agent's summary in 3 lines, with citations to source docs
3. **The evidence** — last 30 days of context (perf reviews, 1:1 notes, PIP doc) one click away
4. **The risk class & CUQ** — `L5 · CUQ 0.92` — color-coded
5. **The options** — Approve, Decline, Request changes, Escalate to legal
6. **The trail** — every prior step the agent took, timestamped

**Caption below:** No "go investigate." The agent investigated. You decide.

### Section 3 — The math

**Background:** `--bg-cream`.

**Headline (serif):** What 30 minutes a day actually replaces.

**Three-column comparison table:**

| | **Today (legacy HR)** | **With MambaHR** |
|---|---|---|
| HR FTE for 500 employees | 5 | 1 (judgment only) |
| Avg PTO request resolution | 4.2 hours | 4.2 seconds |
| Time spent on tickets | 60% | 0% |
| Time spent on compliance filings | 15% | 0% (automated, HIL on submit) |
| Time spent on judgment & policy | 25% | 100% |

Each row: thin border-faint underline. JetBrains Mono numbers. Right column gets gold-tint background.

### Section 4 — The gating policy (transparency)

**Headline (serif H2):** What the agent decides. What you decide.

**Two-column layout.**

**Left — "Agent decides (with audit log):"**
- PTO requests within policy
- Onboarding tasks within budget
- Comp changes inside band
- Standard compliance filings
- 401k enrollments, life events
- Performance review draft generation

**Right — "Always you (always-human):"**
- Involuntary terminations
- RIF execution
- Separation agreements
- ER investigation findings
- Hire decisions above director
- Comp changes above threshold
- Equity grants above per-grant cap
- Public statements from the company

Caption: This list is codified in our HIL policy and enforced in code. Auditor-verifiable.

### Section 5 — Built-for (humans, recurring)

Same component as homepage Section 4, different photos and captions. CHRO at desk; CEO with PeopleOps lead.

### Section 6 — Request access CTA

Same dark CTA panel as homepage.

---

## 6. `/mamba` — The agent in Slack

The marquee page. If a buyer visits one product page, this is the one that converts.

### Section 1 — Hero

**Background:** white.

**Eyebrow:** `MAMBA — THE AGENT`

**Headline (serif, 72px):** @mamba, take it from here.

**Subhead:** Mention the agent in any Slack channel. It reads the thread. Checks the policy. Takes the action. Logs the trail. Replies in seconds.

**Visual:** A live-feeling Slack channel mockup at 720px wide, centered. Three messages visible:
1. Employee (avatar): "Hey, anyone know how parental leave works for adoption? Adopting in June."
2. Manager (avatar): "@mamba — can you help here?"
3. Mamba (gold dot avatar, 4.2s ago): A multi-line reply with policy citation, eligibility check ("✓ tenure 18mo > 12mo required"), suggested action ("file FMLA + 8 weeks company-paid + state CFRA stacking"), and a button: `[Start the request]`.

CTA below: `Try it in your Slack →` (currently routes to Request Access).

### Section 2 — "What you can ask" (capability surface)

**Headline (serif H2):** It speaks HR.

**Layout:** 2-column. Left: a stack of 8 example Slack threads (small `<SlackThread>` components). Right: callout for what's happening behind the scenes.

**Example threads:**
1. "I need 3 days off next week" → PTO check + approval
2. "Can you write the offer for Maya at $185k base + 0.15% equity?" → drafted, sent for HIL approval
3. "Open a req for Senior Eng, EU remote" → JD generated, posted to Greenhouse
4. "Run November payroll" → preview + HIL approve
5. "What's the policy on bereavement for an aunt?" → policy citation, no action
6. "Sarah's PIP ends Friday — what's the path?" → packet ready, HIL gated
7. "How many people have we hired this quarter?" → answer + dashboard link
8. "Forward this signed offer to compliance" → routed, archived, audit-tagged

### Section 3 — "Where it lives"

Same four-tile component as homepage — Slack, Teams, Email, Web. Detailed copy here, not just teaser.

### Section 4 — "Under the hood" (architecture, light)

**Background:** `--bg-warm`.

**Headline (serif H2):** One agent. Thirteen specialists.

**Body:** When you ask Mamba, it doesn't answer alone. An orchestrator routes your question to the right specialist — Hiring, Comp, Performance, Compliance — and they hand back the answer through the rail.

**Visual:** A simplified version of the topology diagram from `mamba.md §3.1`. Shapes-style minimal — orchestrator at top (gold node), 13 sub-agent nodes below (charcoal), thin gold lines between. JetBrains Mono labels.

Below the diagram: link to platform page (v2 stub for now).

### Section 5 — Trust microsection

Three small cards: `RBAC scoped to your role` · `Every action audit-logged` · `PII never enters the LLM context`. Each links to `/security` (existing).

### Section 6 — CTA

Dark panel, same as homepage.

---

## 7. `/people` — People ops without the ops

### Section 1 — Hero

**Background:** white.

**Eyebrow:** `PEOPLE`

**Headline (serif, 72px):** People ops without the ops.

**Subhead:** Directory, compensation, performance, leave, lifecycle changes — the things a People team does every day, run by an agent. You stay strategic.

**Visual:** App screenshot of the People page (employee directory + record detail), framed.

### Section 2 — "What's covered" (capability cards)

**Layout:** 2x3 grid of capability cards, each with icon, title, description, mini-screenshot.

| Card | Subtitle | Description |
|---|---|---|
| Directory & Records | Source of truth | Every employee, every change, every history. Synced across Gusto, Workday, Rippling, BambooHR, or whatever you have today. |
| Lifecycle changes | Transfers, promotions, role changes | Manager change, location change, comp change, title change. The agent updates every system, files every form, notifies every stakeholder. |
| Compensation & Benefits | Bands, equity, enrollment | Comp recommendations within band. Equity refresh modeling. Open enrollment + life events. Pay equity audits on request. |
| Time Off & Leave | PTO, FMLA, parental, disability | Policy-aware approvals in seconds. FMLA eligibility + intermittent tracking. State PFML stacking. USERRA and ADA accommodations. |
| Performance & Growth | Reviews, PIPs, calibration | Review cycle launch, draft synthesis, calibration packets, PIP drafting and tracking. Promotion recommendations with EEO disparate impact analysis. |
| Offboarding | Resignation to revoked access | Final pay timing per state. Separation agreements drafted. Access revoked across Okta + downstream. Equipment recovery. COBRA. |

### Section 3 — A day in the life (Slack-thread carousel)

Three Slack threads showing real People ops moments — promotion announcement drafted, leave question answered, record updated. Same `<SlackThread>` component.

### Section 4 — Integrations strip

A horizontal marquee (60s loop) of integration logos: Gusto, Workday, Rippling, BambooHR, Namely, Deel, Personio, HiBob, Carta, Okta, DocuSign, Slack, Teams, Google Workspace, Microsoft 365, Greenhouse, Lever, Lattice, CultureAmp.

Caption: `Bring what you have. The agent connects to it.`

### Section 5 — Built-for + CTA

Same components as homepage.

---

## 8. `/hiring` — From req to offer

### Section 1 — Hero

**Background:** white.

**Eyebrow:** `HIRING`

**Headline (serif, 72px):** From req to offer. Without the loop.

**Subhead:** Reqs come in. The agent screens, schedules, references, and drafts the offer. You decide who joins.

**Visual:** App screenshot of a candidate pipeline view + an open offer draft.

### Section 2 — The funnel (timeline)

**Headline (serif H2):** A complete hiring loop. Run by the agent.

**Visual:** A horizontal timeline with 8 steps, each a small card with title + 1-line description + agent role + HIL gate (if any). JetBrains Mono step numbers.

| Step | Action | Agent does | You do |
|---|---|---|---|
| 01 | Req intake | Reads Slack/form, drafts JD with comp band | Approve JD |
| 02 | Posting | Posts to Greenhouse, LinkedIn, Indeed | — |
| 03 | Screening | Ranks resumes, drafts shortlist | — |
| 04 | Scheduling | Multi-calendar, time-zone aware | — |
| 05 | Interview kit | Loads scorecards, briefs panel | — |
| 06 | References | Requests, summarizes, flags issues | — |
| 07 | Background check | Runs Checkr, flags issues | — |
| 08 | Offer | Drafts, models counter, sends for sig | **Approve offer above band** |

### Section 3 — "Built on day one" (onboarding adjacent)

Sub-section since Hiring + Onboarding are unified in the agent zoo.

**Headline (serif H3):** Day one ready, before day one.

**Body:** Once they accept, the onboarding agent takes over. I-9, W-4, equipment provisioned, Okta + downstream access, buddy assigned, training scheduled, day-one announcement drafted. By the time they log in, everything works.

### Section 4 — Compliance microsection

A small panel with compliance copy: OFCCP, EEO collection, state pay disclosure (CO/NY/WA/CA), I-9 timing. Quiet but present — recruiters care.

### Section 5 — CTA

Dark panel.

---

## 9. `/pricing`

Pricing in a private beta is delicate. We don't publish per-seat numbers because the design partners are getting custom deals and we don't want to anchor.

### Section 1 — Hero

**Headline (serif):** Pricing for design partners.

**Subhead:** We're onboarding our first four customers this quarter. Pricing is custom. The framework is below.

### Section 2 — Pricing framework (transparent)

**Three-card layout, but no dollar amounts:**

| Pilot | Production | Enterprise |
|---|---|---|
| First 90 days | After pilot | Multi-entity, advanced security |
| Up to 100 employees | Volume-based, banded | Custom |
| All agents enabled | All agents enabled | All agents + dedicated success + audit support |
| Slack/Teams/Email/Web | Same | Same + SAML SSO + SCIM + custom data residency |
| HIL approvals included | Same | Same |
| **Talk to us** | **Talk to us** | **Talk to us** |

### Section 3 — What's included

Bullet list of what every tier gets: all 13 agents, all integrations, audit log, RBAC, SOC2 evidence (in progress), HIL workflow, business-hour support.

### Section 4 — FAQ

8 questions:
1. Why no published pricing?
2. How do you charge — per seat, per employee, per agent?
3. What's the contract length?
4. What happens during the pilot?
5. Can we start in one department?
6. What does the migration look like?
7. What's the security/compliance posture?
8. Who owns the data?

### Section 5 — CTA

Same dark panel.

---

## 10. `/about`

### Section 1 — Hero

**Headline (serif, centered, 56px):** We're replacing the HR department, with a human in the loop.

**Subhead (centered, 18px):** MambaHR is building the AI HR department. Brian Bell (CEO) and Sebastian Kirsch (CTO) — operators who've run HR at startups and watched it fail at scale.

### Section 2 — The story

Long-form, max-width 720, body-lg. Three-paragraph origin story.

1. The problem we kept seeing — HR is one person doing the work of ten. The legacy software is a database with a UI. The work doesn't get done; it gets ticketed.
2. The shift — frontier models finally got good enough at the legal/compliance reasoning HR needs. We built a benchmark to prove it. We scored 94.2%.
3. The plan — replace the department's daily work with agents. Keep the human in the loop for the calls that matter.

### Section 3 — The team

Two big photos (Brian + Sebastian), name, role, one-paragraph bio, LinkedIn link. Same `<HumanPhoto>` component.

### Section 4 — Investors / advisors

Logo grid (when we have logos). Until then: "Backed by [tier of investor]. Advised by [tier]." Generic.

### Section 5 — Press / mentions

Empty in v1, structured for future use.

### Section 6 — CTA — Investor deck link prominent

Same dark CTA panel but with two buttons: `Request access` (gold) and `Investor deck` (white outline).

---

## 11. `/coming-soon/[slug]` — The stub page (v2 placeholder)

Used for every nav link not yet built (Payroll, Vault, Workspaces, Settings, all platform pages, all switch pages).

**Layout:** centered, max-width 720, single screen.

**Eyebrow:** Page name.

**Headline (serif H2):** "[Page topic] — coming soon."

**Body:** Three short paragraphs describing what this page will cover when shipped.

**Form:** "Want early access to [topic]?" Email field + button.

**Footer link:** `← Back to MambaHR`

This pattern means **no nav link ever 404s** and we can ship the mega menu with full structure on day one.

---

## 12. Photography brief

**v1 needs ~10 hero/section photos.** Use Stocksy or Unsplash+ curated; if budget allows, custom shoot in NYC / LA mid-May.

**Shot list:**

| # | Where | Subject | Mood |
|---|---|---|---|
| 1 | Homepage built-for | HR person at laptop, mid-laugh, video call visible | Warm, candid |
| 2 | Homepage built-for | Two PeopleOps people reviewing screen together | Collaborative |
| 3 | Homepage built-for | Founder/COO at spreadsheet | Slight overwhelm, real |
| 4 | `/today` built-for | CHRO at desk, morning coffee, looking at screen | Focused, calm |
| 5 | `/today` built-for | CEO + PeopleOps lead at table | Strategic |
| 6 | `/people` (optional) | HR person on phone walking through office | In motion |
| 7 | `/hiring` (optional) | Recruiter on a video interview | Real, not staged |
| 8 | `/about` | Brian portrait | Founder portrait, warm |
| 9 | `/about` | Sebastian portrait | Founder portrait, warm |
| 10 | Homepage section 5 (optional) | Team meeting, blurred in background | Texture |

**Treatment notes:** all images warm-graded, slight desaturation, fine grain. Subjects facing toward content (left-facing photos go on right side of layouts and vice versa). No pure-white-background corporate stock.

---

## 13. Component inventory

New components to build in v1 (all in `src/components/`, with `ui/` for primitives):

**Primitives (ui/):**
- `container.tsx`
- `section.tsx`
- `eyebrow.tsx`
- `headline.tsx`
- `button.tsx` (consolidate existing patterns)
- `pill.tsx`
- `card.tsx`

**Surfaces (mocked product):**
- `slack-thread.tsx`
- `teams-thread.tsx`
- `email-thread.tsx`
- `today-card.tsx` (Decision Card)
- `app-frame.tsx` (browser chrome)

**Composite sections (reused across pages):**
- `mega-nav.tsx` (replaces existing nav)
- `mega-nav-product-panel.tsx`
- `mega-nav-platform-panel.tsx`
- `mega-nav-mobile.tsx`
- `hero-split.tsx` (homepage hero pattern)
- `where-it-lives.tsx` (4-tile channel grid)
- `built-for-photos.tsx` (3-column human photo grid)
- `cta-dark.tsx` (charcoal request-access panel)
- `integrations-marquee.tsx`
- `footer.tsx` (rebuild from existing)
- `human-photo.tsx`

**Page-specific:**
- `today-anatomy.tsx` (annotated Decision Card)
- `today-math.tsx` (3-column comparison table)
- `today-gating.tsx` (agent vs always-human)
- `mamba-thread-grid.tsx` (8 example Slack threads)
- `mamba-architecture.tsx` (simplified topology diagram)
- `hiring-funnel.tsx` (8-step timeline)
- `people-capabilities.tsx` (2x3 capability grid)
- `pricing-framework.tsx` (3-column tier table)

**Reused / kept:**
- `lab.tsx` (refactored — light theme, used in homepage section 5)
- `waitlist.tsx` (restyled for dark CTA panel)
- `turnstile-widget.tsx` (kept)
- `animate-on-scroll.tsx` (kept)

**Deleted:**
- `hero.tsx` (replaced by `hero-split.tsx`)
- `features.tsx` (deprecated — capabilities move per-page)
- `built-for.tsx` (replaced by `built-for-photos.tsx`)
- `logo-bar.tsx` (replaced by `integrations-marquee.tsx`)
- `product-mockup.tsx`, `product-preview.tsx`, `product-demo.tsx` (replaced by `app-frame.tsx` + page-specific screenshots)
- `particle-field.tsx` (no decorative particles in v2)
- `testimonial.tsx` (kept aside — re-introduce when we have real quotes)

---

## 14. File structure

```
src/
├── app/
│   ├── layout.tsx                 (update — JetBrains Mono added)
│   ├── globals.css                (rewrite — light tokens, no dark)
│   ├── page.tsx                   (rewrite — homepage)
│   ├── today/page.tsx             NEW
│   ├── mamba/page.tsx             NEW
│   ├── people/page.tsx            NEW
│   ├── hiring/page.tsx            NEW
│   ├── pricing/page.tsx           NEW
│   ├── about/page.tsx             (exists — restyle to new system)
│   ├── coming-soon/[slug]/page.tsx NEW
│   ├── security/                   (kept, restyled if needed)
│   ├── og-preview/                 (kept)
│   ├── investors/                  (kept, hidden)
│   ├── research/                   (kept, hidden)
│   ├── d/                          (kept)
│   ├── [slug]/                     (audit — likely redundant with /coming-soon)
│   ├── sitemap.ts                  (regenerate with new pages)
│   └── robots.ts                   (kept)
├── components/
│   ├── ui/
│   │   ├── container.tsx
│   │   ├── section.tsx
│   │   ├── eyebrow.tsx
│   │   ├── headline.tsx
│   │   ├── button.tsx
│   │   ├── pill.tsx
│   │   └── card.tsx
│   ├── nav/
│   │   ├── mega-nav.tsx
│   │   ├── product-panel.tsx
│   │   ├── platform-panel.tsx
│   │   └── mobile.tsx
│   ├── surfaces/
│   │   ├── slack-thread.tsx
│   │   ├── teams-thread.tsx
│   │   ├── email-thread.tsx
│   │   ├── today-card.tsx
│   │   └── app-frame.tsx
│   ├── sections/
│   │   ├── hero-split.tsx
│   │   ├── where-it-lives.tsx
│   │   ├── built-for-photos.tsx
│   │   ├── cta-dark.tsx
│   │   ├── integrations-marquee.tsx
│   │   ├── lab.tsx
│   │   ├── today-anatomy.tsx
│   │   ├── today-math.tsx
│   │   ├── today-gating.tsx
│   │   ├── mamba-thread-grid.tsx
│   │   ├── mamba-architecture.tsx
│   │   ├── hiring-funnel.tsx
│   │   ├── people-capabilities.tsx
│   │   └── pricing-framework.tsx
│   ├── footer.tsx
│   ├── human-photo.tsx
│   ├── waitlist.tsx
│   ├── turnstile-widget.tsx
│   └── animate-on-scroll.tsx
├── lib/
│   └── actions.ts                  (kept — waitlist submit action)
└── content/
    ├── nav.ts                      NEW (mega menu config — single source)
    ├── photos.ts                   NEW (photo path + caption registry)
    └── threads.ts                  NEW (mocked Slack/Teams/Email threads as data)
```

The `content/` directory is new — keeps mock thread copy and photo metadata out of components, makes copy edits one-file changes.

---

## 15. Implementation plan — task sequence

**Estimated total: 7–10 working days of focused implementation.**

The plan assumes one engineer (Sebastian) with no parallelization. A second pair of hands could compress to 5 days.

### Phase A — Foundation (1.5 days)

1. **Rewrite `globals.css`** with new color tokens (light + gold + cream), spacing scale, typography scale. Verify build.
2. **Update `layout.tsx`** — add JetBrains Mono via next/font, update metadata for new positioning ("AI HR department, in Slack").
3. **Build UI primitives** in `src/components/ui/` — Container, Section, Eyebrow, Headline, Button, Pill, Card. One Storybook-style preview page at `/d/components` (extends existing `/d` route).
4. **Build mega-nav** — desktop mega panel + mobile collapse + scroll behavior. Wire all routes; non-v1 routes go to `/coming-soon/[slug]`.
5. **Build `coming-soon/[slug]/page.tsx`** — dynamic page with topic registry from `content/nav.ts`.
6. **Commit:** `feat: design system foundation — light tokens, mega nav, primitives`

### Phase B — Surfaces (1.5 days)

7. **Build mocked-product surfaces** — SlackThread, TeamsThread, EmailThread, TodayCard, AppFrame. These are the visual workhorses; over-investing here pays off across every page.
8. **Build composite sections** — HeroSplit, WhereItLives, BuiltForPhotos, CtaDark, IntegrationsMarquee.
9. **Source v1 photos** (Stocksy / Unsplash+); place in `public/photos/`; register in `content/photos.ts`.
10. **Commit:** `feat: surfaces and composite sections`

### Phase C — Homepage (1 day)

11. **Rewrite `app/page.tsx`** assembling sections 1–7.
12. **Take screenshots** at 1440×900 desktop, 1440×6000 full-page, 390×844 mobile. Verify hierarchy.
13. **Commit:** `feat: homepage v2 — wedge-led, mega nav, light theme`

### Phase D — Today + Mamba (2 days)

14. **Build `/today/page.tsx`** with sections 1–6.
15. **Build `/mamba/page.tsx`** with sections 1–6, including the simplified architecture diagram (SVG).
16. **Commit each page separately.**

### Phase E — People + Hiring (1.5 days)

17. **Build `/people/page.tsx`** with sections 1–5.
18. **Build `/hiring/page.tsx`** with sections 1–5.
19. **Commit each page separately.**

### Phase F — Pricing + About (1 day)

20. **Build `/pricing/page.tsx`** with sections 1–5.
21. **Restyle `/about/page.tsx`** to new design system (existing page becomes new template).
22. **Commit each page separately.**

### Phase G — Polish (1 day)

23. **Sitemap** — regenerate `sitemap.ts` with all new public routes.
24. **Footer** — rebuild with new product link list.
25. **Waitlist** — restyle for dark CTA panel.
26. **Lab** — refactor existing `lab.tsx` to light theme + new tokens.
27. **Mobile audit** — verify every page at 390×844; fix grid stacks.
28. **A11y audit** — heading order, alt text on every photo, AA contrast on every text/bg pair (pay special attention to gold-on-white — use `--gold-dark` for body links).
29. **Performance** — Lighthouse run; target LCP < 2.5s, CLS < 0.1, TBT < 200ms. Optimize photos to AVIF/WebP, lazy-load below-fold.
30. **Commit:** `feat: polish — sitemap, footer, mobile, a11y, perf`

### Phase H — Verification (0.5 day)

31. **Production build** — `npx next build` — clean, no warnings.
32. **Manual checklist:**
    - [ ] Mega menu opens and closes correctly on desktop hover
    - [ ] Mobile menu works on iPhone-width
    - [ ] Every nav link routes to either a real page or a polished `coming-soon` stub — no 404s
    - [ ] Homepage hero loads in < 2.5s LCP
    - [ ] Light theme only — no dark-mode artifacts
    - [ ] Every H1 unique per page
    - [ ] Form submits, success state shows
    - [ ] All photos load in AVIF/WebP
    - [ ] All gold-on-white meets AA contrast (use `--gold-dark` for body)
    - [ ] No competitor names in any non-`/switch` page
    - [ ] US English throughout
33. **Final commit:** `feat: landing v2 — multi-page, light + gold, agent-first positioning`

---

## 16. What v2 (post-launch) brings

Out of scope for v1, parked for a follow-up doc:

- **Switch pages** — `/switch/rippling`, `/switch/workday`, `/switch/bamboohr`, `/switch/namely`, `/switch/gusto`, `/switch/justworks`, `/switch/deel`, `/switch/personio`, `/switch/hibob`, `/switch/new` (starting from scratch). 30-day migration guarantee. Three-column comparison. High-intent CTA.
- **`/payroll`** — full page with multi-state, contractor 1099, equity treatment, edge-case handling.
- **`/vault`** — docs, e-sign, audit, retention.
- **`/workspaces`** — multi-entity / international / M&A.
- **`/settings`** — RBAC, integrations, HIL policy, audit log.
- **Platform pages** — `/channels`, `/architecture`, `/hil`, `/security` (rebuild), `/hr-bench`, `/integrations`.
- **Customer page** — once we have ≥3 design partners willing to be quoted.
- **Changelog** — once shipping cadence justifies it.
- **Blog** — once we have anything to say beyond the existing pitch.
- **Custom photography shoot** — replace Stocksy with our own.

---

## 17. Decision log

Decisions baked into this plan that future versions should challenge:

1. **Light + gold, no dark mode.** Photographs better, brand-distinctive, no toggle complexity.
2. **Mega menu mirrors product sidebar 1:1.** Marketing → app coherence.
3. **"Your HR team, in Slack" is the wedge.** No-migration positioning beats feature comparison.
4. **Voice at 6/10 kickass.** Confident and sharp, not edgy. Never names competitors in main copy.
5. **8 pages in v1.** Homepage + Today + Mamba + People + Hiring + Pricing + About + coming-soon stubs. Switch pages and platform pages defer to v2.
6. **No 404s — every nav link routes to a real page or a polished stub.**
7. **Instrument Serif at weight 400 for headlines.** Already in use; works with the editorial direction.
8. **No 3D illustrations, no abstract AI imagery, no parallax.** Bolto/Shapes-grade restraint.
9. **Real photography, warm-graded, mostly women HR practitioners.** Reflects the actual buyer.
10. **One dark section per page (the CTA panel).** Used as punctuation, not theme.

---

## 18. Open questions to resolve before/during implementation

1. **Photography source** — Stocksy / Unsplash+ for v1, or budget a custom shoot? (Recommendation: Stocksy v1, custom in v2.)
2. **Slack/Teams/Email** — are all three live channels today, or is only Slack live? Affects whether the "Where it lives" tiles say "Available" or "Slack live, Teams Q3." (We need an accurate answer before headline copy lands.)
3. **HR-Bench number (94.2% vs 31%)** — is this still the published benchmark? Confirm before going live with it on the homepage.
4. **Today screenshot** — do we have a clean Today screenshot from app.mambahr.com at 1280px wide? If not, we need to mock it tight.
5. **Investor deck link** — public-link or gated form? Currently gated; the About CTA assumes public-link — confirm.
6. **Pricing tier names** — "Pilot / Production / Enterprise" — do those land, or do you want different labels?
7. **`/d` route** — is the existing `/d` route something to extend, replace, or leave alone? It currently has internal-feeling content.

---

## 19. Next action

This document is approved scope. The next step is **Phase A** (foundation) — rewriting `globals.css` with new tokens, updating `layout.tsx`, and building the UI primitives + mega nav.

Ready to start Phase A on your sign-off.
