# Landing Page Feedback v2 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the full set of decisions in `docs/plans/2026-05-12-landing-feedback-v2-design.md` to the live site — jargon stripped, demo CTA fixed, MAMBA values added, scenarios player built.

**Architecture:** Phased rollout. Phases 1–6 are copy/config/component edits that ship value fast. Phase 7 is the bigger interactive scenarios section. Every task ends in a commit so we can pause/abandon between phases. No tests added (project has none); verification is `npm run dev` + visual inspection + `npm run lint`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, `framer-motion` (already installed).

**Design source of truth:** `docs/plans/2026-05-12-landing-feedback-v2-design.md`

---

## Pre-flight (do once)

**Step 1: Confirm dev server boots clean**

Run: `npm run dev`
Expected: Next builds, opens on http://localhost:3000, no errors in terminal.
Stop the server with Ctrl-C before continuing.

**Step 2: Confirm lint passes today**

Run: `npm run lint`
Expected: 0 errors. (Warnings OK.) If any errors exist, stop and fix them first — we need a clean baseline.

---

# Phase 1 — Quick copy + config wins (low risk, high relief)

These are find-and-replace style edits. Each one is a separate commit so any regression is bisectable.

## Task 1: Fix FAQ timeline contradiction (homepage)

**Files:**
- Modify: `src/app/page.tsx:113`

**Step 1: Replace the FAQ entry**

Find this line in `src/app/page.tsx:113`:
```ts
{ q: 'How long does setup take?', a: 'Most teams are running in 2–3 days. Day 1 connect, day 2 shadow mode (agent suggests, you approve everything), day 3+ live mode in one function. Full deployment in weeks 4–8.' },
```

Replace with:
```ts
{ q: 'How long does setup take?', a: 'Most teams are running by end of day Friday and live Monday morning. Day 1: we pull your data from your old HRIS and you set policy on one screen. Day 2: the agent goes live. Some teams choose to start with one function (like leave) and add others over the first week — that\'s a trust pace, not a setup limitation.' },
```

**Step 2: Verify**

Run: `npm run lint` — expect 0 errors.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: kill misleading 4–8 week deployment claim in homepage FAQ"
```

## Task 2: Fix FAQ timeline contradiction (pricing page)

**Files:**
- Modify: `src/app/pricing/page.tsx:90`

**Step 1: Replace the FAQ entry**

Find:
```ts
{ q: 'Can we start in one HR function?', a: 'Yes. Most teams start with Leave and then add Hiring and Compliance. Full deployment typically happens in weeks 4–8.' },
```

Replace with:
```ts
{ q: 'Can we start in one HR function?', a: 'Yes. Most teams start with Leave and then add Hiring and Compliance — typically expanding over the first week. The full system is technically set up in 1–2 days; the rollout pace is your call.' },
```

**Step 2: Lint + commit**

```bash
npm run lint
git add src/app/pricing/page.tsx
git commit -m "fix: align pricing FAQ with 1–2 day setup truth"
```

## Task 3: Rewrite homepage hero subhead + microcopy

**Files:**
- Modify: `src/app/page.tsx:181` (subhead) and `src/app/page.tsx:206` (microcopy)

**Step 1: Replace the subhead**

Find `src/app/page.tsx:172-182`:
```tsx
<p
  style={{
    fontSize: 19,
    color: 'var(--text-muted)',
    lineHeight: 1.65,
    maxWidth: 480,
    marginBottom: 32,
  }}
>
  MambaHR is the AI HR department. Hiring, payroll, leave, performance, compliance — handled by agents. <strong style={{ color: 'var(--text)' }}>One human approves the calls that matter.</strong>
</p>
```

Replace the inner content (keep the `<p>` styling identical) with:
```tsx
  MambaHR is the AI HR department. Hiring, payroll, leave, performance, compliance — the agents do the work. <strong style={{ color: 'var(--text)' }}>You sign off when it matters.</strong>
```

**Step 2: Replace the microcopy line**

Find `src/app/page.tsx:205-207`:
```tsx
<p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
  Live demo in 30 minutes · Cuts over from any HRIS in a day · Founders respond within&nbsp;24&nbsp;hours
</p>
```

Replace the inner text with:
```tsx
  Live demo in 30 minutes · Switch from any HRIS within 1 day · Founders respond within&nbsp;24&nbsp;hours
```

**Step 3: Run dev server + eyeball**

Run: `npm run dev` and visit http://localhost:3000. The hero should show "You sign off when it matters." (bolded) and the "Switch from any HRIS within 1 day" microcopy. Stop the server.

**Step 4: Commit**

```bash
npm run lint
git add src/app/page.tsx
git commit -m "design: humanize hero subhead + microcopy"
```

## Task 4: Rewrite the heroValueProps bullet

**Files:**
- Modify: `src/app/page.tsx:45`

**Step 1: Find and replace**

Find the line in `src/app/page.tsx`:
```ts
'14 specialist agents. One orchestrator. Zero callouts.',
```

Replace with:
```ts
'14 specialist agents. Zero callouts.',
```

**Step 2: Commit**

```bash
npm run lint
git add src/app/page.tsx
git commit -m "copy: drop 'orchestrator' from hero bullets — too technical for HR buyer"
```

## Task 5: Rewrite "How It Works" section header + add numbered stanza

**Files:**
- Modify: `src/app/page.tsx:341-422`

**Step 1: Replace the section intro block**

Find `src/app/page.tsx:343-361` (the centered header inside the HOW IT WORKS section):
```tsx
<div style={{ textAlign: 'center', marginBottom: 80, maxWidth: 720, margin: '0 auto 80px' }}>
  <p className="eyebrow" style={{ marginBottom: 16 }}>HOW IT WORKS</p>
  <h2
    style={{
      fontFamily: 'var(--font-serif), Georgia, serif',
      fontSize: 'clamp(32px, 4vw, 52px)',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      color: 'var(--text)',
      marginBottom: 16,
      lineHeight: 1.1,
    }}
  >
    From kickoff to autopilot in a week.
  </h2>
  <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
    One day to migrate. One screen to set policy. After that, the agent runs your HR department.
  </p>
