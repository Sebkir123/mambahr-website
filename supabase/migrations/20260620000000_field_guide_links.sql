-- Let admins create their own TRACKED field-guide share links (like deck links),
-- not just passively capture form fills. Such links have no email — they identify
-- the recipient by name — so email becomes nullable; add recipient/source/author.
alter table public.field_guide_leads alter column email drop not null;
alter table public.field_guide_leads add column if not exists recipient_name text;
alter table public.field_guide_leads add column if not exists source text not null default 'form'; -- form | manual
alter table public.field_guide_leads add column if not exists created_by text;
