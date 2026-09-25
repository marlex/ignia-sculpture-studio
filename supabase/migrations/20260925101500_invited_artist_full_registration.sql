-- Personally-invited artists register in one step (not a light application
-- followed by a separate profile-completion page): they sign up with
-- everything at once — name, portfolio link, origin, technique, bio — and
-- are marked as a founding artist automatically.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS social TEXT;

-- Extend the same trigger that already fills profiles.requested_role from
-- signUp() metadata to also carry these fields through, since it's an
-- INSERT (not an UPDATE) and so isn't subject to the privilege-escalation
-- guard on founding_artist.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, requested_role, origin, technique, bio, social, founding_artist)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'requested_role',
    NEW.raw_user_meta_data ->> 'origin',
    NEW.raw_user_meta_data ->> 'technique',
    NEW.raw_user_meta_data ->> 'bio',
    NEW.raw_user_meta_data ->> 'social',
    coalesce((NEW.raw_user_meta_data ->> 'founding_artist')::boolean, false)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
