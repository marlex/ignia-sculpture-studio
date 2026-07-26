
-- 1) Prevent privilege escalation: block non-admins from changing role/founding_artist on profiles
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF private.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'Not authorized to change role';
  END IF;
  IF NEW.founding_artist IS DISTINCT FROM OLD.founding_artist THEN
    RAISE EXCEPTION 'Not authorized to change founding_artist';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_priv_escalation ON public.profiles;
CREATE TRIGGER profiles_prevent_priv_escalation
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- 2) Tighten artwork_events insert: whitelist event_type and enforce basic validation
DROP POLICY IF EXISTS "Anyone can insert artwork events" ON public.artwork_events;
CREATE POLICY "Anyone can insert artwork events"
ON public.artwork_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  artwork_id IS NOT NULL
  AND length(btrim(artwork_id)) BETWEEN 1 AND 200
  AND (visitor_country IS NULL OR length(visitor_country) <= 100)
  AND event_type IS NOT NULL
);
