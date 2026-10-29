-- The English-default-language migration (20261028190000) accidentally
-- recreated handle_new_user() from an older copy: it inserted into
-- profiles.social (dropped weeks ago in favor of instagram/website/
-- portfolio_url) and dropped the "name" column from the insert. Every new
-- signup since then has failed with "Database error saving new user"
-- because the INSERT referenced a column that no longer exists.
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
    CASE WHEN NEW.raw_user_meta_data ->> 'lang' = 'es' THEN 'es' ELSE 'en' END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
