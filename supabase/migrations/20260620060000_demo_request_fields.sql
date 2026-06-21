-- Demo booking form now captures full name + company size for lead qualification.
alter table public.demo_requests add column if not exists name text;
alter table public.demo_requests add column if not exists company_size text;
