-- ─────────────────────────────────────────────────────────────────────────
-- Lock admin access to the @mambahr.com email domain.
--
-- Before: is_admin() checked membership in a hand-maintained admin_users
-- allowlist. Now: an account is an admin iff its email domain is exactly
-- mambahr.com. Because we own the mambahr.com Google Workspace, only people
-- we issue a mailbox to can ever receive a magic link — so the domain IS the
-- allowlist, with nothing to maintain.
--
-- Enforced in two independent layers so a config slip can't open the door:
--   1. is_admin()                  → gates every admin RLS policy + the panel
--   2. trigger on auth.users       → blocks the *creation* of any non-mambahr
--                                     account at the database level, regardless
--                                     of Supabase signup settings or client code
-- ─────────────────────────────────────────────────────────────────────────

-- ── Layer 1: domain-based is_admin() ────────────────────────────────────────
-- split_part(email,'@',2) is the exact domain, so foo@mambahr.com passes while
-- foo@mambahr.com.evil.com or foo@evilmambahr.com do not.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select split_part(lower(coalesce(auth.jwt() ->> 'email', '')), '@', 2) = 'mambahr.com';
$$;

-- ── Layer 2: hard gate on account creation ──────────────────────────────────
-- Even with email signups enabled, only @mambahr.com addresses can ever become
-- an auth.users row. A non-mambahr magic-link request fails at INSERT time.
create or replace function public.enforce_mambahr_signup()
returns trigger
language plpgsql
as $$
begin
  if split_part(lower(coalesce(new.email, '')), '@', 2) <> 'mambahr.com' then
    raise exception 'Only @mambahr.com email addresses may register for the MambaHR admin.';
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_mambahr_signup on auth.users;
create trigger enforce_mambahr_signup
  before insert on auth.users
  for each row execute function public.enforce_mambahr_signup();

-- ── Cleanup: the old individual allowlist is no longer the gate ─────────────
-- is_admin() no longer reads admin_users, so the stale personal-gmail seed
-- would be misleading. Drop it. (The table is kept for an optional future
-- "team view"; membership no longer grants anything on its own.)
delete from public.admin_users where split_part(lower(email), '@', 2) <> 'mambahr.com';

comment on table public.admin_users is
  'Legacy/optional admin notes. Access is now granted by the @mambahr.com email domain via is_admin(), NOT by membership here.';
