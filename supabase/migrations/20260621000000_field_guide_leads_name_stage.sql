-- Add company_stage to field_guide_leads to mirror the magnet_requests schema.
-- recipient_name already exists (from 20260620000000_field_guide_links.sql).
alter table public.field_guide_leads add column if not exists company_stage text;
