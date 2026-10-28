-- prevent_profile_privilege_escalation() checks auth.uid(), which is NULL
-- for the service-role key used by edge functions (admin-approve-application,
-- send-application-email, etc.). That made the trigger block the very
-- first role-granting UPDATE on a freshly auto-created profile row
-- (e.g. right after admin.auth.admin.inviteUserByEmail), even though the
-- call came from a trusted, already-admin-gated edge function.
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'service_role' OR private.has_role(auth.uid(), 'admin') THEN
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
