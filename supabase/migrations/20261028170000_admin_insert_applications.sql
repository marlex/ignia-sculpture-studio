-- The public "Anyone can submit an application" INSERT policy requires
-- status = 'pending', which blocks the admin "Invitar directamente" flow
-- (Solicitudes.tsx), which inserts a pre-accepted application directly.
-- Add a dedicated admin INSERT policy with no such restriction.
CREATE POLICY "Admins can insert applications"
ON public.applications FOR INSERT
TO authenticated
WITH CHECK (private.has_role(auth.uid(), 'admin'));
