-- Scheduled posts could never go live. The public read policy requires
-- status='published' with published_at<=now(), but the Schedule action only set
-- status='scheduled' + scheduled_for and nothing ever promoted the row — so a
-- scheduled post stayed invisible forever. Fix it two ways:
--   1. RLS also surfaces a scheduled post once its time has passed, so going
--      live is instant and survives the cron being paused.
--   2. A per-minute pg_cron job rewrites due rows to status='published' so the
--      stored status stays honest (admin counts, SEO page, etc.).

-- 1 ── Public read: published, OR scheduled-and-due.
drop policy if exists posts_public_read on public.posts;
create policy posts_public_read on public.posts
  for select using (
    (status = 'published' and published_at is not null and published_at <= now())
    or (status = 'scheduled' and scheduled_for is not null and scheduled_for <= now())
  );

-- View counter: count a due scheduled post too (it is publicly visible).
create or replace function public.increment_post_view(p_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_id uuid;
begin
  select id into v_id from public.posts
    where slug = p_slug
      and (
        (status = 'published' and published_at is not null and published_at <= now())
        or (status = 'scheduled' and scheduled_for is not null and scheduled_for <= now())
      );
  if v_id is null then return; end if;
  insert into public.post_views (post_id, day, count)
    values (v_id, current_date, 1)
  on conflict (post_id, day) do update set count = public.post_views.count + 1;
end $$;

grant execute on function public.increment_post_view(text) to anon, authenticated;

-- 2 ── Promote due scheduled posts to published. SECURITY DEFINER so the cron
-- job (and only it) can rewrite rows; returns how many were promoted.
create or replace function public.promote_due_posts()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  update public.posts
     set status = 'published',
         published_at = coalesce(published_at, scheduled_for),
         scheduled_for = null
   where status = 'scheduled'
     and scheduled_for is not null
     and scheduled_for <= now();
  get diagnostics n = row_count;
  return n;
end $$;

revoke all on function public.promote_due_posts() from public, anon, authenticated;

-- Per-minute schedule. pg_cron 1.6 upserts by job name, so this is idempotent.
create extension if not exists pg_cron;
select cron.schedule('promote-due-posts', '* * * * *', $$ select public.promote_due_posts(); $$);
