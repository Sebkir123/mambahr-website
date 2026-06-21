-- Full referral-source breakdown per resource landing page (non-bot), powering
-- the admin's per-resource "where traffic came from" view. One unified share
-- link auto-attributes via the page tracker's deriveSource(); this shows the mix.
create or replace function public.resource_source_breakdown(p_since timestamptz default now() - interval '365 days')
returns table (slug text, source text, views bigint)
language sql
stable
security invoker
set search_path = public
as $$
  select right(pv.path, length(pv.path) - length('/resources/')) as slug,
         coalesce(nullif(s.source, ''), 'direct') as source,
         count(*)::bigint as views
  from site_pageviews pv
  join site_sessions s on s.id = pv.session_id and s.is_bot = false
  where pv.path like '/resources/%'
    and pv.viewed_at >= p_since
  group by 1, 2
  order by 1, 3 desc;
$$;
