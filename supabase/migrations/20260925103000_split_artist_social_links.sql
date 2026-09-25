-- Split the single "social" link into distinct Instagram/website/portfolio
-- fields. The `social` column was only just introduced (previous migration)
-- for the invited-artist registration form and isn't used anywhere else,
-- so it's safe to replace outright rather than keep both.
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS social,
  ADD COLUMN IF NOT EXISTS instagram TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS portfolio_url TEXT;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, requested_role, origin, technique, bio, instagram, website, portfolio_url, founding_artist)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'requested_role',
    NEW.raw_user_meta_data ->> 'origin',
    NEW.raw_user_meta_data ->> 'technique',
    NEW.raw_user_meta_data ->> 'bio',
    NEW.raw_user_meta_data ->> 'instagram',
    NEW.raw_user_meta_data ->> 'website',
    NEW.raw_user_meta_data ->> 'portfolio_url',
    coalesce((NEW.raw_user_meta_data ->> 'founding_artist')::boolean, false)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
