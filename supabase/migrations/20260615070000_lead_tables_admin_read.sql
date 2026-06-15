-- ─────────────────────────────────────────────────────────────────────────
-- Give the lead tables an admin-read RLS policy so the admin panel can read
-- them AS THE LOGGED-IN ADMIN (their magic-link session) instead of with the
-- RLS-bypassing service-role key.
--
-- Security model: least privilege. is_admin() is true only for @mambahr.com
-- sessions, so only an authenticated admin sees lead rows. The public capture
-- forms keep their INSERT-only policies (anon can write a lead, never read
-- one). After this, the admin panel needs NO service-role key at all.
-- ─────────────────────────────────────────────────────────────────────────

-- waitlist already has anon INSERT + a service_role bypass; add admin SELECT.
drop policy if exists waitlist_admin_read on public.waitlist;
create policy waitlist_admin_read on public.waitlist
  for select to authenticated using (public.is_admin());

-- demo_requests / magnet_requests had RLS on with no policies at all
-- (readable only via the service-role bypass). Add admin SELECT so they're
-- reachable as the admin, and keep public INSERT for the capture forms.
drop policy if exists demo_requests_admin_read on public.demo_requests;
create policy demo_requests_admin_read on public.demo_requests
  for select to authenticated using (public.is_admin());

drop policy if exists demo_requests_public_insert on public.demo_requests;
create policy demo_requests_public_insert on public.demo_requests
  for insert to anon, authenticated with check (true);

drop policy if exists magnet_requests_admin_read on public.magnet_requests;
create policy magnet_requests_admin_read on public.magnet_requests
  for select to authenticated using (public.is_admin());

drop policy if exists magnet_requests_public_insert on public.magnet_requests;
create policy magnet_requests_public_insert on public.magnet_requests
  for insert to anon, authenticated with check (true);
