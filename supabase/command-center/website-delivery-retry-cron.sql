-- Point the five-minute retry cron at the live website.
-- The website already has RESEND_*; cron auth uses vault key
-- website_delivery_retry_key, which must match COMMAND_CENTER_INGEST_KEY
-- (same value Netlify uses). Do not put Resend secrets in this file.

select cron.unschedule(jobid)
  from cron.job
 where jobname = 'website-delivery-retry';

select cron.schedule(
  'website-delivery-retry',
  '*/5 * * * *',
  $cron$
  select net.http_post(
    url := 'https://christianbrinkleync.com/api/cron/delivery-retry',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-website-key', coalesce(
        (select decrypted_secret from vault.decrypted_secrets where name = 'website_delivery_retry_key'),
        ''
      )
    ),
    body := '{}'::jsonb
  );
  $cron$
);
