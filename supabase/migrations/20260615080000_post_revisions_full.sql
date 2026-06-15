-- Revisions previously snapshotted only title + body_json. Add the rendered
-- HTML and excerpt so a restored revision carries the full editorial content,
-- and so the history panel can preview a revision without re-rendering it.
alter table public.post_revisions add column if not exists body_html text;
alter table public.post_revisions add column if not exists excerpt   text;
