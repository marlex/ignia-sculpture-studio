-- handle_new_user() was reading lang from the signup form's metadata, which
-- just reflects whatever language the public page happened to be showing
-- (itself driven by a per-browser localStorage value, not a real choice).
-- That let a stale "es" in someone's browser silently make a brand-new
-- profile — and every email to it — default to Spanish. Every new profile
-- is now always created in English, full stop; an artist can still switch
-- their own language afterwards from their dashboard.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, requested_role, origin, technique, bio, instagram, website, portfolio_url, founding_artist, lang)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'name',
    NEW.raw_user_meta_data ->> 'requested_role',
    NEW.raw_user_meta_data ->> 'origin',
    NEW.raw_user_meta_data ->> 'technique',
    NEW.raw_user_meta_data ->> 'bio',
    NEW.raw_user_meta_data ->> 'instagram',
    NEW.raw_user_meta_data ->> 'website',
    NEW.raw_user_meta_data ->> 'portfolio_url',
    coalesce((NEW.raw_user_meta_data ->> 'founding_artist')::boolean, false),
    'en'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
