-- New users can't insert their own profiles.row when email confirmation is
-- required, because auth.signUp() returns no session until the email is
-- confirmed, so the client-side insert runs unauthenticated and RLS blocks
-- it ("new row violates row-level security policy for table profiles").
-- Create the profile server-side instead, via a SECURITY DEFINER trigger on
-- auth.users, reading requested_role from the signUp() metadata.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, requested_role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'requested_role'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
