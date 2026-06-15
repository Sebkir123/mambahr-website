-- ============================================================
-- MambaHR blog — one-shot apply. Paste into Supabase Dashboard
--   → SQL Editor → New query → Run. Idempotent (safe to re-run).
-- ============================================================

-- ─────────────────────────────────────────────────────────────────────────
-- Admin panel: blog + first-party analytics.
-- Adds the founder allowlist, the blog schema (posts/revisions/views), an
-- is_admin() helper used by every admin RLS policy, and a media storage bucket.
-- ─────────────────────────────────────────────────────────────────────────

-- ── Admin allowlist ────────────────────────────────────────────────────────
-- An authenticated Supabase user is only an admin if their email is here.
create table if not exists public.admin_users (
  email      text primary key,
  created_at timestamptz not null default now()
);

comment on table public.admin_users is
  'Founder/admin email allowlist. Membership here (matched against auth.jwt() email) grants access to the /admin panel and CRUD on blog tables.';

-- Seed the first admin. Add others with:
--   insert into public.admin_users (email) values ('brian@mambahr.com');
insert into public.admin_users (email) values ('sebkirsch11@gmail.com')
  on conflict (email) do nothing;

-- is_admin(): true when the current authenticated user's email is allowlisted.
-- SECURITY DEFINER so RLS on admin_users itself can stay locked while policies
-- on other tables can still call this.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.admin_users enable row level security;
-- Admins can read the allowlist (e.g. to render a "team" view); no client writes.
drop policy if exists admin_users_select on public.admin_users;
create policy admin_users_select on public.admin_users
  for select to authenticated using (public.is_admin());

-- ── Blog posts ──────────────────────────────────────────────────────────────
do $$ begin
  if not exists (select 1 from pg_type where typname = 'post_status') then
    create type public.post_status as enum ('draft', 'scheduled', 'published');
  end if;
end $$;

create table if not exists public.posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null default '',
  excerpt         text not null default '',
  body_html       text not null default '',           -- sanitized on render
  body_json       jsonb,                                -- TipTap doc (editor source of truth)
  cover_image_url text,
  status          public.post_status not null default 'draft',
  published_at    timestamptz,
  scheduled_for   timestamptz,
  author_name     text not null default 'MambaHR',
  reading_time    int not null default 1,               -- minutes
  tags            text[] not null default '{}',
  -- SEO block
  meta_title       text,
  meta_description text,
  canonical_url    text,
  og_title         text,
  og_description   text,
  og_image_url     text,
  noindex          boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.posts is 'Marketing blog posts. Public reads only published rows; admins have full CRUD (RLS via is_admin()).';

create index if not exists posts_status_published_idx
  on public.posts (status, published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);

-- keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at before update on public.posts
  for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;

-- Public (anon + authenticated) may read only live posts.
drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts
  for select using (status = 'published' and published_at is not null and published_at <= now());

-- Admins: full read + write.
drop policy if exists posts_admin_all on public.posts;
create policy posts_admin_all on public.posts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── Post revisions (autosave / history) ─────────────────────────────────────
create table if not exists public.post_revisions (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid not null references public.posts(id) on delete cascade,
  body_json  jsonb,
  title      text,
  saved_at   timestamptz not null default now()
);
create index if not exists post_revisions_post_idx
  on public.post_revisions (post_id, saved_at desc);

alter table public.post_revisions enable row level security;
drop policy if exists post_revisions_admin_all on public.post_revisions;
create policy post_revisions_admin_all on public.post_revisions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── Post views (first-party counter) ────────────────────────────────────────
create table if not exists public.post_views (
  post_id uuid not null references public.posts(id) on delete cascade,
  day     date not null default current_date,
  count   int  not null default 0,
  primary key (post_id, day)
);

alter table public.post_views enable row level security;
-- Admins can read aggregates; writes go exclusively through the RPC below.
drop policy if exists post_views_admin_read on public.post_views;
create policy post_views_admin_read on public.post_views
  for select to authenticated using (public.is_admin());

-- Public increment path. SECURITY DEFINER so anon callers can bump the counter
-- without any table write privilege. Only ever +1 for a published post.
create or replace function public.increment_post_view(p_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_id uuid;
begin
  select id into v_id from public.posts
    where slug = p_slug and status = 'published'
      and published_at is not null and published_at <= now();
  if v_id is null then return; end if;
  insert into public.post_views (post_id, day, count)
    values (v_id, current_date, 1)
  on conflict (post_id, day) do update set count = public.post_views.count + 1;
end $$;

grant execute on function public.increment_post_view(text) to anon, authenticated;

-- ── Media storage bucket ─────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('blog-media', 'blog-media', true)
  on conflict (id) do nothing;

-- Public read of media; only admins write/delete.
drop policy if exists blog_media_public_read on storage.objects;
create policy blog_media_public_read on storage.objects
  for select using (bucket_id = 'blog-media');

drop policy if exists blog_media_admin_write on storage.objects;
create policy blog_media_admin_write on storage.objects
  for insert to authenticated with check (bucket_id = 'blog-media' and public.is_admin());

drop policy if exists blog_media_admin_modify on storage.objects;
create policy blog_media_admin_modify on storage.objects
  for update to authenticated using (bucket_id = 'blog-media' and public.is_admin());

drop policy if exists blog_media_admin_delete on storage.objects;
create policy blog_media_admin_delete on storage.objects
  for delete to authenticated using (bucket_id = 'blog-media' and public.is_admin());


-- Make scheduled posts go live automatically at their scheduled time — no cron.
-- The public read policy now also surfaces a 'scheduled' row once scheduled_for
-- has passed, so a post published-on-a-schedule appears the moment its time
-- arrives and disappears from "draft/scheduled" only in the editorial sense.
--
-- A future-dated 'published' row stays hidden until published_at <= now(), so
-- editors can also "publish" with a future date and get the same behavior.

drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts
  for select using (
    (status = 'published' and published_at is not null and published_at <= now())
    or
    (status = 'scheduled' and scheduled_for is not null and scheduled_for <= now())
  );


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
