-- Rate-limit rows expire after a day.
--
-- check_signup_rate_limit only cleared a key's old rows when that same key came
-- back, so most rows were kept forever, and they held raw IP addresses while the
-- privacy policy says the IP is not stored. The app now sends a salted hash of
-- the route and the key (src/lib/rate-limit.ts), and every check here deletes
-- every row older than a day, the longest window any caller uses.

create or replace function public.check_signup_rate_limit(p_ip text, p_max integer default 5, p_window_secs integer default 3600)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_count int;
begin
  if p_ip is null or length(p_ip) = 0 then
    return false;
  end if;

  delete from public.signup_attempts
   where created_at < now() - interval '1 day';

  select count(*) into v_count
    from public.signup_attempts
   where ip = p_ip
     and created_at > now() - make_interval(secs => least(p_window_secs, 86400));

  if v_count >= p_max then
    return false;
  end if;

  insert into public.signup_attempts(ip) values (p_ip);
  return true;
end;
$function$;

-- The rows stored so far are raw IP addresses: none of them match a hashed key
-- any more, so they only ever counted against nobody. Drop them all.
delete from public.signup_attempts;
