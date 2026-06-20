-- Storage bucket for images attached to social posts. Images are uploaded by
-- admins (service role, bypasses RLS) and are publicly readable — they end up
-- public on LinkedIn anyway, and the publish path fetches the bytes back out by
-- public URL to hand off to LinkedIn's image upload endpoint.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'social-images',
  'social-images',
  true,
  8388608, -- 8 MB
  array['image/png','image/jpeg','image/webp','image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Public read of objects in this bucket (bucket.public also covers the public
-- URL, but an explicit select policy keeps the SDK list/download paths working).
drop policy if exists social_images_public_read on storage.objects;
create policy social_images_public_read on storage.objects
  for select using (bucket_id = 'social-images');

-- Admins may manage objects directly (the upload action uses the service role,
-- which bypasses RLS — this is defense in depth for any authenticated path).
drop policy if exists social_images_admin_write on storage.objects;
create policy social_images_admin_write on storage.objects
  for all using (bucket_id = 'social-images' and public.is_admin())
  with check (bucket_id = 'social-images' and public.is_admin());
