-- Applied on T65 Daily Command Center (lyvhrxiukmlvrznkrtkv) only.
-- Companion to website-delivery-retry.sql. Do not apply to supabase/schema.sql.
--
-- Cron reads the retry ingress key from vault at run time. The job command
-- must never contain a raw key. The delivery-retry key cannot capture leads.

select cron.schedule(
  'website-delivery-retry',
  '*/5 * * * *',
  $cron$
  select net.http_post(
    url := 'https://lyvhrxiukmlvrznkrtkv.supabase.co/functions/v1/website-inquiry',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-website-key', coalesce(
        (select decrypted_secret from vault.decrypted_secrets where name = 'website_delivery_retry_key'),
        ''
      )
    ),
    body := '{"action":"retry_deliveries"}'::jsonb
  );
  $cron$
);
