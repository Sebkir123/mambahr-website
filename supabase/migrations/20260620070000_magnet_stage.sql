-- Resource lead capture now records company stage for qualification.
alter table public.magnet_requests add column if not exists company_stage text;