</div>
```

Replace with:
```tsx
<div style={{ textAlign: 'center', marginBottom: 80, maxWidth: 760, margin: '0 auto 80px' }}>
  <p className="eyebrow" style={{ marginBottom: 16 }}>HOW IT WORKS</p>
  <h2
    style={{
      fontFamily: 'var(--font-serif), Georgia, serif',
      fontSize: 'clamp(32px, 4vw, 52px)',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      color: 'var(--text)',
      marginBottom: 40,
      lineHeight: 1.1,
    }}
  >
    From kickoff to autopilot, in under a week.
  </h2>

  {/* Numbered stanza — 1 · 1 · 0 */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      columnGap: 28,
      rowGap: 18,
      maxWidth: 560,
      margin: '0 auto 32px',
      textAlign: 'left',
    }}
  >
    {[
      { n: '1', label: 'day to switch from any HRIS.' },
      { n: '1', label: 'screen to set your policy.' },
      { n: '0', label: 'callouts after that.' },
    ].map((row, i) => (
      <div key={i} style={{ display: 'contents' }}>
        <span
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(64px, 7vw, 96px)',
            fontWeight: 400,
            color: 'var(--gold-dark)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            alignSelf: 'center',
          }}
        >
          {row.n}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            color: 'var(--text)',
            lineHeight: 1.3,
            alignSelf: 'center',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          {row.label}
        </span>
      </div>
    ))}
  </div>

  <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
    After that, the agent runs your HR department.
  </p>
</div>
```

**Step 2: Rewrite Step 01 heading + caption**

Find `src/app/page.tsx:367-375` (inside Step 1):
```tsx
<h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
  Migrate from your old HRIS.
</h3>
<p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
  Move off Gusto, Workday, Rippling, BambooHR, Namely, Personio — whatever you have. We pull employees, comp records, org chart, leave balances, performance history, and documents. One click. Zero data loss.
</p>
<p style={{ fontSize: 13, color: 'var(--text-faint)', fontStyle: 'italic' }}>
  Most teams cut over end-of-day Friday. Live Monday morning.
</p>
```

Replace the **headline text** "Migrate from your old HRIS." with "Switch from your old HRIS." and the **caption** "Most teams cut over end-of-day Friday. Live Monday morning." with "Most teams switch end-of-day Friday. Live Monday morning." Leave the JSX and styling alone.

**Step 3: Verify visually**

Run: `npm run dev`. Visit http://localhost:3000. Scroll to "How It Works". Confirm:
- H2 reads "From kickoff to autopilot, in under a week."
- A 3-row numbered stanza shows below it: huge serif `1`, `1`, `0` on the left, sentences on the right.
- Step 01 headline reads "Switch from your old HRIS." with "Most teams switch end-of-day Friday" caption.
Stop dev server.

**Step 4: Commit**

```bash
npm run lint
git add src/app/page.tsx
git commit -m "design: numbered '1·1·0' stanza in How It Works + drop 'migrate'/'cut over'"
```

## Task 6: Drop "LIVE" badges from routing log + agent pipeline

**Files:**
- Modify: `src/components/sections/agent-pipeline.tsx:38`
- Modify: `src/components/surfaces/routing-log.tsx:46`

**Step 1: Read both files first**

Run: `Read` on `src/components/sections/agent-pipeline.tsx` lines 30-50, and `src/components/surfaces/routing-log.tsx` lines 40-110.

**Step 2: Edit agent-pipeline.tsx**

In `src/components/sections/agent-pipeline.tsx`, find the line that contains `LIVE · 9:14 AM · routing 47 actions/min` and replace `LIVE · 9:14 AM · routing 47 actions/min` with `9:14 AM · 47 actions routed` (keep all surrounding JSX/styling intact). Also remove any adjacent pulsing green dot indicator if present (`<span ... background: '#22C55E' ...` styled as a pulse element near this text) — keep the dot static (no pulse animation class).

**Step 3: Edit routing-log.tsx**

In `src/components/surfaces/routing-log.tsx`:
- Find `ROUTING LOG · LIVE` at line 46 and replace with `ACTIVITY · 9:14 AM`.
- Find the line near 102 that says `routing 47 actions/min · 14 specialist agents online`. Leave the text alone but remove the green pulsing dot's animation class (just make it a static `#22C55E` circle).

**Step 4: Search for any remaining "LIVE" telemetry**

Run:
```bash
grep -rn "LIVE\|· LIVE" src/components/ src/app/ | grep -v "Live demo\|live Monday\|going live\|live\."
```
Expected: no results (other than the literal "Live demo" microcopy on the hero, which is intentional and stays).

**Step 5: Verify visually**

Run `npm run dev`. Check the homepage and the `/mamba` route — the routing log mockup should now show "ACTIVITY · 9:14 AM" instead of "ROUTING LOG · LIVE", and the agent pipeline section's top bar should not show "LIVE". Stop dev server.

**Step 6: Commit**

```bash
npm run lint
git add src/components/sections/agent-pipeline.tsx src/components/surfaces/routing-log.tsx
git commit -m "copy: drop 'LIVE' from routing log + agent pipeline — we're not live yet"
```

## Task 7: Delete homepage founder section (Lorem Ipsum bios)

**Files:**
- Modify: `src/app/page.tsx` (delete the `founders` array + "BUILT BY" section + its `<section>` wrapper)

**Step 1: Read the affected range**

Run: `Read` on `src/app/page.tsx` lines 118-125 (the `founders` array) and lines 1035-1080 (the `BUILT BY` section).

**Step 2: Delete the `founders` array**

Remove `src/app/page.tsx:118-121` (the `const founders = [ ... ]` declaration and its two `Lorem ipsum` entries). If the lines extend slightly past 121, take everything through the closing `]` of the array.

**Step 3: Delete the BUILT BY section**

Find the section starting at `src/app/page.tsx:1035` (`<section ...>` preceded by the `BUILT BY` eyebrow inside) and remove the entire `<section>...</section>` block including its closing tag (~line 1078). Be careful to keep the section immediately above and the section immediately below intact.

**Step 4: Verify no stale imports**

After deleting, check if any imports at the top of `src/app/page.tsx` are now unused (e.g., `AVATAR` helper if it was only used by the founder array). Remove unused imports.

Run: `npm run lint` — expect 0 errors, no "unused variable" warnings related to founders.

**Step 5: Visual check**

Run `npm run dev`. Scroll to the bottom of the homepage. The "BUILT BY" section with founder cards should be gone. The page now goes from pricing → FAQ → request access → footer.

**Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: remove homepage founder section with Lorem Ipsum bios (About has real version)"
```

---

# Phase 2 — Decision Card cleanup (drop CUQ + L1–L5)

Decision Cards across mockups currently show `CUQ 0.88 · L2`. Replace with one human label.

## Task 8: Update `TodayCard` component contract

**Files:**
- Modify: `src/components/surfaces/today-card.tsx`

**Step 1: Replace types**

Open `src/components/surfaces/today-card.tsx` (you already read it during brainstorm). Replace the file's `RiskLevel`, `Decision`, `TodayCardProps`, and `riskColors` declarations with the following new shape:

```tsx
type Status = 'auto' | 'sign-off' | 'always-you'

