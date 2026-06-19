-- Analytics reads filter pageviews/events by (property, time); the only existing
-- indexes were on session_id. Add the property+time indexes the dashboard uses.
create index if not exists site_pageviews_prop_time_idx on public.site_pageviews (property, viewed_at desc);
create index if not exists site_events_prop_time_idx on public.site_events (property, occurred_at desc);
