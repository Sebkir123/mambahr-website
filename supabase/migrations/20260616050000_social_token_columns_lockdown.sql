-- Defense in depth: RLS can't restrict columns, so even though social_accounts
-- is admin-read, the anon/authenticated roles could SELECT the encrypted token
-- columns. Revoke column-level access to those two columns from the client
-- roles; only the service role (used by server-side publish) can read them.
revoke select (access_token, refresh_token) on public.social_accounts from anon, authenticated;
