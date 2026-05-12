# Landing page feedback v2 — design doc

**Date:** 2026-05-12
**Source:** User feedback session + `docs/plans/Landing Page (desktop).pdf`
**Status:** Validated, ready for implementation plan

---

## North star

Primary reader of every public page is a **non-technical HR / legal / finance buyer**. Engineering aesthetic stays in the mockups; the *words* around them get humanized everywhere. CTAs are aggressive and contextual. Setup story is unambiguous: **1–2 days, no "weeks" phase.**

---

## 1. Audience + voice

- Strip all engineering jargon from copy.
- Keep technical product surfaces (Decision Cards, routing log, employee directory) as visual proof — but their *labels* become plain English.

## 2. Deployment timeline — the truth

**Setup is 1–2 days. Full stop.**

There is no "full deployment in 4–8 weeks" phase. That claim is removed from:
- `src/app/page.tsx:113` — the "How long does setup take?" FAQ
- `src/app/pricing/page.tsx:90` — the "Can we start in one HR function?" FAQ

Rewritten FAQ:
> **How long does setup take?** Most teams are running by end of day Friday and live Monday morning. Day 1: we pull your data from your old HRIS and you set policy on one screen. Day 2: the agent goes live. Some teams choose to start with one function (like leave) and add others over the first week — that's a trust pace, not a setup limitation.

## 3. Jargon → human mapping (apply everywhere)

| Engineering | Human |
|---|---|
| CUQ / CUQ 0.88 | dropped (no replacement on landing) |
| L1–L5 risk class | "Routine" / "Needs your sign-off" / "Always you" |
| Orchestrator | dropped on landing; say "MambaHR" or "the agent" |
| Specialist agents | kept (lowercase): "specialist agents" |
| Routing log | "Activity" |
| LIVE · 9:14 AM · 47 actions/min | "9:14 AM · 47 actions routed" (no "LIVE") |
| Cutover / cut over / migrate | "Switch from" / "Move from" |
| Shadow mode | removed entirely (we go live in 1 day) |
| Live mode | "Live" |
| HIL gates | "human sign-off" |
| Always-human | "Always you" |
| Decision Card | "Approval" / "Sign-off request" |
| Threshold | "Limit" / "Rule" |
| Risk-classified | "Sorted by who decides" |
| 14 specialist agents | kept verbatim — it's punchy and HR people grok it |

**Terminology consistency:** Use "**the agent**" (singular) for MambaHR as a whole. Use "**specialist agents**" or "**agents**" (plural) for the 14 specialists. Examples: "the Time-off agent", "the Hiring agent". No "specialist agent" mid-flow — just "agent".

## 4. Decision Card mockup

Strip CUQ scores and L1–L5 badges everywhere they appear in mockups:
- `src/components/surfaces/today-card.tsx` (the `cuq` prop and CUQ badge)
- `src/components/sections/agent-pipeline.tsx:173` (`CUQ 0.97 · L2 · resolved 9:14:04`)
- `src/components/nav/mega-nav.tsx:342` (`CUQ 0.88`)
- `src/app/today/page.tsx:18–69` (all `cuq` fields in card data)
- `src/app/today/page.tsx:206` (`cuq={0.88}` prop)
- `src/app/today/page.tsx:218, 239` (the "CUQ score" explainer rows)
- `src/app/today/page.tsx:109` ("Risk class and CUQ" label)
- `src/app/security/page.tsx:89` ("auto-resolved · CUQ 0.97")
- `src/content/nav.ts:182` (mention of "CUQ score")

Card now shows one human label only: `Auto-approved` / `Needs your sign-off` / `Always you`.

## 5. Demo CTA — fix the broken button

**Bug:** The "Get a demo" CTA links to `#request-access`. That anchor only exists on pages that include `<RequestAccessSection />`. About, Pricing, Investors, Research, og-preview do **not** include it — so clicking the demo button from those pages does nothing.

**Fix:** Build a dedicated **`/demo`** route.

- New file: `src/app/demo/page.tsx`
- Content: short hero ("Book a demo with the founders. 30 minutes, no slides."), Cal.com embed (or placeholder if no account yet), email fallback form (reuse the existing `Waitlist` component in compact mode), founder names + "we respond within 24 hours" microcopy.
- Update every `href="#request-access"` site-wide to `href="/demo"`. Locations:
  - `src/components/nav/mega-nav.tsx:188, 433`
  - `src/components/nav.tsx:30`
  - `src/components/hero.tsx:43` (legacy hero)
  - `src/components/lab.tsx:82`
  - `src/app/page.tsx:197, 1010`
  - `src/app/compare/[slug]/page.tsx:70, 217`
  - `src/app/today/page.tsx:141`
  - `src/app/hiring/page.tsx:63`
  - `src/app/people/page.tsx:110`
- Keep the existing bottom-of-page `<RequestAccessSection />` on the homepage and other long pages — it's a soft secondary CTA (email capture, not booking).

## 6. Hero copy (homepage)

`src/app/page.tsx` hero block.

