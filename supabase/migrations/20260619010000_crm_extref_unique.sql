-- Fix: ingestLeads upserts with ON CONFLICT (kind, external_ref), but the
-- original unique index was PARTIAL (`where external_ref is not null`), and
-- Postgres ON CONFLICT inference can't match a partial index → "there is no
-- unique or exclusion constraint matching the ON CONFLICT specification".
--
-- Replace it with a plain unique index on (kind, external_ref). NULLs are
-- treated as distinct (default NULLS DISTINCT), so manual contacts with a NULL
-- external_ref still never collide — same effective guarantee, now ON-CONFLICT-able.
drop index if exists public.crm_contacts_extref_uq;
create unique index if not exists crm_contacts_extref_uq
  on public.crm_contacts (kind, external_ref);
