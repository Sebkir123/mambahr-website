-- In-admin social posting: connect multiple real LinkedIn accounts (founders),
-- compose/schedule posts, publish via LinkedIn's API. OAuth tokens are stored
-- AES-256-GCM encrypted at the app layer (ciphertext only lands here); the
-- decrypt key lives in a server-only env var. Rows are admin-readable (RLS);
-- writes happen via the service role from server actions / route handlers.

create table if not exists public.social_accounts (
  id            uuid primary key default gen_random_uuid(),
  provider      text not null default 'linkedin',
  account_name  text not null,            -- display name, e.g. "Brian Bell"
  avatar_url    text,
  external_id   text not null,            -- LinkedIn OIDC sub / member id
  author_urn    text,                     -- urn:li:person:xxxx (posting author)
  access_token  text,                     -- AES-GCM ciphertext
  refresh_token text,                     -- AES-GCM ciphertext
  expires_at    timestamptz,
  connected_by  text,                     -- admin email who connected it
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (provider, external_id)
);
alter table public.social_accounts enable row level security;
drop policy if exists social_accounts_admin_read on public.social_accounts;
create policy social_accounts_admin_read on public.social_accounts for select using (public.is_admin());

create table if not exists public.social_posts (
  id              uuid primary key default gen_random_uuid(),
  account_id      uuid references public.social_accounts(id) on delete cascade,
  body            text not null,
  image_url       text,
  status          text not null default 'draft' check (status in ('draft','scheduled','published','failed')),
  scheduled_at    timestamptz,
  published_at    timestamptz,
  external_post_id text,                  -- returned LinkedIn post urn
  error           text,
  created_by      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists social_posts_status_idx on public.social_posts (status, scheduled_at);
create index if not exists social_posts_created_idx on public.social_posts (created_at desc);
alter table public.social_posts enable row level security;
drop policy if exists social_posts_admin_read on public.social_posts;
create policy social_posts_admin_read on public.social_posts for select using (public.is_admin());
