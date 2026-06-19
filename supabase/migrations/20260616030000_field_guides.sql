-- Field-guide lead magnets: gated downloads behind an email wall, delivered via
-- a per-request unguessable token (like the investor deck), with server-side
-- open tracking (firm/ASN, device, geo) reusing lookup_asn. noindex + token
-- gate keep the guides off the public internet.

create table if not exists public.field_guide_leads (
  id           uuid primary key default gen_random_uuid(),
  guide        text not null,            -- slug, e.g. 'rif-playbook'
  email        text not null,
  company      text,
  token        text not null unique,     -- unguessable, ~16 url-safe chars
  ip_hash      text,                     -- salted hash of requester IP (never raw)
  requested_at timestamptz not null default now(),
  sent_at      timestamptz,
  revoked_at   timestamptz
);
create index if not exists field_guide_leads_guide_idx on public.field_guide_leads (guide, requested_at desc);
alter table public.field_guide_leads enable row level security;
-- Admins (@mambahr.com) read; writes happen via the service role / SECURITY DEFINER only.
drop policy if exists field_guide_leads_admin_read on public.field_guide_leads;
create policy field_guide_leads_admin_read on public.field_guide_leads for select using (public.is_admin());

create table if not exists public.field_guide_views (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid references public.field_guide_leads(id) on delete cascade,
  guide           text not null,
  viewed_at       timestamptz not null default now(),
  country         text,
  region          text,
  city            text,
  ip_hash         text,
  asn             text,
  asn_org         text,
  user_agent      text,
  browser         text,
  browser_version text,
  os              text,
  os_version      text,
  device          text,
  referrer        text
);
create index if not exists field_guide_views_lead_idx on public.field_guide_views (lead_id, viewed_at desc);
alter table public.field_guide_views enable row level security;
drop policy if exists field_guide_views_admin_read on public.field_guide_views;
create policy field_guide_views_admin_read on public.field_guide_views for select using (public.is_admin());

-- Resolve a token to its lead (anon-callable, live tokens only) — the gate.
create or replace function public.resolve_field_guide(p_token text)
returns table(lead_id uuid, guide text, email text)
language sql stable security definer set search_path = public as $$
  select id, guide, email
  from public.field_guide_leads
  where token = p_token and revoked_at is null
  limit 1
$$;
grant execute on function public.resolve_field_guide(text) to anon, authenticated;

-- Log an open. Resolves the token, looks up the owning network from the IP
-- transiently (raw IP never stored — only the salted hash + resolved org).
create or replace function public.log_field_guide_view(p_token text, p_payload jsonb, p_ip text)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_lead  uuid;
  v_guide text;
  v_asn   text;
  v_org   text;
begin
  select id, guide into v_lead, v_guide
  from public.field_guide_leads
  where token = p_token and revoked_at is null
  limit 1;
  if v_lead is null then return; end if;

  if p_ip is not null and p_ip <> '' then
    begin
      select a.asn, a.asn_org into v_asn, v_org from public.lookup_asn(p_ip::inet) a limit 1;
    exception when others then
      v_asn := null; v_org := null;
    end;
  end if;

  insert into public.field_guide_views (
    lead_id, guide, country, region, city, ip_hash, asn, asn_org,
    user_agent, browser, browser_version, os, os_version, device, referrer
  ) values (
    v_lead, v_guide,
    p_payload->>'country', p_payload->>'region', p_payload->>'city',
    p_payload->>'ipHash', v_asn, v_org,
    left(p_payload->>'ua', 400), p_payload->>'browser', p_payload->>'browserVersion',
    p_payload->>'os', p_payload->>'osVersion', p_payload->>'device',
    left(p_payload->>'referrer', 500)
  );
exception when others then
  return; -- analytics must never break the gate
end $$;
grant execute on function public.log_field_guide_view(text, jsonb, text) to anon, authenticated;
