-- Which ad or link brought each early access signup, so the founders can tell
-- which ad wins (blue-collar companies vs SF tech startups, October 2026).
--
-- The latest touch is kept as columns to count by, and the first touch whole,
-- as jsonb. The site never sends an ad platform's click id or a query string,
-- only which platform it was (src/lib/attribution.ts), and a browser with
-- Global Privacy Control or Do Not Track sends nothing.

alter table public.waitlist
  add column if not exists utm_source text check (char_length(utm_source) <= 100),
  add column if not exists utm_medium text check (char_length(utm_medium) <= 100),
  add column if not exists utm_campaign text check (char_length(utm_campaign) <= 100),
  add column if not exists utm_content text check (char_length(utm_content) <= 100),
  add column if not exists utm_term text check (char_length(utm_term) <= 100),
  add column if not exists ad_platform text check (ad_platform in ('google', 'meta', 'linkedin', 'microsoft', 'tiktok', 'x', 'reddit')),
  add column if not exists landing_path text check (char_length(landing_path) <= 200),
  add column if not exists referrer_host text check (char_length(referrer_host) <= 100),
  add column if not exists touched_at timestamptz,
  add column if not exists first_touch jsonb check (first_touch is null or pg_column_size(first_touch) <= 2048);

comment on column public.waitlist.utm_campaign is 'Campaign of the latest ad or link that brought the signup (the ad test counts by this).';
comment on column public.waitlist.first_touch is 'The first ad or link that brought the visitor within 90 days, as src/lib/attribution.ts Touch.';
