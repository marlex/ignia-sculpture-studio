-- Notify both the artist (confirmation) and the admin (needs review)
-- whenever a new artwork is submitted, via the same net.http_post + vault
-- pattern already used for registration notifications.
CREATE OR REPLACE FUNCTION public.notify_artwork_submitted()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_artist_email text;
  v_artist_name text;
BEGIN
  SELECT email, name INTO v_artist_email, v_artist_name
  FROM public.profiles WHERE id = NEW.artist_id;

  IF v_artist_email IS NOT NULL THEN
    PERFORM net.http_post(
      url := 'https://evgftbzwmlbzeuqbxynu.supabase.co/functions/v1/send-transactional-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'email_queue_service_role_key')
      ),
      body := jsonb_build_object(
        'templateName', 'artwork-received',
        'recipientEmail', v_artist_email,
        'templateData', jsonb_build_object('name', v_artist_name, 'title', NEW.title)
      )
    );
  END IF;

  PERFORM net.http_post(
    url := 'https://evgftbzwmlbzeuqbxynu.supabase.co/functions/v1/send-transactional-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'email_queue_service_role_key')
    ),
    body := jsonb_build_object(
      'templateName', 'admin-new-artwork',
      'templateData', jsonb_build_object('artistName', v_artist_name, 'title', NEW.title)
    )
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS artworks_notify_submitted ON public.artworks;
CREATE TRIGGER artworks_notify_submitted
AFTER INSERT ON public.artworks
FOR EACH ROW EXECUTE FUNCTION public.notify_artwork_submitted();
