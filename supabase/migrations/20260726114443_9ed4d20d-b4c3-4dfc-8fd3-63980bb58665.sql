
-- Create private schema not exposed via PostgREST
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- Recreate has_role in private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, text) TO authenticated, service_role;

-- Rebuild applications policies to reference private.has_role
DROP POLICY IF EXISTS "Admins can view applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can delete applications" ON public.applications;

CREATE POLICY "Admins can view applications"
ON public.applications FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications"
ON public.applications FOR UPDATE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete applications"
ON public.applications FOR DELETE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

-- Drop the public has_role now that no policy references it
DROP FUNCTION IF EXISTS public.has_role(uuid, text);
