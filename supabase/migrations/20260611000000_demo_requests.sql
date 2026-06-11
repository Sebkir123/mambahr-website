-- Book-a-demo submissions from the landing site (/demo).
-- Kept separate from `waitlist` on purpose: the waitlist table has an INSERT
-- database-webhook wired to the `slack-notify` "Founder's Circle" message, so
-- demo requests must NOT land there or they'd be mislabeled and double-pinged.
-- handle-demo-request sends its own clearly-labeled Slack message instead.

create table if not exists public.demo_requests (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  company     text,
  source      text not null default 'demo',
  created_at  timestamptz not null default now()
);

comment on table public.demo_requests is
  'Book-a-demo form submissions from the marketing site (/demo). Written only by the handle-demo-request edge function (service role).';

create index if not exists demo_requests_created_at_idx
  on public.demo_requests (created_at desc);

-- Lock it down: RLS on, zero policies. The service-role key used by the edge
-- function bypasses RLS, so the function can insert; anon/authenticated clients
-- get nothing. No public read/write path to lead data.
alter table public.demo_requests enable row level security;
