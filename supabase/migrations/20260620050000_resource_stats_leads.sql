-- Resources are now email-gated: a download requires a captured lead. So the
-- "downloads" metric counts captured leads (rows in magnet_requests labelled with
-- the resource slug) rather than client-side download events. Views + top source
-- still come from the first-party page tracker. Same signature → CREATE OR REPLACE.

create or replace function public.resource_stats(p_since timestamptz default now() - interval '365 days')
returns table (
  slug        text,
  views       bigint,
  visitors    bigint,
  downloads   bigint,
  top_source  text,
  last_view   timestamptz
)
language sql
stable
security invoker
set search_path = public
as $$
  with v as (
    select right(pv.path, length(pv.path) - length('/resources/')) as slug,
           count(*)::bigint as views,
           count(distinct coalesce(s.visitor_id, s.id::text))::bigint as visitors,
           max(pv.viewed_at) as last_view
    from site_pageviews pv
    join site_sessions s on s.id = pv.session_id and s.is_bot = false
    where pv.path like '/resources/%'
      and pv.viewed_at >= p_since
    group by 1
  ),
  d as (
    select magnet_id as slug, count(*)::bigint as downloads
    from magnet_requests
    where created_at >= p_since
    group by 1
  ),
  src as (
    select slug, source from (
      select right(pv.path, length(pv.path) - length('/resources/')) as slug,
             coalesce(nullif(s.source, ''), 'direct') as source,
             row_number() over (
               partition by right(pv.path, length(pv.path) - length('/resources/'))
               order by count(*) desc
             ) as rn
      from site_pageviews pv
      join site_sessions s on s.id = pv.session_id and s.is_bot = false
      where pv.path like '/resources/%'
        and pv.viewed_at >= p_since
      group by 1, 2
    ) q
    where rn = 1
  )
  select coalesce(v.slug, d.slug) as slug,
         coalesce(v.views, 0),
         coalesce(v.visitors, 0),
         coalesce(d.downloads, 0),
         src.source as top_source,
         v.last_view
  from v
  full outer join d on d.slug = v.slug
  left join src on src.slug = coalesce(v.slug, d.slug);
$$;
