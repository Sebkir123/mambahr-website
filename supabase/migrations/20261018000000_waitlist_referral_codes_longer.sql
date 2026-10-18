-- Referral codes are public by design (the share link, the QR on the pass),
-- and a valid code shows the referring company's name on /early-access. At 8
-- hex characters from random() (32 bits), someone requesting codes at random
-- could, at scale, learn which companies are on the list without being given
-- a link. New codes are 12 hex characters (48 bits) from gen_random_uuid(),
-- the same secure source as pass_token; the first 12 characters of a v4 UUID
-- are all random. Existing 8-character codes stay valid: the site accepts both
-- lengths (src/lib/early-access.ts).
alter table public.waitlist
  alter column referral_code set default substr(replace(gen_random_uuid()::text, '-', ''), 1, 12);
