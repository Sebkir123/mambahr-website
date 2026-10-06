-- Early access, part two: the private pass and the partner program.

-- The pass page (/early-access/pass/<token>) is reached by a link only its
-- owner has: from the join response and the welcome email. referral_code stays
-- the PUBLIC half (it is in every shared link), so it can never open a pass.
alter table public.waitlist
  add column if not exists pass_token text not null default replace(gen_random_uuid()::text, '-', '');
create unique index if not exists waitlist_pass_token_key on public.waitlist (pass_token);

-- Applications from accountants, fractional CFOs and HR leads, and VC platform
-- teams (/partners). Written only by /api/partners with the service role.
create table if not exists public.partner_applications (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  firm text not null,
  partner_type text not null check (partner_type in ('accountant', 'fractional_cfo', 'fractional_hr', 'vc_platform', 'other')),
  companies_advised text check (companies_advised is null or companies_advised in ('1_5', '6_20', '21_50', '50_plus')),
  note text,
  constraint partner_applications_email_key unique (email)
);

alter table public.partner_applications enable row level security;

drop policy if exists partner_applications_admin_read on public.partner_applications;
create policy partner_applications_admin_read on public.partner_applications
  for select to authenticated using (is_admin());
