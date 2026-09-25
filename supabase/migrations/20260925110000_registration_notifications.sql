-- Persist the applicant's name (collected at signUp but previously discarded)
-- and track when a profile's role was actually approved, so we can later
-- find "approved N hours ago" for reminder emails.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, requested_role, origin, technique, bio, instagram, website, portfolio_url, founding_artist)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'name',
    NEW.raw_user_meta_data ->> 'requested_role',
    NEW.raw_user_meta_data ->> 'origin',
    NEW.raw_user_meta_data ->> 'technique',
    NEW.raw_user_meta_data ->> 'bio',
    NEW.raw_user_meta_data ->> 'instagram',
    NEW.raw_user_meta_data ->> 'website',
    NEW.raw_user_meta_data ->> 'portfolio_url',
    coalesce((NEW.raw_user_meta_data ->> 'founding_artist')::boolean, false)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Stamp approved_at the moment a profile's role moves from pending (NULL) to
-- set. Separate from the existing privilege-escalation guard trigger so we
-- don't touch that logic.
CREATE OR REPLACE FUNCTION public.stamp_profile_approved_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.role IS NULL AND NEW.role IS NOT NULL THEN
    NEW.approved_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_stamp_approved_at ON public.profiles;
CREATE TRIGGER profiles_stamp_approved_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.stamp_profile_approved_at();

-- Notify the admin by email whenever a new self-registered account appears
-- (pending review), via the same net.http_post + vault pattern already used
-- by the process-email-queue cron job.
CREATE OR REPLACE FUNCTION public.notify_admin_new_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.requested_role IS NOT NULL THEN
    PERFORM net.http_post(
      url := 'https://evgftbzwmlbzeuqbxynu.supabase.co/functions/v1/send-transactional-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'email_queue_service_role_key')
      ),
      body := jsonb_build_object(
        'templateName', 'admin-new-artist-registration',
        'templateData', jsonb_build_object(
          'name', NEW.name,
          'email', NEW.email,
          'requestedRole', NEW.requested_role
        )
      )
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_notify_admin_new_registration ON public.profiles;
CREATE TRIGGER profiles_notify_admin_new_registration
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.notify_admin_new_registration();

-- Daily check (once a day is enough — the function itself windows to ~24h
-- since approval) for artists who haven't published anything yet.
SELECT cron.unschedule('remind-artists-no-artwork')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'remind-artists-no-artwork');

SELECT cron.schedule(
  'remind-artists-no-artwork',
  '0 12 * * *',
  $cron$
  SELECT
    net.http_post(
      url := 'https://evgftbzwmlbzeuqbxynu.supabase.co/functions/v1/remind-artists-no-artwork',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'email_queue_service_role_key')
      ),
      body := '{}'::jsonb
    ) AS request_id;
  $cron$
);
