
-- Lock down SECURITY DEFINER / helper functions: revoke public execute
REVOKE ALL ON FUNCTION public.has_role(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, text) TO service_role;

REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;

-- Replace overly-permissive INSERT policy on applications with a validated one
DROP POLICY IF EXISTS "Anyone can submit an application" ON public.applications;

CREATE POLICY "Anyone can submit an application"
ON public.applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL
  AND length(btrim(name)) BETWEEN 1 AND 200
  AND email IS NOT NULL
  AND length(email) BETWEEN 3 AND 300
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (social IS NULL OR length(social) <= 500)
  AND status = 'pending'
);
