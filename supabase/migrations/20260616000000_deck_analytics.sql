-- ─────────────────────────────────────────────────────────────────────────
-- Investor-deck access + analytics.
--
-- deck_links     per-recipient access tokens. A token both GATES the deck
--                (no valid token + not an admin → 404) and IDENTIFIES the
--                viewer. The table is admin-read-only; the public never reads
--                it directly — it resolves a single token via the SECURITY
--                DEFINER resolve_deck_link().
-- deck_sessions  one row per viewing session (client-generated id). Geo/device
--                enriched server-side; duration + furthest slide updated as the
--                view progresses.
-- deck_slide_events  per-slide dwell, appended as the viewer moves through.
--
-- Security model (matches the lead tables): admins read via is_admin() RLS; the
-- anon public never reads/writes these tables directly — the only public write
-- path is track_deck() (SECURITY DEFINER), so a viewer can record a view but
-- cannot read anyone's analytics or enumerate links.
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.deck_links (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  recipient_name text not null,
  recipient_org text,
  created_at timestamptz not null default now(),
  created_by text,
  revoked_at timestamptz
);
alter table public.deck_links enable row level security;
drop policy if exists deck_links_admin_all on public.deck_links;
create policy deck_links_admin_all on public.deck_links
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.deck_sessions (
  id uuid primary key,
  link_id uuid references public.deck_links(id) on delete set null,
  recipient_name text,
  recipient_org text,
  slug text,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  duration_ms bigint not null default 0,
  max_slide int not null default 0,
  total_slides int not null default 0,
  country text,
  region text,
  city text,
  latitude double precision,
  longitude double precision,
  ip_hash text,
  user_agent text,
  device text,
  browser text,
  os text,
  referrer text
);
alter table public.deck_sessions enable row level security;
drop policy if exists deck_sessions_admin_read on public.deck_sessions;
create policy deck_sessions_admin_read on public.deck_sessions
  for select to authenticated using (public.is_admin());

create table if not exists public.deck_slide_events (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.deck_sessions(id) on delete cascade,
  slide_index int not null,
  slide_title text,
  dwell_ms bigint not null default 0,
  created_at timestamptz not null default now()
);
alter table public.deck_slide_events enable row level security;
drop policy if exists deck_slide_events_admin_read on public.deck_slide_events;
create policy deck_slide_events_admin_read on public.deck_slide_events
  for select to authenticated using (public.is_admin());

create index if not exists deck_sessions_started_idx on public.deck_sessions (started_at desc);
create index if not exists deck_sessions_link_idx on public.deck_sessions (link_id);
create index if not exists deck_slide_events_session_idx on public.deck_slide_events (session_id);

-- Resolve a token without exposing the table. Returns nothing for an
-- unknown/revoked token. SECURITY DEFINER so the anon role can call it.
create or replace function public.resolve_deck_link(p_token text)
returns table (id uuid, recipient_name text, recipient_org text)
language sql
security definer
set search_path = public
as $$
  select id, recipient_name, recipient_org
  from public.deck_links
  where token = p_token and revoked_at is null
  limit 1
$$;
revoke all on function public.resolve_deck_link(text) from public;
grant execute on function public.resolve_deck_link(text) to anon, authenticated;

-- The single public write path for deck analytics. Upserts the session (geo +
-- device set once; duration/progress kept as the max seen) and appends a slide
-- dwell event when one is supplied. SECURITY DEFINER so anon writes without any
-- direct table grant — the function is the only thing it can do.
create or replace function public.track_deck(p_session uuid, p_token text, p_payload jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_link_id uuid;
  v_name text;
  v_org text;
begin
  if p_token is not null and length(p_token) > 0 then
    select id, recipient_name, recipient_org into v_link_id, v_name, v_org
    from public.deck_links
    where token = p_token and revoked_at is null
    limit 1;
  end if;

  insert into public.deck_sessions as ds (
    id, link_id, recipient_name, recipient_org, slug, total_slides,
    duration_ms, max_slide, country, region, city, latitude, longitude,
    ip_hash, user_agent, device, browser, os, referrer
  ) values (
    p_session, v_link_id, v_name, v_org, p_payload->>'slug',
    coalesce((p_payload->>'total')::int, 0),
    greatest(coalesce((p_payload->>'durationMs')::bigint, 0), 0),
    greatest(coalesce((p_payload->>'maxSlide')::int, 0), 0),
    p_payload->>'country', p_payload->>'region', p_payload->>'city',
    (p_payload->>'lat')::double precision, (p_payload->>'lng')::double precision,
    p_payload->>'ipHash', p_payload->>'ua', p_payload->>'device',
    p_payload->>'browser', p_payload->>'os', p_payload->>'referrer'
  )
  on conflict (id) do update set
    last_seen_at = now(),
    duration_ms = greatest(ds.duration_ms, excluded.duration_ms),
    max_slide = greatest(ds.max_slide, excluded.max_slide),
    total_slides = greatest(ds.total_slides, excluded.total_slides);

  if (p_payload ? 'slideIndex') and coalesce((p_payload->>'dwellMs')::bigint, 0) > 0 then
    insert into public.deck_slide_events (session_id, slide_index, slide_title, dwell_ms)
    values (
      p_session,
      (p_payload->>'slideIndex')::int,
      p_payload->>'slideTitle',
      (p_payload->>'dwellMs')::bigint
    );
  end if;
end
$$;
revoke all on function public.track_deck(uuid, text, jsonb) from public;
grant execute on function public.track_deck(uuid, text, jsonb) to anon, authenticated;
