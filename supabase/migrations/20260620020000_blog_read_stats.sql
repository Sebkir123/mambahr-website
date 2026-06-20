-- Per-post blog read analytics, derived from the first-party site tracker
-- (site_pageviews joined to site_sessions to exclude bots). SECURITY INVOKER so
-- the existing is_admin() RLS on both tables governs access: non-admin / anon
-- callers see nothing; the service role (admin panel) bypasses RLS. Bots are
-- excluded in the WHERE so the numbers match "real reads".

-- Per-path rollup over all blog posts. Used by the blog list + post headline.
create or replace function public.blog_stats(p_since timestamptz default now() - interval '365 days')
returns table (
  path          text,
  views         bigint,
  readers       bigint,
  avg_dwell_ms  numeric,
  avg_scroll    numeric,
  completed     bigint,   -- pageviews that scrolled >= 75% (read to the end)
  last_view     timestamptz
)
language sql
stable
security invoker
set search_path = public
as $$
  select
    pv.path,
    count(*)::bigint,
    count(distinct coalesce(s.visitor_id, s.id::text))::bigint,
    -- Clamp per-view dwell to 20 min so a tab left open all day can't skew the
    -- "avg read time" into hours.
    coalesce(avg(least(pv.dwell_ms, 1200000)), 0),
    coalesce(avg(pv.max_scroll), 0),
    count(*) filter (where pv.max_scroll >= 75)::bigint,
    max(pv.viewed_at)
  from site_pageviews pv
  join site_sessions s on s.id = pv.session_id and s.is_bot = false
  where pv.path like '/blog/%'
    and pv.viewed_at >= p_since
  group by pv.path;
$$;

-- Daily read counts for a single post — drives the trend sparkline.
create or replace function public.blog_post_series(p_path text, p_since timestamptz default now() - interval '30 days')
returns table (day date, views bigint)
language sql
stable
security invoker
set search_path = public
as $$
  select date_trunc('day', pv.viewed_at)::date as day, count(*)::bigint
  from site_pageviews pv
  join site_sessions s on s.id = pv.session_id and s.is_bot = false
  where pv.path = p_path
    and pv.viewed_at >= p_since
  group by 1
  order by 1;
$$;

-- Where a single post's readers came from — top referral sources.
create or replace function public.blog_post_sources(p_path text, p_since timestamptz default now() - interval '365 days')
returns table (source text, views bigint)
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce(nullif(s.source, ''), 'direct') as source, count(*)::bigint
  from site_pageviews pv
  join site_sessions s on s.id = pv.session_id and s.is_bot = false
  where pv.path = p_path
    and pv.viewed_at >= p_since
  group by 1
  order by 2 desc
  limit 6;
$$;
