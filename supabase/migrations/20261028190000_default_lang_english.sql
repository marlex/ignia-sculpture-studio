-- Most artists on the platform are English speakers; English should be the
-- default language whenever we don't have an explicit signal, not Spanish.
ALTER TABLE public.profiles ALTER COLUMN lang SET DEFAULT 'en';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, requested_role, origin, technique, bio, social, founding_artist, lang)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'requested_role',
    NEW.raw_user_meta_data ->> 'origin',
    NEW.raw_user_meta_data ->> 'technique',
    NEW.raw_user_meta_data ->> 'bio',
    NEW.raw_user_meta_data ->> 'social',
    coalesce((NEW.raw_user_meta_data ->> 'founding_artist')::boolean, false),
    CASE WHEN NEW.raw_user_meta_data ->> 'lang' = 'es' THEN 'es' ELSE 'en' END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
