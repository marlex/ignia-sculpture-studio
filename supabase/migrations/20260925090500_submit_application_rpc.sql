-- Anonymous applicants can INSERT into applications (see "Anyone can submit
-- an application" policy), but there's no SELECT policy for anon — by
-- design, so a visitor can't list everyone else's applications. That means
-- `.insert(...).select("id")` fails RLS, because PostgREST's RETURNING
-- clause needs SELECT visibility on the row it just inserted. Route the
-- submission through a SECURITY DEFINER function instead: it bypasses RLS
-- for this one controlled operation and returns just the new id.
CREATE OR REPLACE FUNCTION public.submit_application(
  p_name text,
  p_email text,
  p_social text DEFAULT NULL,
  p_language text DEFAULT 'es'
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
  VALUES (p_name, p_email, p_social, coalesce(p_language, 'es'), coalesce(p_language, 'es'))
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_application(text, text, text, text) TO anon, authenticated;