- Eyebrow: `THE AI HR DEPARTMENT` (unchanged)
- H1: `Your HR team, automated.` (unchanged)
- **Subhead (new):**
  > MambaHR is the AI HR department. Hiring, payroll, leave, performance, compliance — the agents do the work. **You sign off when it matters.**
- Bullets:
  - `14 specialist agents. Zero callouts.`
  - `Federal + 50 state employment law, cited on every action.`
  - `Replaces an HR team of 4. Keeps your CHRO in the loop.`
- **Microcopy (new):**
  > Live demo in 30 minutes · Switch from any HRIS within 1 day · Founders respond within 24 hours

## 7. "From kickoff to autopilot" section — make it pop

`src/app/page.tsx:341–422`. Replace the eyebrow/H2/subhead block.

- Eyebrow: `HOW IT WORKS` (unchanged)
- **H2 (new):** `From kickoff to autopilot, in under a week.`
- **Numbered stanza (new, replaces single-sentence subhead):** Three rows, big serif numerals on the left, plain-English benefit on the right.

  ```
  1   day to switch from any HRIS.
  1   screen to set policy.
  0   callouts after that.
  ```

- Body line under stanza: `After that, the agent runs your HR department.`
- Step 01 heading: `Migrate from your old HRIS.` → `Switch from your old HRIS.`
- Step 01 caption: `Most teams cut over end-of-day Friday. Live Monday morning.` → `Most teams switch end-of-day Friday. Live Monday morning.`

## 8. MAMBA values on About

`src/app/about/page.tsx:11–27` — replace the `principles` array (currently 3 items) with the 5 MAMBA values.

- Section H2: `Three principles we don't bend.` → **`Five things we don't bend.`**
- Layout: vertical stack. Each row is a grid: huge serif letter (left, ~120pt) | bold one-line value (right, top) | body paragraph (right, below).
- Values:

  **M — Make our customers unstoppable.**
  We build for outcomes, not features. Every workflow, every decision, every release should give our customers more speed, clarity, and control. If it doesn't help them win in real moments, it doesn't ship.

  **A — All in on the details.**
  We're obsessed with the craft. The small things matter because they compound into big outcomes. We simplify relentlessly, remove friction, and sweat the details so the product feels fast, clear, and effortless to use.

  **M — Move with urgency.**
  Speed is a feature. We don't let things sit, we don't overthink, and we don't wait for perfect. We ship, learn, and improve quickly because progress beats perfection every time.

  **B — Be real.**
  No fluff. No hiding. We say what needs to be said, even when it's uncomfortable. We communicate directly, solve problems faster, and operate with honesty inside and outside the company.

  **A — Act as one.**
  No silos. No passengers. We step in, back each other up, and take shared ownership of outcomes. We win together and we lose together.

## 9. CTAs — section-tail cards + sticky scroll button

**Section-tail CTAs (new component):** A simple two-line card placed at the end of each major homepage section. One sentence of context + one button to `/demo`. Apply to:
- end of "How it works" → `See your migration plan in 30 minutes.`
- end of "The AI workforce" (14 specialists) → `Meet your agents. 30 minutes, no slides.`
- end of "The compliance engine" → `Talk to the founders about your state coverage.`
- end of "Where it lives" → `See it in Slack, Teams, or the web app.`
- end of "Built for every stage" → `Tell us your headcount. We'll size the agent.`

**Sticky scroll button (new component):** Bottom-right floating pill button, appears after the hero scrolls out of view, dismissible (close X). Calendar icon + "Book a demo". Hidden on `/demo` itself.

## 10. Routing log — drop "LIVE"

Locations to edit:
- `src/components/sections/agent-pipeline.tsx:38` — `LIVE · 9:14 AM · routing 47 actions/min` → `9:14 AM · 47 actions routed`
- `src/components/surfaces/routing-log.tsx:46` — `ROUTING LOG · LIVE` → `ACTIVITY · 9:14 AM`
- `src/components/surfaces/routing-log.tsx:102` — keep "routing 47 actions/min · 14 specialist agents online" but drop the green pulse dot OR keep dot but remove "live" framing in surrounding copy
- `src/components/nav/mega-nav.tsx:352` — keep `routing 47 actions/min` (no "LIVE" here today)

Also rename the visual surface name where it's user-facing: "Routing log" → "Activity" in any heading text.

## 11. Founder section — drop from homepage

`src/app/page.tsx:118–121` (Lorem ipsum bios) and the entire `BUILT BY` section that renders them (`src/app/page.tsx:1035–1078`). About page keeps its proper founder block. Reduces homepage scroll length and removes broken placeholder content.

---

## What is NOT changing

- H1 ("Your HR team, automated.") — stays
- Hero bullets and value props — stay (just minor word swaps)
- Problem stats section — untouched
- Compare pages — only the demo-CTA href changes
- Today / Mamba / Security / People / Hiring page structures — only copy + jargon swaps
- Pricing page structure — only FAQ timeline fix + demo-CTA href change
- Visual design system (colors, fonts, spacing) — unchanged

---

## 12. Interactive "Watch the agent work" scenarios section (NEW)

