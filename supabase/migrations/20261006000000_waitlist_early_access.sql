-- Early access list (/early-access). The waitlist table predates this site's
-- route handlers: it was filled by the June "Founder's Circle" edge functions.

-- What we need to invite companies in sensible groups: team size (the pricing
-- page's bands) and the HR system their records come from. Values are the
-- slugs in src/content/early-access.ts.
alter table public.waitlist add column if not exists team_size text;
alter table public.waitlist add column if not exists hr_system text;
alter table public.waitlist add column if not exists first_handoff text[];

alter table public.waitlist drop constraint if exists waitlist_team_size_check;
alter table public.waitlist add constraint waitlist_team_size_check
  check (team_size is null or team_size in ('under_75', '75_149', '150_399', '400_plus'));

alter table public.waitlist drop constraint if exists waitlist_hr_system_check;
alter table public.waitlist add constraint waitlist_hr_system_check
  check (hr_system is null or hr_system in ('gusto', 'bamboohr', 'rippling', 'adp', 'workday', 'namely', 'spreadsheets', 'other'));

alter table public.waitlist drop constraint if exists waitlist_first_handoff_check;
alter table public.waitlist add constraint waitlist_first_handoff_check
  check (first_handoff is null or first_handoff <@ array['hiring', 'onboarding', 'time_off', 'payroll_changes', 'compliance']::text[]);

-- The "Slack Notifications" database webhook posted every insert to the
-- join-waitlist edge function, which reads `email` from the top level of a
-- body that nests it under `record`, so every call returned 400. The route
-- handler sends the Slack card and the welcome email itself.
drop trigger if exists "Slack Notifications" on public.waitlist;

-- Every lead route inserts with the service-role key after Turnstile and the
-- rate limits. A public insert policy let anyone holding the anon key (it ships
-- to browsers) write straight to these tables and skip both.
drop policy if exists "Allow public insert" on public.waitlist;
drop policy if exists demo_requests_public_insert on public.demo_requests;
drop policy if exists magnet_requests_public_insert on public.magnet_requests;
