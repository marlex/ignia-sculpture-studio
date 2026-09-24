
-- email_queue_dispatch/email_queue_wake were created dynamically outside the
-- migration history by an external setup tool and may not exist on every
-- environment (e.g. a fresh project bootstrapped from this repo). Guard each
-- statement so this migration stays a no-op where the function is absent.
DO $$ BEGIN
  REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$ BEGIN
  REVOKE EXECUTE ON FUNCTION public.email_queue_wake() FROM PUBLIC, anon, authenticated;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$ BEGIN
  GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;

DO $$ BEGIN
  GRANT EXECUTE ON FUNCTION public.email_queue_wake() TO service_role;
EXCEPTION WHEN undefined_function THEN NULL;
END $$;
