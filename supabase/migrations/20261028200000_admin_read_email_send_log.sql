-- email_send_log only had a service-role SELECT policy, so the admin UI
-- (using the signed-in admin's own session, not the service-role key)
-- could never show a real send history. Let admins read it directly, so
-- Admin can display an actual audit trail instead of admins having to take
-- an action's word for it that an email went out.
CREATE POLICY "Admins can read email send log"
ON public.email_send_log FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));