type TodayCardProps = {
  title: string
  subtitle: string
  rationale: string
  status: Status
  time: string
  agent: string
  urgent?: boolean
}

const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
  'auto':        { bg: '#F0FDF4', text: '#15803D', label: 'Auto-approved' },
  'sign-off':    { bg: '#FFF7ED', text: '#C2410C', label: 'Needs your sign-off' },
  'always-you':  { bg: '#FEF2F2', text: '#B91C1C', label: 'Always you' },
}
```

**Step 2: Replace the component body**

In the component, remove the `risk` lookup. Replace the entire "Meta row" block (currently shows two pill badges for `riskLevel` and `CUQ {cuq.toFixed(2)}`) with a single status pill:

```tsx
{/* Meta row */}
<div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
  <span
    style={{
      background: statusStyles[status].bg,
      color: statusStyles[status].text,
      borderRadius: 4,
      padding: '2px 10px',
      fontSize: 11,
      fontWeight: 600,
    }}
  >
    {statusStyles[status].label}
  </span>
  <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>{time}</span>
</div>
```

Then update the Actions block at the bottom to use `status` instead of `decision`:
- `status === 'sign-off'` shows the Approve/Decline buttons (the existing `decision === 'hil'` branch).
- `status === 'always-you'` shows the same Approve/Decline buttons (always-you also requires human action).
- `status === 'auto'` shows the "Auto-resolved by {agent}" footer (the existing `decision === 'auto'` branch).

Update the `decision === 'hil'` check to `(status === 'sign-off' || status === 'always-you')` and the `decision === 'auto'` check to `status === 'auto'`.

Update the function signature to destructure `{ title, subtitle, rationale, status, time, agent, urgent }` (drop `riskLevel`, `cuq`, `decision`).

**Step 3: Lint**

Run: `npm run lint`. Expect errors in every file that uses `TodayCard` with old props. That's correct — we'll fix those next.

**Step 4: Commit (will be combined with consumer updates)**

DO NOT commit yet. Continue to Task 9.

## Task 9: Update all `TodayCard` consumers

**Files:**
- Modify: `src/app/page.tsx` (the `todayCards` array near line 26–65)
- Modify: `src/app/today/page.tsx` (the `todayCards` array near lines 18–69 + the inline `<TodayCard cuq={0.88} ... />` at line 206)

**Step 1: Update homepage `todayCards` data**

In `src/app/page.tsx`, find the `todayCards` array (around line 18). For each card, replace `riskLevel: 'L1' | 'L2' ...`, `cuq: 0.XX`, and `decision: 'auto' | 'hil'` with a single `status: 'auto' | 'sign-off' | 'always-you'` field. Mapping rule:
- Old `decision: 'auto'` → new `status: 'auto'`
- Old `decision: 'hil'` with `riskLevel` L1–L3 → new `status: 'sign-off'`
- Old `decision: 'hil'` with `riskLevel` L4–L5 → new `status: 'always-you'`

(If no L4/L5 exists in the homepage array, all `hil` become `sign-off`.)

**Step 2: Update Today page `todayCards` data**

In `src/app/today/page.tsx`, do the same transformation on the `todayCards` array (lines 18–69).

**Step 3: Update the inline `<TodayCard cuq={0.88} ... />` on Today page**

`src/app/today/page.tsx:206` has an inline JSX usage with `cuq={0.88}`. Remove the `cuq`, `riskLevel`, `decision` props and replace with the single `status` prop matching the same mapping rule.

**Step 4: Update the "CUQ score" explainer rows on Today page**

`src/app/today/page.tsx:218` and `:239` both contain explainer rows like `{ num: '04', title: 'CUQ score', desc: '...' }`. Delete those rows entirely (drop step 4 of the explainer; renumber if necessary). If the "Risk class and CUQ" label appears at line 109, change it to `Status label` and update its `desc` to `One of: Auto-approved, Needs your sign-off, Always you.`

**Step 5: Drop CUQ from `mega-nav.tsx`**

`src/components/nav/mega-nav.tsx:342` has an inline `CUQ 0.88` pill. Replace the pill text with `Needs sign-off` (no number, no CUQ). Keep the surrounding styling.

**Step 6: Drop CUQ mention from `nav.ts`**

`src/content/nav.ts:182` says `... rationale, evidence, risk class, CUQ score — and you approve or decline.` Change to: `... rationale, evidence, who decides — and you approve or decline.`

**Step 7: Drop CUQ from security page activity row**

`src/app/security/page.tsx:89` has `detail: 'auto-resolved · CUQ 0.97'`. Change to `detail: 'auto-resolved'`.

**Step 8: Drop CUQ from agent-pipeline trailing detail**

`src/components/sections/agent-pipeline.tsx:173` shows `CUQ 0.97 · L2 · resolved 9:14:04`. Change to `resolved 9:14:04` (drop the CUQ and L2 prefix).

**Step 9: Run dev server, click around, confirm Decision Cards render correctly**

Run: `npm run dev`. Visit `/`, `/today`, `/security`, `/mamba`. Decision Cards should now show ONE pill (Auto-approved / Needs your sign-off / Always you), no CUQ, no L1–L5. The mega-nav dropdown card should show "Needs sign-off". Stop dev server.

**Step 10: Lint + commit**

```bash
npm run lint
git add src/components/surfaces/today-card.tsx src/app/page.tsx src/app/today/page.tsx src/components/nav/mega-nav.tsx src/content/nav.ts src/app/security/page.tsx src/components/sections/agent-pipeline.tsx
git commit -m "design: drop CUQ + L1–L5 jargon from Decision Cards; replace with human status labels"
```

---

# Phase 3 — Demo route + sticky CTA + section-tail CTA component

## Task 10: Build `/demo` route

**Files:**
- Create: `src/app/demo/page.tsx`
- Create: `src/app/demo/layout.tsx` (for metadata)

**Step 1: Create the layout file**

Create `src/app/demo/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a demo — MambaHR',
  description: 'See MambaHR in action. 30-minute walkthrough with the founders. No slides, no sales team.',
  openGraph: {
    title: 'Book a demo — MambaHR',
    description: 'See MambaHR in action. 30-minute walkthrough with the founders.',
    url: 'https://mambahr.com/demo',
  },
  alternates: { canonical: 'https://mambahr.com/demo' },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

**Step 2: Create the page**

Create `src/app/demo/page.tsx`:

