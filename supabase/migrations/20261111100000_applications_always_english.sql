-- Same bug as handle_new_user() before 20261029140000, in a parallel path
-- that fix never touched: submit_application() stored p_language = whatever
-- the join page's current UI language happened to be (itself driven by a
-- stale per-browser localStorage value, not a deliberate choice), and
-- admin-approve-application then used that stored value to pick the
-- founding-artist-welcome email's language. A visitor with a stale "es" in
-- their browser could silently get a Spanish application record and,
-- later, a Spanish welcome email. Every application is now always recorded
-- in English, full stop, same as every new profile.
CREATE OR REPLACE FUNCTION public.submit_application(
  p_name text,
  p_email text,
  p_social text DEFAULT NULL,
  p_language text DEFAULT 'en'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  IF p_name IS NULL OR length(btrim(p_name)) < 1 OR length(btrim(p_name)) > 200 THEN
    RAISE EXCEPTION 'invalid name';
  END IF;
  IF p_email IS NULL OR length(p_email) < 3 OR length(p_email) > 300
     OR p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'invalid email';
  END IF;
  IF p_social IS NOT NULL AND length(p_social) > 500 THEN
    RAISE EXCEPTION 'invalid social';
  END IF;

  INSERT INTO public.applications (name, email, social, language, locale)
  VALUES (p_name, p_email, p_social, 'en', 'en')
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_application(text, text, text, text) TO anon, authenticated;
