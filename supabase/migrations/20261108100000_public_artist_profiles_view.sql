-- profiles is locked down to "own row or admin" (see
-- 20260726112032_...sql), which is correct — it holds email and other
-- account data. But that also means the public site can't read an
-- artist's name/bio/instagram to show their work in the public
-- catalogue or on a profile page. Expose only the safe, non-account
-- columns, and only for artists who actually have a published work,
-- through a view with its own narrower grant.
CREATE OR REPLACE VIEW public.public_artist_profiles
WITH (security_invoker = false) AS
SELECT p.id, p.name, p.origin, p.technique, p.bio, p.instagram, p.website, p.portfolio_url
FROM public.profiles p
WHERE p.role = 'artist'
  AND EXISTS (
    SELECT 1 FROM public.artworks a
    WHERE a.artist_id = p.id AND a.status = 'aprobada'
  );

GRANT SELECT ON public.public_artist_profiles TO anon, authenticated;