```tsx
import MegaNav from '@/components/nav/mega-nav'
import Footer from '@/components/footer'
import { Waitlist } from '@/components/waitlist'

export default function DemoPage() {
  return (
    <>
      <MegaNav />
      <main>
        <section style={{ background: 'var(--bg-warm)', paddingTop: 140, paddingBottom: 80 }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 20 }}>BOOK A DEMO</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(40px, 5.5vw, 68px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.05,
              }}
            >
              See it work in 30 minutes.
            </h1>
            <p style={{ fontSize: 19, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 12px' }}>
              No slides. No sales gauntlet. The founders walk you through the product live, answer your questions, and show you what setup would look like for your team.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-faint)' }}>
              Brian Bell · Sebastian Kirsch · We respond within 24 hours.
            </p>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: '80px 24px 120px' }}>
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              background: 'var(--bg-warm)',
              borderRadius: 16,
              border: '1px solid var(--border)',
              padding: '40px 32px',
            }}
          >
            {/* Calendar placeholder — drop a Cal.com or Calendly embed here when account is ready. */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px dashed var(--border)',
                borderRadius: 12,
                padding: '48px 24px',
                textAlign: 'center',
                marginBottom: 32,
              }}
            >
              <p style={{ fontSize: 14, color: 'var(--text-faint)', marginBottom: 8, letterSpacing: '0.04em', fontWeight: 600 }}>CALENDAR</p>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Calendar embed coming soon. For now, leave your email below and we&apos;ll send time slots within a day.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28 }}>
              <p style={{ fontSize: 13, color: 'var(--text-faint)', textAlign: 'center', marginBottom: 16, letterSpacing: '0.04em', fontWeight: 600 }}>OR EMAIL US</p>
              <Waitlist compact />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

**Step 3: Verify**

Run: `npm run dev`. Visit http://localhost:3000/demo. You should see the new page with hero + calendar placeholder + email form. Stop dev server.

**Step 4: Commit**

```bash
npm run lint
git add src/app/demo/layout.tsx src/app/demo/page.tsx
git commit -m "feat: add /demo route with calendar placeholder + email fallback"
```

## Task 11: Rewire all `#request-access` links to `/demo`

**Files:** 10+ locations — use a single targeted find-and-replace per file.

**Step 1: List every usage**

Run:
```bash
grep -rn '#request-access' src/
```
You should see hits in: `src/app/page.tsx` (2 hits), `src/app/compare/[slug]/page.tsx` (2 hits), `src/app/today/page.tsx`, `src/app/hiring/page.tsx`, `src/app/people/page.tsx`, `src/components/nav.tsx`, `src/components/hero.tsx`, `src/components/lab.tsx`, `src/components/nav/mega-nav.tsx` (2 hits).

**Step 2: Replace in each file**

