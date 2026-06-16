-- ─────────────────────────────────────────────────────────────────────────
-- Investor-deck analytics v2 — integrity + depth.
--
-- WHAT'S NEW vs the v1 schema (20260616000000_deck_analytics):
--
--  1. deck_pageviews — a SERVER-SIDE, JS-INDEPENDENT open log. The deck's
--     server component records every GET *before any client JS runs*, so an
--     open is captured even when the viewer blocks the /track beacon (ad
--     blocker, JS off, corporate proxy). This is the "so we are safe" row:
--     tamper-proof and ad-block-proof. Client telemetry (deck_sessions) then
--     ENRICHES it with dwell/active time rather than being the only source.
--
--  2. deck_ip_asn — a self-hosted IP→ASN/org table (free iptoasn dataset,
--     loaded once via scripts/load-ip-asn.mjs). lookup_asn() resolves a raw
--     IP to its owning network ("opened from a GOOGLE / Sequoia-owned block")
--     entirely inside Postgres — no third-party API, no per-call billing.
--     The raw IP is a transient function argument; it is NEVER stored (only
--     the salted ip_hash + the resolved asn/org are persisted).
--
--  3. deck_sessions gains active_ms (focused/attention time, not wall clock),
--     last_slide (exit slide, vs max_slide = furthest reached), and parsed
--     browser_version / os_version / asn / asn_org.
--
-- Security model is unchanged from v1: admins read via is_admin() RLS; the
-- anon public never reads these tables — the only public write paths are the
-- SECURITY DEFINER functions track_deck() and log_deck_pageview().
-- ─────────────────────────────────────────────────────────────────────────

-- ── 1. Server-side, JS-independent open log ────────────────────────────────
create table if not exists public.deck_pageviews (
  id bigint generated always as identity primary key,
  link_id uuid references public.deck_links(id) on delete set null,
  recipient_name text,
  recipient_org text,
  slug text,
  viewed_at timestamptz not null default now(),
  country text,
  region text,
  city text,
  latitude double precision,
  longitude double precision,
  ip_hash text,
  user_agent text,
  browser text,
  browser_version text,
  os text,
  os_version text,
  device text,
  asn text,
  asn_org text,
  referrer text
);
alter table public.deck_pageviews enable row level security;
drop policy if exists deck_pageviews_admin_read on public.deck_pageviews;
create policy deck_pageviews_admin_read on public.deck_pageviews
  for select to authenticated using (public.is_admin());
create index if not exists deck_pageviews_viewed_idx on public.deck_pageviews (viewed_at desc);
create index if not exists deck_pageviews_link_idx on public.deck_pageviews (link_id);
create index if not exists deck_pageviews_iphash_idx on public.deck_pageviews (ip_hash);

-- ── 2. Self-hosted IP→ASN/org reference data ───────────────────────────────
-- One row per advertised range. Loaded from the free iptoasn.com TSV by
-- scripts/load-ip-asn.mjs. IPv4 and IPv6 coexist (inet comparison keeps the
-- families from cross-matching: every v6 address sorts above every v4 one).
create table if not exists public.deck_ip_asn (
  range_start inet not null,
  range_end inet not null,
  asn text,
  asn_org text
);
alter table public.deck_ip_asn enable row level security;
-- No public/anon policy: the table is reachable only through the SECURITY
-- DEFINER lookup_asn(); the loader writes with the service role (bypasses RLS).
create index if not exists deck_ip_asn_start_idx on public.deck_ip_asn (range_start);

-- Resolve a raw IP to its owning network. SECURITY DEFINER so it can read the
-- RLS-locked table; callable by anon (the track route / deck page use it).
-- Returns nulls when the IP isn't covered or the dataset isn't loaded yet.
create or replace function public.lookup_asn(p_ip inet)
returns table (asn text, asn_org text)
language sql
stable
security definer
set search_path = public
as $$
  select a.asn, a.asn_org
  from public.deck_ip_asn a
  where a.range_start <= p_ip and a.range_end >= p_ip
  order by a.range_start desc
  limit 1
$$;
revoke all on function public.lookup_asn(inet) from public;
grant execute on function public.lookup_asn(inet) to anon, authenticated;

-- ── 3. Richer per-session columns ──────────────────────────────────────────
alter table public.deck_sessions add column if not exists active_ms bigint not null default 0;
alter table public.deck_sessions add column if not exists last_slide int not null default 0;
alter table public.deck_sessions add column if not exists browser_version text;
alter table public.deck_sessions add column if not exists os_version text;
alter table public.deck_sessions add column if not exists asn text;
alter table public.deck_sessions add column if not exists asn_org text;