**Why:** Harvey.ai/agents and foaster.ai/how-it-works both prove that auto-playing scripted workflows convert better than static screenshots — especially for non-technical buyers who need to *see* the speed, not read about it. We already have animation primitives from the recent "cinematic mockup animations" commit; this section reuses them at a bigger scale.

**Placement:** Between the "How it works" section (numbered stanza) and "The AI workforce" (14 specialists). Narrative flow: Problem → How fast setup is → What daily life looks like (NEW) → Meet the 14 agents → ...

**UI:**
- Section eyebrow: `WATCH THE AGENT WORK`
- H2: `Pick a moment. See it handled in seconds.`
- Subhead: `These are real workflows the agent runs every day. Click a scenario.`
- Below: a horizontally-scrollable chip row (8 chips) that wraps to 2 rows on desktop and stays horizontal-scroll on mobile. Active chip is filled gold; inactive are outlined.
- Center: a framed "device" (subtle rounded rect with a title bar) where the scripted animation plays. Auto-loops the active scenario, then advances to the next every ~15 seconds (unless user clicks a chip — that resets).
- Controls: `▶ Replay` and `⏸ Pause` in bottom-left of the frame; timer in bottom-right.

**Scenarios to script (all 8):**

| # | Chip label | What plays (10–15 sec each) |
|---|---|---|
| 1 | Parental leave | Slack DM from Maria → leave.agent thinks → reads policy → checks tenure/hours → cites FMLA + CA CFRA → posts approval card → you click Approve → posts confirmation in Slack |
| 2 | Onboarding | Candidate accepts in ATS → hiring.agent generates offer letter → I-9 filed → laptop ordered → Google/Slack/GitHub accounts provisioned → onboarding buddy assigned → calendar invites sent. Multi-stream parallel animation. |
| 3 | Termination | Manager flags performance → termination.agent drafts separation packet, calculates final pay, drafts state-compliant notice — then posts an **Always you** card. Card sits with `[Awaiting your sign-off]` until you click. |
| 4 | Compliance Q&A | Head of People types in Slack: "What's our PTO accrual in TX vs CA?" → compliance.agent responds in 3 seconds with a side-by-side answer, two regulatory citations (TX Labor §61.001, CA Labor §227.3), and a "want me to update the policy doc?" follow-up |
| 5 | Payroll Friday | 9:00 AM banner → payroll.agent runs reconciliation → 247 employees processed → 1 anomaly flagged ("Tom R. — overtime exceeds last month by 38%") → posts approval card → you approve → "Payroll filed. ACH initiated. Done in 4 minutes." |
| 6 | Comp adjustment | Manager: "Can we promote Alex to senior, $145K?" → comp.agent pulls market data (Levels.fyi, Radford), checks band rules, flags that it stacks with last cycle → posts a `[Needs your sign-off]` card with rationale |
| 7 | Annual reviews | Calendar trigger: review season → review.agent ingests 47 employees' goals + peer feedback → drafts review summaries → flags 3 outliers needing manager attention → posts a Today queue with drafts |
| 8 | Multi-state coverage | Animated US map ticks through 50 states being checked for a multi-state team's new PTO policy → state-by-state results: 47 ✓, 3 with caveats (NY paid leave overlap, MA earned sick time, CA accrual cap) → cited and ready for review |

**Engineering plan:**
- New component: `src/components/sections/scenario-player.tsx` — manages active scenario, tab state, timer, looping.
- New folder: `src/components/scenarios/` with one file per scenario script (`leave.tsx`, `onboarding.tsx`, ..., `multi-state.tsx`). Each exports a `Scenario` object: `{ label, durationMs, render: (progress) => ReactNode }`.
- Reuse existing animation primitives (typing effect from slack-thread, staggered reveals from routing-log, streaming text already in `agent-pipeline`).
- Animation driver: a single `useEffect` + `requestAnimationFrame` loop on the player that maps elapsed time → step index → React state. Pause/replay just controls the time pointer.
- Mobile: tabs become a horizontal-scroll chip strip with `scroll-snap-x`; the device frame scales down.
- Performance: only the active scenario's tree is mounted; inactive scenarios are torn down. Prevents 8 concurrent animation loops.
- Reduced-motion: respect `prefers-reduced-motion` — fall back to static first-frame + a "▶ Play" button.

**Phase-able:** If we need to ship sooner, start with scenarios 1, 2, 3, 4 (Leave, Onboarding, Termination, Compliance Q&A). Add 5–8 in a follow-up — the framework supports it without code changes, only new scenario script files.

---

## Open questions

None. All decisions validated in brainstorm.

## Risks / things to watch

1. **Cal.com account.** If you don't have one set up, the `/demo` page launches with email fallback only. We can add the embed later.
2. **"Zero callouts" is asserted twice** (hero bullets + new stanza). Different phrasing each time so it reads as reinforcement, not duplication.
3. **The routing log loses some immediacy** without "LIVE". The product still looks alive (timestamps, action counts, agent names) — just no real-time pulse claim.
4. **MAMBA values are long.** Five blocks of body copy is a lot. If About starts feeling heavy, we can shrink the body paragraphs to one sentence each — still keep the letter + headline.
