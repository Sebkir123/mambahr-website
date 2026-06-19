-- ─────────────────────────────────────────────────────────────────────────
-- CRM for customers + investors.
--
-- Three tables, all admin-only (is_admin() = @mambahr.com) with FULL CRUD via
-- the logged-in admin's session — no service-role key needed, RLS is the gate.
--   crm_contacts    — people/orgs in a pipeline (kind = customer | investor)
--   crm_activities  — append-only timeline per contact (notes, calls, stage moves)
--   crm_tasks       — follow-ups with due dates
--
-- Real-time collaboration: the three tables are added to the supabase_realtime
-- publication so the board/list live-update across users. Per-record edit
-- locking is handled client-side via Realtime *presence* (no stale DB locks).
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.crm_contacts (
  id                uuid primary key default gen_random_uuid(),
  kind              text not null check (kind in ('customer', 'investor')),
  name              text not null,
  email             text,
  company           text,                       -- customer: company; investor: firm
  title             text,                        -- role / title
  stage             text not null default 'lead',
  owner             text,                        -- admin email who owns the relationship
  source            text,                        -- waitlist | demo | magnet | field_guide | deck | referral | manual
  value             numeric(14, 2),              -- deal size (customer) / check size (investor), USD
  priority          text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  linkedin_url      text,
  website           text,
  location          text,
  tags              text[] not null default '{}',
  notes             text,
  next_step         text,
  next_step_due     date,
  last_contacted_at timestamptz,
  external_ref      text,                        -- dedupe key for ingestion (deck token, lead email, …)
  created_by        text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists crm_contacts_kind_stage_idx on public.crm_contacts (kind, stage);
create index if not exists crm_contacts_updated_idx on public.crm_contacts (updated_at desc);
-- One contact per (kind, external_ref) so re-running ingestion is idempotent.
create unique index if not exists crm_contacts_extref_uq
  on public.crm_contacts (kind, external_ref) where external_ref is not null;

alter table public.crm_contacts enable row level security;
drop policy if exists crm_contacts_admin_all on public.crm_contacts;
create policy crm_contacts_admin_all on public.crm_contacts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.crm_activities (
  id          uuid primary key default gen_random_uuid(),
  contact_id  uuid not null references public.crm_contacts(id) on delete cascade,
  kind        text not null check (kind in ('note', 'call', 'email', 'meeting', 'stage_change', 'created', 'task')),
  body        text,
  meta        jsonb not null default '{}',
  author      text,
  created_at  timestamptz not null default now()
);
create index if not exists crm_activities_contact_idx on public.crm_activities (contact_id, created_at desc);
alter table public.crm_activities enable row level security;
drop policy if exists crm_activities_admin_all on public.crm_activities;
create policy crm_activities_admin_all on public.crm_activities
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.crm_tasks (
  id          uuid primary key default gen_random_uuid(),
  contact_id  uuid not null references public.crm_contacts(id) on delete cascade,
  title       text not null,
  due_date    date,
  done        boolean not null default false,
  done_at     timestamptz,
  assignee    text,
  created_by  text,
  created_at  timestamptz not null default now()
);
create index if not exists crm_tasks_contact_idx on public.crm_tasks (contact_id);
create index if not exists crm_tasks_open_idx on public.crm_tasks (done, due_date);
alter table public.crm_tasks enable row level security;
drop policy if exists crm_tasks_admin_all on public.crm_tasks;
create policy crm_tasks_admin_all on public.crm_tasks
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Keep updated_at fresh on every contact write (drives the "recently touched"
-- ordering and the realtime board's optimistic refresh).
create or replace function public.crm_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists crm_contacts_touch on public.crm_contacts;
create trigger crm_contacts_touch before update on public.crm_contacts
  for each row execute function public.crm_touch_updated_at();

-- Add to the realtime publication so postgres_changes streams to the board/list.
-- Guarded: ALTER PUBLICATION errors if the table is already a member.
do $$
begin
  begin
    alter publication supabase_realtime add table public.crm_contacts;
  exception when duplicate_object then null; when undefined_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.crm_activities;
  exception when duplicate_object then null; when undefined_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.crm_tasks;
  exception when duplicate_object then null; when undefined_object then null;
  end;
end $$;
