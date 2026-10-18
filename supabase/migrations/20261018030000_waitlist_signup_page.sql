-- The page an early access signup happened on (/crews, /startups,
-- /early-access), so the ad test can be counted by page as well as by the ad
-- that brought the visitor (the utm_* columns, 20261018020000).

alter table public.waitlist
  add column if not exists signup_page text check (char_length(signup_page) <= 100 and signup_page like '/%');

comment on column public.waitlist.signup_page is 'Path of the page the signup form was on, without query string.';