For each file in the list, replace `href="#request-access"` (or the `<Link href="#request-access" ...>` form) with `href="/demo"`. For Next.js `<Link>` components, keep the `<Link>` (it's fine for internal routes). For `<a>` tags, keep the `<a>` tag (no need to switch to `<Link>` here).

**Important:** there is ONE exception — `src/app/page.tsx:1010` reads `href={tier.name === 'Enterprise' ? '#request-access' : '/pricing'}`. Change the `'#request-access'` to `'/demo'`.

**Step 3: Verify no stragglers**

Run:
```bash
grep -rn '#request-access' src/
```
Expected: 0 matches in source code. The string still appears in `src/components/waitlist.tsx` (as the section's `id=`) and `src/app/globals.css` (as a CSS selector) — those stay; they're targeting the in-page form section on pages that still embed it. We just no longer link to it from buttons.

**Step 4: Verify navigation works**

Run `npm run dev`. From `/`, `/about`, `/pricing`, `/today`, `/security`, click any "Get a demo" button. Each one should navigate to `/demo`. Stop dev server.

**Step 5: Commit**

```bash
npm run lint
git add src/
git commit -m "fix: route all 'Get a demo' CTAs to /demo (anchor was broken on About/Pricing/Investors/Research)"
```

## Task 12: Build `<SectionCta>` component

**Files:**
- Create: `src/components/section-cta.tsx`

**Step 1: Create the component**

Create `src/components/section-cta.tsx`:

```tsx
import Link from 'next/link'

type Props = {
  headline: string
  buttonLabel?: string
  href?: string
}

export default function SectionCta({ headline, buttonLabel = 'Book a demo →', href = '/demo' }: Props) {
  return (
    <div
      style={{
        marginTop: 64,
        padding: '28px 32px',
        background: 'var(--bg-warm)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
        maxWidth: 920,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontSize: 'clamp(18px, 1.8vw, 22px)',
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          margin: 0,
          flex: 1,
          minWidth: 220,
        }}
      >
        {headline}
      </p>
      <Link href={href} className="btn-gold" style={{ flexShrink: 0 }}>
        {buttonLabel}
      </Link>
    </div>
  )
}
```

**Step 2: Verify it imports**

Run: `npm run lint`. Expect 0 errors.

**Step 3: Commit**

```bash
git add src/components/section-cta.tsx
git commit -m "feat: SectionCta component for section-tail CTAs"
```

## Task 13: Wire `<SectionCta>` into homepage sections

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Import the component**

At the top of `src/app/page.tsx`, with the other component imports, add:

```tsx
import SectionCta from '@/components/section-cta'
```

**Step 2: Insert section-tail CTAs**

Place a `<SectionCta />` just BEFORE the closing `</section>` of each of the following sections. Use these exact headlines:

1. **End of "How It Works"** (closing `</section>` around line 422):
   ```tsx
   <SectionCta headline="See your migration plan in 30 minutes." />
   ```

2. **End of "The AI Workforce"** (closing `</section>` around line 456):
   ```tsx
   <SectionCta headline="Meet your agents. 30 minutes, no slides." />
   ```

3. **End of "The Compliance Engine"** (closing `</section>` around line 580):
   ```tsx
   <SectionCta headline="Talk to the founders about your state coverage." />
   ```

4. **End of "Where it lives"** (closing `</section>` around line 772):
   ```tsx
   <SectionCta headline="See it in Slack, Teams, or the web app." />
   ```

5. **End of "Built for every stage"** (closing `</section>` around line 873):
   ```tsx
   <SectionCta headline="Tell us your headcount. We'll size the agent." />
   ```

Each `<SectionCta />` goes INSIDE the section but AFTER the existing content (right before `</section>`). Place each one inside the same `maxWidth` container as the section content if possible; the component handles its own centering up to 920px.

**Step 3: Visual sanity check**

Run `npm run dev`. Scroll the homepage end-to-end. After each major section's content, you should see a tan-background card with a serif sentence + gold "Book a demo →" button. Stop dev server.

**Step 4: Commit**

```bash
npm run lint
git add src/app/page.tsx
git commit -m "feat: add section-tail CTAs after every major homepage section"
```

## Task 14: Build `<StickyDemoButton>` sticky scroll CTA

**Files:**
- Create: `src/components/sticky-demo-button.tsx`
- Modify: `src/app/layout.tsx` (mount the button globally)

**Step 1: Create the sticky button**

Create `src/components/sticky-demo-button.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const HIDDEN_PATHS = ['/demo', '/coming-soon']
const STORAGE_KEY = 'mamba_sticky_demo_dismissed_v1'

export default function StickyDemoButton() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') {
      setDismissed(true)
      return
    }
    const onScroll = () => setVisible(window.scrollY > 720)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed) return null
  if (HIDDEN_PATHS.some((p) => pathname === p || pathname?.startsWith(p + '/'))) return null
  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 22,
        right: 22,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--gold-dark)',
        color: '#FFFFFF',
        padding: '10px 14px 10px 16px',
        borderRadius: 999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        animation: 'mamba-sticky-rise 0.35s ease-out',
      }}
    >
      <Link
        href="/demo"
        style={{
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Book a demo
      </Link>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          window.sessionStorage.setItem(STORAGE_KEY, '1')
          setDismissed(true)
        }}
        style={{
          background: 'rgba(255,255,255,0.18)',
          border: 'none',
          color: '#FFFFFF',
          width: 22,
          height: 22,
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}
```

**Step 2: Add the rise animation to globals.css**

In `src/app/globals.css`, append at the end:

```css
@keyframes mamba-sticky-rise {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Step 3: Mount the button in the layout**

In `src/app/layout.tsx`, import the component and render it inside the `<body>` (after `{children}` is fine):

```tsx
import StickyDemoButton from '@/components/sticky-demo-button'
```

Inside the body JSX, after `{children}`:
```tsx
<StickyDemoButton />
```

**Step 4: Visually verify**

Run `npm run dev`. Open `/`. Scroll past the hero — the gold pill should slide up in the bottom-right. Click the × — it should hide for the session (refresh the tab in a new incognito window if you want to see it again). Navigate to `/demo` — it should not appear. Stop dev server.

**Step 5: Commit**

```bash
npm run lint
git add src/components/sticky-demo-button.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: sticky bottom-right 'Book a demo' button (dismissible, hidden on /demo)"
```

---

# Phase 4 — About page: MAMBA values

## Task 15: Replace About `principles` with MAMBA values + layout

**Files:**
- Modify: `src/app/about/page.tsx`

**Step 1: Read the current principles section**

Run: `Read` on `src/app/about/page.tsx` lines 1–170 so you have the current structure in context.

**Step 2: Replace the `principles` array**

Find `src/app/about/page.tsx:11-27` (`const principles = [...]`). Replace with:

```tsx
const principles = [
  {
    letter: 'M',
    title: 'Make our customers unstoppable.',
    body: "We build for outcomes, not features. Every workflow, every decision, every release should give our customers more speed, clarity, and control. If it doesn't help them win in real moments, it doesn't ship.",
  },
  {
    letter: 'A',
    title: 'All in on the details.',
    body: "We're obsessed with the craft. The small things matter because they compound into big outcomes. We simplify relentlessly, remove friction, and sweat the details so the product feels fast, clear, and effortless to use.",
  },
  {
    letter: 'M',
    title: 'Move with urgency.',
    body: "Speed is a feature. We don't let things sit, we don't overthink, and we don't wait for perfect. We ship, learn, and improve quickly because progress beats perfection every time.",
  },
  {
    letter: 'B',
    title: 'Be real.',
    body: "No fluff. No hiding. We say what needs to be said, even when it's uncomfortable. We communicate directly, solve problems faster, and operate with honesty inside and outside the company.",
  },
  {
    letter: 'A',
    title: 'Act as one.',
    body: "No silos. No passengers. We step in, back each other up, and take shared ownership of outcomes. We win together and we lose together.",
  },
]
```

**Step 3: Replace the section H2 + layout**

Find the `PRINCIPLES` section in the same file (the one starting near line 110 with `{/* ── PRINCIPLES — three named values ── */}`). Replace the entire principles section block (from the comment to its closing `</section>`) with this:

```tsx
{/* ── PRINCIPLES — five MAMBA values, vertical stack ── */}
<section style={{ background: 'var(--bg-warm)', padding: '120px 24px' }}>
  <div style={{ maxWidth: 1040, margin: '0 auto' }}>
    <p className="eyebrow" style={{ marginBottom: 24 }}>WHAT WE BELIEVE</p>
    <h2
      style={{
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontSize: 'clamp(40px, 5vw, 60px)',
        fontWeight: 400,
        letterSpacing: '-0.025em',
        color: 'var(--text)',
        marginBottom: 72,
        lineHeight: 1.05,
        maxWidth: 720,
      }}
    >
      Five things<br />we don&apos;t bend.
    </h2>

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {principles.map((p, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(120px, 160px) 1fr',
            columnGap: 40,
            padding: '40px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: i === principles.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(80px, 9vw, 140px)',
              fontWeight: 400,
              color: 'var(--gold-dark)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              textAlign: 'left',
            }}
          >
            {p.letter}
          </div>
          <div style={{ paddingTop: 12 }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(24px, 2.6vw, 32px)',
                fontWeight: 500,
                letterSpacing: '-0.015em',
                color: 'var(--text)',
                marginBottom: 14,
                lineHeight: 1.2,
              }}
            >
              {p.title}
            </h3>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 640 }}>
              {p.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 4: Mobile pass**

Add a small wrapper rule for mobile in `src/app/globals.css` (append at the bottom):
```css
@media (max-width: 720px) {
  .mamba-values-row { grid-template-columns: 1fr !important; row-gap: 12px; }
}
```
(We're not using a class here yet; the layout above uses inline grid. Skip this step unless you see overflow on mobile during the visual check.)

**Step 5: Visual verify**

Run `npm run dev`. Visit `/about`. Scroll to the principles section. You should see:
- "WHAT WE BELIEVE" eyebrow
- "Five things we don't bend." H2 (two lines)
- 5 rows, each with a giant gold serif letter on the left and the title + body on the right
- The letters spell M-A-M-B-A vertically
Stop dev server.

**Step 6: Commit**

```bash
npm run lint
git add src/app/about/page.tsx src/app/globals.css
git commit -m "design: replace About 3 principles with MAMBA 5 values + vertical-stack layout"
```

---

# Phase 5 — Scenarios player (the big one)

This is the largest single chunk of work. Build the framework first, then add scenarios one at a time. The page will be functional after Task 18 (framework + first scenario); subsequent tasks just add more scenarios.

## Task 16: Build animation primitive — `useScenarioClock`

**Files:**
- Create: `src/components/scenarios/use-scenario-clock.ts`

**Step 1: Create the hook**

```ts
'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  durationMs: number
  paused?: boolean
  onComplete?: () => void
}

export function useScenarioClock({ durationMs, paused, onComplete }: Options) {
  const [elapsedMs, setElapsedMs] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startedAtRef = useRef<number | null>(null)
  const pauseAccumRef = useRef(0)
  const pauseStartedAtRef = useRef<number | null>(null)

  useEffect(() => {
    if (paused) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      if (pauseStartedAtRef.current == null) pauseStartedAtRef.current = performance.now()
      return
    }
    if (pauseStartedAtRef.current != null) {
      pauseAccumRef.current += performance.now() - pauseStartedAtRef.current
      pauseStartedAtRef.current = null
    }
    const tick = (now: number) => {
      if (startedAtRef.current == null) startedAtRef.current = now
      const e = now - startedAtRef.current - pauseAccumRef.current
      if (e >= durationMs) {
        setElapsedMs(durationMs)
        onComplete?.()
        return
      }
      setElapsedMs(e)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [durationMs, paused, onComplete])

  const reset = () => {
    startedAtRef.current = null
    pauseAccumRef.current = 0
    pauseStartedAtRef.current = null
    setElapsedMs(0)
  }

  return { elapsedMs, progress: Math.min(elapsedMs / durationMs, 1), reset }
}
```

**Step 2: Commit**

```bash
npm run lint
git add src/components/scenarios/use-scenario-clock.ts
git commit -m "feat: useScenarioClock — frame-driven elapsed-ms hook with pause support"
```

## Task 17: Build the `<ScenarioPlayer>` shell

**Files:**
- Create: `src/components/scenarios/scenario-player.tsx`
- Create: `src/components/scenarios/types.ts`

**Step 1: Define the shared types**

Create `src/components/scenarios/types.ts`:

```ts
import type { ReactNode } from 'react'

export type Scenario = {
  id: string
  label: string
  durationMs: number
  render: (elapsedMs: number) => ReactNode
}
```

**Step 2: Build the player**

Create `src/components/scenarios/scenario-player.tsx`:

```tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Scenario } from './types'
import { useScenarioClock } from './use-scenario-clock'

type Props = {
  scenarios: Scenario[]
}

export default function ScenarioPlayer({ scenarios }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = scenarios[activeIdx]
  const { elapsedMs, progress, reset } = useScenarioClock({
    durationMs: active.durationMs,
    paused,
    onComplete: useCallback(() => {
      setActiveIdx((i) => (i + 1) % scenarios.length)
    }, [scenarios.length]),
  })

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx])

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Tab chip strip */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 36,
        }}
      >
        {scenarios.map((s, i) => {
          const isActive = i === activeIdx
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: isActive ? '1px solid var(--gold-dark)' : '1px solid var(--border)',
                background: isActive ? 'var(--gold-dark)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Device frame */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: 18,
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
          minHeight: 520,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: '12px 18px',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
          </span>
          <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono), monospace' }}>app.mambahr.com</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono), monospace' }}>{active.label}</span>
        </div>

        {/* Stage */}
        <div style={{ padding: '32px 28px', minHeight: 440 }}>{active.render(elapsedMs)}</div>

        {/* Controls */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 18,
            right: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 11,
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono), monospace',
          }}
        >
          <button
            type="button"
            onClick={reset}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, padding: 0 }}
          >
            ▶ Replay
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, padding: 0 }}
          >
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <div
            style={{
              flex: 1,
              height: 2,
              background: 'rgba(0,0,0,0.06)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div style={{ width: `${progress * 100}%`, height: '100%', background: 'var(--gold-dark)', transition: 'width 0.05s linear' }} />
          </div>
          <span>{Math.ceil((active.durationMs - elapsedMs) / 1000)}s</span>
        </div>
      </div>
    </div>
  )
}
```

**Step 3: Commit**

```bash
npm run lint
git add src/components/scenarios/scenario-player.tsx src/components/scenarios/types.ts
git commit -m "feat: ScenarioPlayer shell — tabs, device frame, controls, progress"
```

## Task 18: Build first scenario — Parental leave

**Files:**
- Create: `src/components/scenarios/leave.tsx`

**Step 1: Create the scenario**

```tsx
'use client'

import type { Scenario } from './types'

const STEPS = [
  { at: 0,    state: 'msg-typing'      as const },
  { at: 1500, state: 'msg-sent'        as const },
  { at: 2200, state: 'agent-thinking'  as const },
  { at: 4000, state: 'agent-cites'     as const },
  { at: 5800, state: 'card-shown'      as const },
  { at: 8400, state: 'approved'        as const },
  { at: 10000, state: 'done'           as const },
]

function getStep(elapsedMs: number) {
  let current = STEPS[0].state
  for (const s of STEPS) {
    if (elapsedMs >= s.at) current = s.state
  }
  return current
}

export const leaveScenario: Scenario = {
  id: 'leave',
  label: 'Parental leave',
  durationMs: 12000,
  render: (elapsedMs) => {
    const step = getStep(elapsedMs)
    return (
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text)' }}>
        <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--text-faint)', fontFamily: 'var(--font-mono), monospace' }}>
          #people-ops · Slack
        </div>

        {/* Maria's message */}
        <Bubble author="Maria K." time="9:13 AM" visible={elapsedMs >= 0}>
          {step === 'msg-typing' ? (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>typing…</span>
          ) : (
            <>Hi! I'm expecting in May — trying to figure out my leave options. We're based in California.</>
          )}
        </Bubble>

        {/* Agent thinking */}
        {elapsedMs >= 2200 && (
          <AgentBlock>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
              <strong style={{ color: 'var(--gold-dark)' }}>leave.agent</strong> is working…
            </div>
            <Thinking step={step} />
          </AgentBlock>
        )}

        {/* Decision card */}
        {elapsedMs >= 5800 && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 16,
              marginTop: 14,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              maxWidth: 460,
              animation: 'mamba-card-in 0.4s ease-out',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ fontSize: 14 }}>Parental leave — Maria K.</strong>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>9:14 AM</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 10 }}>
              Eligible: 14 months tenure, 1,400 hrs. <strong style={{ color: 'var(--text)' }}>12 wks FMLA + 8 wks CA CFRA = up to 20 weeks combined.</strong>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: '#FFF7ED', color: '#C2410C', padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                Needs your sign-off
              </span>
            </div>
            {step !== 'approved' && step !== 'done' ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={btnPrimary}>Approve</button>
                <button style={btnSecondary}>Decline</button>
              </div>
            ) : (
              <p style={{ fontSize: 12, color: '#15803D', fontWeight: 600, margin: 0 }}>✓ Approved by Lisa K. · 9:14:08</p>
            )}
          </div>
        )}

        {/* Confirmation */}
        {step === 'done' && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14, fontStyle: 'italic' }}>
            Maria notified. Calendar blocked. Benefits provider pinged. Done.
          </p>
        )}
      </div>
    )
  },
}

function Bubble({ author, time, visible, children }: { author: string; time: string; visible: boolean; children: React.ReactNode }) {
  if (!visible) return null
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#E5D8C3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 11, color: '#6B5638' }}>
        {author.split(' ').map((s) => s[0]).join('').slice(0, 2)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 2 }}>
          <strong style={{ fontSize: 12, color: 'var(--text)' }}>{author}</strong>
          <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 8 }}>{time}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text)' }}>{children}</p>
      </div>
    </div>
  )
}

function AgentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginLeft: 38, padding: '10px 12px', background: 'var(--bg-warm)', borderLeft: '2px solid var(--gold-dark)', borderRadius: '0 6px 6px 0', marginBottom: 10 }}>
      {children}
    </div>
  )
}

function Thinking({ step }: { step: string }) {
  const lines = [
    { label: 'reading leave policy…', done: step !== 'agent-thinking' },
    { label: 'checking eligibility (tenure, hours)…', done: ['agent-cites', 'card-shown', 'approved', 'done'].includes(step) },
    { label: 'citing FMLA + CA CFRA stacking rule', done: ['card-shown', 'approved', 'done'].includes(step) },
  ]
  return (
    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.7 }}>
      {lines.map((l, i) => (
        <div key={i}>
          <span style={{ color: l.done ? '#15803D' : 'var(--text-faint)' }}>{l.done ? '✓ ' : '· '}</span>
          {l.label}
        </div>
      ))}
    </div>
  )
}

const btnPrimary: React.CSSProperties = { background: '#1C1917', color: '#FFFFFF', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }
const btnSecondary: React.CSSProperties = { background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer' }
```

**Step 2: Add the card animation to globals.css**

Append to `src/app/globals.css`:
```css
@keyframes mamba-card-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Step 3: Commit**

```bash
npm run lint
git add src/components/scenarios/leave.tsx src/app/globals.css
git commit -m "feat: parental leave scenario (first scenario for player)"
```

## Task 19: Wire the scenarios section into the homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Import**

At the top of `src/app/page.tsx`:
```tsx
import ScenarioPlayer from '@/components/scenarios/scenario-player'
import { leaveScenario } from '@/components/scenarios/leave'
```

**Step 2: Insert the section**

Find the closing `</section>` of the "How It Works" section (around line 422, right after the new section-tail CTA from Task 13). Immediately AFTER that closing tag, INSERT a new section:

```tsx
{/* ───────────── WATCH THE AGENT WORK ───────────── */}
<section style={{ background: '#FFFFFF', padding: '120px 24px' }}>
  <div style={{ maxWidth: 1240, margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, margin: '0 auto 56px' }}>
      <p className="eyebrow" style={{ marginBottom: 16 }}>WATCH THE AGENT WORK</p>
      <h2
        style={{
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: 16,
          lineHeight: 1.1,
        }}
      >
        Pick a moment. See it handled in seconds.
      </h2>
      <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Real workflows the agent runs every day. Click a tab.
      </p>
    </div>

    <ScenarioPlayer scenarios={[leaveScenario]} />
  </div>
</section>
```

**Step 3: Visual verify**

Run `npm run dev`. Visit `/`. After "How It Works" you should see the new "WATCH THE AGENT WORK" section with one tab ("Parental leave"), the device frame, and the animation auto-playing. The card should fade in around the 6-second mark. Stop dev server.

**Step 4: Commit**

```bash
npm run lint
git add src/app/page.tsx
git commit -m "feat: wire ScenarioPlayer into homepage (1 scenario live)"
```

## Task 20: Add scenarios 2–8

Each scenario follows the same pattern as `leave.tsx` from Task 18. Build one at a time, test, commit.

**For each scenario below**, create the file, import + add to the player's `scenarios` array in `src/app/page.tsx`, verify the dev server, lint, commit. The scenarios array becomes `[leaveScenario, onboardingScenario, terminationScenario, ...]` etc.

### Task 20a: Onboarding scenario

Create `src/components/scenarios/onboarding.tsx`. Story: candidate accepts → offer letter generated → I-9 filed → laptop ordered → Google + Slack + GitHub accounts provisioned → onboarding buddy assigned → calendar invites sent. Use a 5-row checklist that ticks off in order with timestamps. `durationMs: 11000`. Label: `Onboarding`.

Commit: `feat: onboarding scenario for player`.

### Task 20b: Termination scenario

Create `src/components/scenarios/termination.tsx`. Story: manager flags performance → agent drafts separation packet, calculates final pay, drafts state-compliant notice → posts a card with `Always you` badge that sits with `[Awaiting your sign-off]` until time elapses. `durationMs: 11000`. Label: `Termination`.

Commit: `feat: termination scenario for player`.

### Task 20c: Compliance Q&A scenario

Create `src/components/scenarios/compliance-qa.tsx`. Story: Head of People types in Slack "What's our PTO accrual in TX vs CA?" → compliance.agent responds within 3s with a side-by-side comparison + 2 citations (TX Labor §61.001, CA Labor §227.3) + follow-up offer "want me to update the policy doc?". `durationMs: 9000`. Label: `Compliance Q&A`.

Commit: `feat: compliance Q&A scenario for player`.

### Task 20d: Payroll Friday scenario

Create `src/components/scenarios/payroll.tsx`. Story: 9:00 AM banner → payroll.agent reconciles → 247 employees processed (counter ticks up) → 1 anomaly flagged ("Tom R. — overtime exceeds last month by 38%") → approval card → approve → "Payroll filed. ACH initiated. Done in 4 minutes." `durationMs: 12000`. Label: `Payroll Friday`.

Commit: `feat: payroll Friday scenario for player`.

### Task 20e: Comp adjustment scenario

Create `src/components/scenarios/comp.tsx`. Story: manager asks "Can we promote Alex to senior, $145K?" → comp.agent pulls market data (Levels.fyi, Radford), checks band rules, flags that it stacks with last cycle → posts `Needs your sign-off` card with rationale. `durationMs: 10000`. Label: `Comp adjustment`.

Commit: `feat: comp adjustment scenario for player`.

### Task 20f: Annual reviews scenario

Create `src/components/scenarios/reviews.tsx`. Story: calendar trigger fires "review season" → review.agent ingests 47 employees' goals + peer feedback (progress bar fills) → drafts review summaries (counter ticks up) → flags 3 outliers needing manager attention → "Today queue: 47 reviews drafted, 3 need you." `durationMs: 11000`. Label: `Annual reviews`.

Commit: `feat: annual reviews scenario for player`.

### Task 20g: Multi-state coverage scenario

Create `src/components/scenarios/state-coverage.tsx`. Story: animated US map (use a CSS grid of 50 small squares, ticking from gray to green left-to-right over 6s, with 3 boxes turning orange instead of green) → list of caveats appears (NY paid leave overlap, MA earned sick time, CA accrual cap, each with a citation) → "47 ✓ · 3 with caveats · ready for review". `durationMs: 12000`. Label: `Multi-state`.

Commit: `feat: multi-state coverage scenario for player`.

**After all 8 scenarios are in:**

The `src/app/page.tsx` imports list should contain all 8 scenarios; the `<ScenarioPlayer scenarios={[...]} />` array should contain all 8. Reload the homepage — you should see 8 chips in the tab strip, each playing its own animated scenario. Auto-advance to the next when one finishes.

---

# Phase 6 — Final pass + ship

## Task 21: Site-wide jargon mop-up

**Files:** various

**Step 1: Grep for remaining engineering jargon**

Run these greps and clean up any remaining hits not already addressed:
```bash
grep -rn "orchestrator" src/ --include='*.tsx' --include='*.ts'
grep -rn "shadow mode\|HIL gates\|always-human\|risk-classified" src/ --include='*.tsx' --include='*.ts'
grep -rn "cutover\|cut over\|cuts over" src/ --include='*.tsx' --include='*.ts'
```

For each remaining hit (excluding tests/comments), apply the mapping from the design doc §3:
- `orchestrator` → drop or replace with "MambaHR" / "the agent"
- `shadow mode` → drop entirely or rephrase
- `HIL gates` → "human sign-off"
- `always-human` → "Always you"
- `risk-classified` → "Sorted by who decides"
- `cut over` / `cutover` / `cuts over` → "switch" / "switches"

**Step 2: Lint + commit**

```bash
npm run lint
git add src/
git commit -m "copy: site-wide jargon mop-up — remove residual engineering vocab"
```

## Task 22: Final pre-ship verification

**Step 1: Production build**

Run: `npm run build`
Expected: builds cleanly, no errors, no TypeScript errors.

**Step 2: Page-by-page visual check**

Run: `npm run dev`. Walk through every public page:
- `/` (homepage) — hero, social proof, problem, how it works (1·1·0 stanza), watch the agent work (8 scenarios), 14 specialists, compliance, where it lives, built for every stage, what this looks like, pricing, FAQ. Each major section ends with a SectionCta. Sticky button visible after hero scroll.
- `/demo` — hero, calendar placeholder, email form. No sticky button.
- `/about` — manifesto, 5 MAMBA values, founders.
- `/today`, `/security`, `/mamba`, `/people`, `/hiring`, `/pricing`, `/compare/[slug]`, `/research`, `/investors` — sanity check each renders without runtime errors, no remaining CUQ / L1–L5 / LIVE artifacts.

**Step 3: Sticky button check**

On `/`, scroll past hero — confirm the sticky "Book a demo" button appears bottom-right with a calendar icon and dismiss X. Click X — it disappears. Reload in a new tab — it should appear again (sessionStorage scope).

**Step 4: Demo CTA exercise**

From every page (`/`, `/about`, `/pricing`, `/security`, `/today`, etc.), click any "Get a demo →" button. Each one should land on `/demo`. No broken anchors.

**Step 5: Commit any final fixes**

If any fixes are needed during the walkthrough, address them, lint, and commit individually.

```bash
npm run lint && npm run build
```

**Step 6: Final commit**

```bash
git commit --allow-empty -m "chore: landing-feedback-v2 implementation complete"
```

---

# Notes for the executor

- **Frequent commits are non-negotiable.** Every task ends in a commit. If you batch commits you'll lose bisectability when something breaks.
- **No tests to write.** Project has no test infrastructure. Verification is `npm run lint` + `npm run dev` + visual eyeball.
- **Don't add dependencies.** Everything needed is already in `package.json` (framer-motion installed but not required — the scenarios use raw rAF via `useScenarioClock`).
- **Don't reformat unrelated code.** Touch only what each task names. Avoid drive-by edits.
- **If a task description says "around line X"** and the line numbers have shifted from earlier edits, find the content by grep, not by line number. The line numbers were captured at planning time.
- **If you hit a real blocker** (e.g., a file doesn't match the structure described), stop and report instead of guessing — line numbers may have drifted.
- **Scenario scripts (Task 20a–g)** can be done in any order; they're independent. Could be parallelized via subagents.

## File creation summary

New files created during this plan:
- `src/app/demo/page.tsx`
- `src/app/demo/layout.tsx`
- `src/components/section-cta.tsx`
- `src/components/sticky-demo-button.tsx`
- `src/components/scenarios/use-scenario-clock.ts`
- `src/components/scenarios/scenario-player.tsx`
- `src/components/scenarios/types.ts`
- `src/components/scenarios/leave.tsx`
- `src/components/scenarios/onboarding.tsx`
- `src/components/scenarios/termination.tsx`
- `src/components/scenarios/compliance-qa.tsx`
- `src/components/scenarios/payroll.tsx`
- `src/components/scenarios/comp.tsx`
- `src/components/scenarios/reviews.tsx`
- `src/components/scenarios/state-coverage.tsx`

Files modified:
- `src/app/page.tsx` (hero, FAQ, How It Works, founder section, scenario wiring, section CTAs, todayCards data)
- `src/app/about/page.tsx` (MAMBA values)
- `src/app/pricing/page.tsx` (FAQ)
- `src/app/today/page.tsx` (CUQ + Decision Card cleanup)
- `src/app/security/page.tsx` (CUQ removal)
- `src/app/layout.tsx` (sticky button mount)
- `src/app/globals.css` (animation keyframes)
- `src/components/surfaces/today-card.tsx` (props refactor)
- `src/components/sections/agent-pipeline.tsx` (LIVE removal + CUQ removal)
- `src/components/surfaces/routing-log.tsx` (LIVE removal)
- `src/components/nav/mega-nav.tsx` (CUQ replaced + demo link)
- `src/content/nav.ts` (CUQ removal)
- `src/components/nav.tsx`, `src/components/hero.tsx`, `src/components/lab.tsx` (demo link)
- `src/app/compare/[slug]/page.tsx`, `src/app/hiring/page.tsx`, `src/app/people/page.tsx` (demo link)

Total: **15 new files, ~17 modified files, ~22 commits**.
