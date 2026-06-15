-- Make scheduled posts go live automatically at their scheduled time — no cron.
-- The public read policy now also surfaces a 'scheduled' row once scheduled_for
-- has passed, so a post published-on-a-schedule appears the moment its time
-- arrives and disappears from "draft/scheduled" only in the editorial sense.
--
-- A future-dated 'published' row stays hidden until published_at <= now(), so
-- editors can also "publish" with a future date and get the same behavior.

drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts
  for select using (
    (status = 'published' and published_at is not null and published_at <= now())
    or
    (status = 'scheduled' and scheduled_for is not null and scheduled_for <= now())
  );
