-- Addresses that used the unsubscribe link in an email from mambahr.com (the
-- early access welcome and pass emails). The site checks this list before every
-- list email and skips the address when it is here. One row per address,
-- lowercased; written only by the site's server with the service-role key.
create table if not exists public.email_unsubscribes (
  email text primary key check (email = lower(email)),
  source text not null default 'link' check (source in ('link', 'one-click', 'manual')),
  unsubscribed_at timestamptz not null default now()
);

-- No public policies: the anon key ships to browsers and must not read or
-- write this list. The service role bypasses RLS.
alter table public.email_unsubscribes enable row level security;

-- Admins can see who unsubscribed, like the other lead tables.
drop policy if exists email_unsubscribes_admin_read on public.email_unsubscribes;
create policy email_unsubscribes_admin_read on public.email_unsubscribes
  for select to authenticated using (public.is_admin());
