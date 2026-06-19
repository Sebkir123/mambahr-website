-- ─────────────────────────────────────────────────────────────────────────
-- First-party, server-recorded session analytics for the website + pitch deck.
--
-- A tiny client beacon posts page-views/engagement to /api/site/track; the
-- SERVER (route handler) is the source of truth — it reads the real client IP,
-- UA, and Vercel geo headers, resolves the owning network via lookup_asn, hashes
-- the IP (never stored raw), classifies bots, and writes here via the service
-- role. Per-session metrics (pageviews, dwell, scroll, bounce/engaged) are
-- derived at READ time from the pageview rows — no fragile write-time counters.
--
--   site_sessions   — one row per session (sessionStorage key), with metadata
--   site_pageviews  — one row per page view, upserted by client-generated id so
--                     the unload beacon can fill in final dwell + scroll
--   site_events     — conversions (widget_open / conversation / signup / cta …)
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.site_sessions (
  id            uuid primary key default gen_random_uuid(),
  property      text not null default 'website' check (property in ('website', 'deck', 'lp')),
  session_key   text not null,
  visitor_id    text,
  started_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now(),
  ip_hash       text,
  country       text,
  region        text,
  city          text,
  asn           text,
  asn_org       text,
  device        text,
  browser       text,
  browser_version text,
  os            text,
  os_version    text,
  screen        text,
  locale        text,
  referrer      text,
  source        text,                  -- direct | referral | google | … (derived from referrer/utm)
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  landing_path  text,
  user_agent    text,
  is_bot        boolean not null default false,
  bot_reason    text,
  is_returning  boolean not null default false,
  unique (property, session_key)
);
create index if not exists site_sessions_prop_time_idx on public.site_sessions (property, started_at desc);
create index if not exists site_sessions_visitor_idx on public.site_sessions (visitor_id);
alter table public.site_sessions enable row level security;
drop policy if exists site_sessions_admin_read on public.site_sessions;
create policy site_sessions_admin_read on public.site_sessions for select using (public.is_admin());

create table if not exists public.site_pageviews (
  id          uuid primary key,        -- client-generated so the unload beacon can update the same row
  session_id  uuid not null references public.site_sessions(id) on delete cascade,
  property    text not null,
  path        text not null,
  title       text,
  referrer    text,
  viewed_at   timestamptz not null default now(),
  dwell_ms    bigint not null default 0,
  max_scroll  int not null default 0   -- 0..100
);
create index if not exists site_pageviews_session_idx on public.site_pageviews (session_id, viewed_at);
alter table public.site_pageviews enable row level security;
drop policy if exists site_pageviews_admin_read on public.site_pageviews;
create policy site_pageviews_admin_read on public.site_pageviews for select using (public.is_admin());

create table if not exists public.site_events (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references public.site_sessions(id) on delete cascade,
  property     text not null,
  kind         text not null,          -- widget_open | conversation | signup | cta_click | custom
  label        text,
  meta         jsonb not null default '{}',
  occurred_at  timestamptz not null default now()
);
create index if not exists site_events_session_idx on public.site_events (session_id, occurred_at);
alter table public.site_events enable row level security;
drop policy if exists site_events_admin_read on public.site_events;
create policy site_events_admin_read on public.site_events for select using (public.is_admin());

-- Resolve the owning network (ASN/firm) for an IP without exposing the ip_asn
-- table. SECURITY DEFINER so the tracking route (service role already, but kept
-- callable) can enrich transiently; raw IP is never persisted by the caller.
create or replace function public.asn_for(p_ip text)
returns table(asn text, asn_org text)
language plpgsql stable security definer set search_path = public as $$
begin
  if p_ip is null or p_ip = '' then return; end if;
  begin
    return query select a.asn, a.asn_org from public.lookup_asn(p_ip::inet) a limit 1;
  exception when others then
    return;
  end;
end $$;
grant execute on function public.asn_for(text) to anon, authenticated, service_role;
