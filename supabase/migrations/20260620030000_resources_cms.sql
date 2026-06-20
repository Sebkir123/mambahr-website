-- Marketing-managed downloadable resources (playbooks, checklists, kits).
-- Marketing uploads a PDF + metadata in the admin; published rows render on the
-- website and each gets a public, trackable landing page at /resources/<slug>
-- for sharing (LinkedIn etc.). Reads/downloads are measured through the existing
-- first-party site tracker (site_pageviews for views, a 'download' site_event for
-- downloads, site_sessions.source for where the traffic came from).

create table if not exists public.resources (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  kicker      text not null default 'Playbook',     -- card label: Playbook / Checklist / Kit
  cover_no    text,                                  -- e.g. "02" → "Field guide № 02"
  description text not null default '',
  bullets     text[] not null default '{}',
  file_path   text,                                  -- PDF in the 'resources' storage bucket
  file_name   text,                                  -- original filename for the download
  file_size   bigint,
  featured    boolean not null default false,        -- show as the hero card on the site
  status      text not null default 'draft' check (status in ('draft','published')),
  sort_order  int not null default 0,
  created_by  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists resources_status_idx on public.resources (status, sort_order, created_at desc);

alter table public.resources enable row level security;
-- Anyone may read PUBLISHED resources (the public site + landing pages).
drop policy if exists resources_public_read on public.resources;
create policy resources_public_read on public.resources
  for select using (status = 'published');
-- Admins manage everything (drafts included). Writes go through the service role.
drop policy if exists resources_admin_all on public.resources;
create policy resources_admin_all on public.resources
  for all using (public.is_admin()) with check (public.is_admin());

-- Public bucket for the PDFs — downloadable directly and referenced by the
-- shareable landing page. Admin uploads via the service role (bypasses RLS).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resources', 'resources', true, 52428800, array['application/pdf'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists resources_files_public_read on storage.objects;
create policy resources_files_public_read on storage.objects
  for select using (bucket_id = 'resources');
drop policy if exists resources_files_admin_write on storage.objects;
create policy resources_files_admin_write on storage.objects
  for all using (bucket_id = 'resources' and public.is_admin())
  with check (bucket_id = 'resources' and public.is_admin());

-- Per-resource read/download analytics from the first-party tracker. Views are
-- non-bot pageviews of /resources/<slug>; downloads are 'download' site_events
-- labelled with the slug. SECURITY INVOKER → the existing is_admin() RLS on the
-- tracker tables governs access.
create or replace function public.resource_stats(p_since timestamptz default now() - interval '365 days')
returns table (
  slug       text,
  views      bigint,
  visitors   bigint,
  downloads  bigint,
  last_view  timestamptz
)
language sql
stable
security invoker
set search_path = public
as $$
  with views as (
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
  dls as (
    select e.label as slug, count(*)::bigint as downloads
    from site_events e
    join site_sessions s on s.id = e.session_id and s.is_bot = false
    where e.kind = 'download'
      and e.occurred_at >= p_since
    group by 1
  )
  select coalesce(v.slug, d.slug) as slug,
         coalesce(v.views, 0),
         coalesce(v.visitors, 0),
         coalesce(d.downloads, 0),
         v.last_view
  from views v
  full outer join dls d on d.slug = v.slug;
$$;

-- Top referral sources for one resource's landing page — "where readers came from".
create or replace function public.resource_sources(p_slug text, p_since timestamptz default now() - interval '365 days')
returns table (source text, views bigint)
language sql
stable
security invoker
set search_path = public
as $$
  select coalesce(nullif(s.source, ''), 'direct') as source, count(*)::bigint
  from site_pageviews pv
  join site_sessions s on s.id = pv.session_id and s.is_bot = false
  where pv.path = '/resources/' || p_slug
    and pv.viewed_at >= p_since
  group by 1
  order by 2 desc
  limit 6;
$$;
