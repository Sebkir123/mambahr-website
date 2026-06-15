-- ─────────────────────────────────────────────────────────────────────────
-- Seed the inaugural blog post so /blog is populated on first launch.
-- Real company content (not demo filler). Idempotent: re-running is a no-op.
-- Dollar-quoted bodies ($title$/$exc$/$body$) so apostrophes and the literal
-- "$1"/"$6" in the copy need no escaping.
-- ─────────────────────────────────────────────────────────────────────────

insert into public.posts (
  slug, title, excerpt, body_html, status, published_at,
  author_name, reading_time, tags,
  meta_title, meta_description, og_title, og_description
)
values (
  'building-the-ai-hr-department',
  $title$We're not building an HR copilot. We're building the HR department.$title$,
  $exc$For every $1 a company spends on its HRIS, it spends about $6 on the people clicking the buttons inside it. MambaHR captures that $6 — by doing the work, not by selling you a faster way to do it yourself.$exc$,
  $body$<p>We started MambaHR with a number that bothered us.</p>
<p>For every <strong>$1</strong> a company spends on its HRIS — Gusto, BambooHR, Workday, Rippling — it spends roughly <strong>$6</strong> on the people whose actual job is to click the buttons inside it. Onboard this hire. Process that leave. Run the termination. Check the compliance box for the right state. The software was supposed to do the work. Mostly, it just gave someone a place to do the work by hand.</p>
<p>That $6 is where the real HR budget goes. And almost none of it goes toward judgment. It goes toward administration.</p>
<h2>We sell the completed work, not the software</h2>
<p>Most HR products are tools. You buy a seat, you log in, you do the work a little faster. MambaHR isn't a tool. It's the department.</p>
<p>You don't sit inside MambaHR all day. You send it intent — &ldquo;@MambaHR hire Sarah for the eng role&rdquo; in Slack, or a request through your team's form — and it does the actual work: pulls the context, runs the compliance checks, drafts the documents, provisions the accounts, and tells the people who need to know. What comes back isn't a faster workflow. It's a finished outcome: Sarah onboarded, offer signed, accounts created, background check running.</p>
<p>So we charge for outcomes — an employee onboarded, a leave processed, a termination completed — not for seats. The completed work is the product.</p>
<h2>The human stays in the loop on judgment, not mechanics</h2>
<p>This is not a system that makes consequential calls on its own. High-certainty, low-stakes work completes automatically. Anything delicate — a separation, a policy question, anything a regulator would care about — routes to a person for sign-off before it happens. Hiring stays advisory: MambaHR can rank and surface candidates, but a person decides.</p>
<p>You keep control of the decisions that matter. You stop spending your week on the ones that don't.</p>
<h2>We are the system of record</h2>
<p>MambaHR owns the employee database, the applicant tracking, and the learning management. We are the HRIS, the ATS, and the LMS — not a layer sitting on top of them. When you move off your old stack, we import the data once, and from then on we are the source of truth. No syncing, no reconciling two systems that quietly disagree.</p>
<h2>What we'll write about here</h2>
<p>This is where we'll share what we're learning as we build it: where AI genuinely replaces HR administration and where it shouldn't, how multi-state compliance actually works under the hood, what it takes to run hiring, onboarding, and offboarding end to end, and the mistakes we make on the way.</p>
<p>If you run a people function and you're tired of paying six dollars to push every one dollar of software, we'd like to show you what the other model looks like.</p>$body$,
  'published',
  now(),
  'MambaHR',
  3,
  array['Company', 'AI in HR'],
  $title$We're building the HR department, not an HR copilot — MambaHR$title$,
  $exc$For every $1 a company spends on its HRIS, it spends about $6 on the people clicking the buttons inside it. MambaHR captures that $6 by doing the work, not by selling tooling for it.$exc$,
  $title$We're not building an HR copilot. We're building the HR department.$title$,
  $exc$Why MambaHR does the HR administrative work instead of giving your team a faster way to do it by hand.$exc$
)
on conflict (slug) do nothing;