-- ── 4. log_deck_pageview() — the JS-independent open path ───────────────────
-- Called from the deck's server component on every GET. Resolves the token to
-- a recipient, enriches with the geo the caller passes + ASN looked up from the
-- raw IP, and appends one immutable row. p_ip is transient (used for the ASN
-- lookup only) and is never stored — only p_payload->>'ipHash' is persisted.
create or replace function public.log_deck_pageview(p_token text, p_payload jsonb, p_ip text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_link_id uuid;
  v_name text;
  v_org text;
  v_asn text;
  v_asn_org text;
begin
  if p_token is not null and length(p_token) > 0 then
    select id, recipient_name, recipient_org into v_link_id, v_name, v_org
    from public.deck_links
    where token = p_token and revoked_at is null
    limit 1;
  end if;

  if p_ip is not null and length(p_ip) > 0 then
    begin
      select l.asn, l.asn_org into v_asn, v_asn_org from public.lookup_asn(p_ip::inet) l;
    exception when others then
      v_asn := null; v_asn_org := null;  -- bad/private IP → skip enrichment
    end;
  end if;

  insert into public.deck_pageviews (
    link_id, recipient_name, recipient_org, slug,
    country, region, city, latitude, longitude,
    ip_hash, user_agent, browser, browser_version, os, os_version, device,
    asn, asn_org, referrer
  ) values (
    v_link_id, v_name, v_org, p_payload->>'slug',
    p_payload->>'country', p_payload->>'region', p_payload->>'city',
    (p_payload->>'lat')::double precision, (p_payload->>'lng')::double precision,
    p_payload->>'ipHash', p_payload->>'ua',
    p_payload->>'browser', p_payload->>'browserVersion',
    p_payload->>'os', p_payload->>'osVersion', p_payload->>'device',
    v_asn, v_asn_org, p_payload->>'referrer'
  );
end
$$;
revoke all on function public.log_deck_pageview(text, jsonb, text) from public;
grant execute on function public.log_deck_pageview(text, jsonb, text) to anon, authenticated;

-- ── 5. track_deck() — now records active time, exit slide, versions, ASN ────
-- Signature gains p_ip (transient, for ASN lookup — never stored). The old
-- 3-arg form is dropped; the route is updated in the same change.
drop function if exists public.track_deck(uuid, text, jsonb);
create or replace function public.track_deck(p_session uuid, p_token text, p_payload jsonb, p_ip text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_link_id uuid;
  v_name text;
  v_org text;
  v_asn text;
  v_asn_org text;
begin
  if p_token is not null and length(p_token) > 0 then
    select id, recipient_name, recipient_org into v_link_id, v_name, v_org
    from public.deck_links
    where token = p_token and revoked_at is null
    limit 1;
  end if;

  if p_ip is not null and length(p_ip) > 0 then
    begin
      select l.asn, l.asn_org into v_asn, v_asn_org from public.lookup_asn(p_ip::inet) l;
    exception when others then
      v_asn := null; v_asn_org := null;
    end;
  end if;

  insert into public.deck_sessions as ds (
    id, link_id, recipient_name, recipient_org, slug, total_slides,
    duration_ms, active_ms, max_slide, last_slide,
    country, region, city, latitude, longitude,
    ip_hash, user_agent, browser, browser_version, os, os_version,
    device, asn, asn_org, referrer
  ) values (
    p_session, v_link_id, v_name, v_org, p_payload->>'slug',
    coalesce((p_payload->>'total')::int, 0),
    greatest(coalesce((p_payload->>'durationMs')::bigint, 0), 0),
    greatest(coalesce((p_payload->>'activeMs')::bigint, 0), 0),
    greatest(coalesce((p_payload->>'maxSlide')::int, 0), 0),
    greatest(coalesce((p_payload->>'lastSlide')::int, 0), 0),
    p_payload->>'country', p_payload->>'region', p_payload->>'city',
    (p_payload->>'lat')::double precision, (p_payload->>'lng')::double precision,
    p_payload->>'ipHash', p_payload->>'ua',
    p_payload->>'browser', p_payload->>'browserVersion',
    p_payload->>'os', p_payload->>'osVersion',
    p_payload->>'device', v_asn, v_asn_org, p_payload->>'referrer'
  )
  on conflict (id) do update set
    last_seen_at = now(),
    duration_ms = greatest(ds.duration_ms, excluded.duration_ms),
    active_ms = greatest(ds.active_ms, excluded.active_ms),
    max_slide = greatest(ds.max_slide, excluded.max_slide),
    last_slide = excluded.last_slide,
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
revoke all on function public.track_deck(uuid, text, jsonb, text) from public;
grant execute on function public.track_deck(uuid, text, jsonb, text) to anon, authenticated;
