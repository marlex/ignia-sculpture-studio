-- admin-new-artist-registration, admin-new-artwork and artwork-received were
-- hardcoded Spanish-only templates with no lang support at all, bypassing
-- the site's English-by-default rule entirely. The two admin-facing ones
-- are now always English (internal notification); artwork-received now
-- reads the artist's own profile.lang, defaulting to English.
CREATE OR REPLACE FUNCTION public.notify_artwork_submitted()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_artist_email text;
  v_artist_name text;
  v_artist_lang text;
BEGIN
  SELECT email, name, lang INTO v_artist_email, v_artist_name, v_artist_lang
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
        'templateData', jsonb_build_object(
          'name', v_artist_name,
          'title', NEW.title,
          'lang', CASE WHEN v_artist_lang = 'es' THEN 'es' ELSE 'en' END
        )
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
