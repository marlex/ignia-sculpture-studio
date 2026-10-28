-- 3D pipeline MVP: artist uploads a turntable video, admin attaches the
-- resulting .glb by hand while scanning is manual. Also gives every
-- artwork a real (DB-generated, unique) authenticity code instead of the
-- hand-written placeholders used on the seed artists.

ALTER TABLE public.artworks
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS glb_url TEXT,
  ADD COLUMN IF NOT EXISTS model_status TEXT NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS authenticity_code TEXT;

ALTER TABLE public.artworks
  DROP CONSTRAINT IF EXISTS artworks_model_status_check;
ALTER TABLE public.artworks
  ADD CONSTRAINT artworks_model_status_check CHECK (model_status IN ('none', 'processing', 'ready'));

CREATE OR REPLACE FUNCTION public.generate_authenticity_code()
RETURNS TEXT
LANGUAGE sql
AS $$
  SELECT '0x' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 4) || '…' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 3);
$$;

ALTER TABLE public.artworks
  ALTER COLUMN authenticity_code SET DEFAULT public.generate_authenticity_code();

UPDATE public.artworks SET authenticity_code = public.generate_authenticity_code() WHERE authenticity_code IS NULL;

ALTER TABLE public.artworks
  ALTER COLUMN authenticity_code SET NOT NULL;
ALTER TABLE public.artworks
  DROP CONSTRAINT IF EXISTS artworks_authenticity_code_unique;
ALTER TABLE public.artworks
  ADD CONSTRAINT artworks_authenticity_code_unique UNIQUE (authenticity_code);

-- Storage bucket for the source video and the resulting glb model.
INSERT INTO storage.buckets (id, name, public)
VALUES ('artwork-media', 'artwork-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view artwork media" ON storage.objects;
CREATE POLICY "Public can view artwork media"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'artwork-media');

DROP POLICY IF EXISTS "Artists manage own artwork media" ON storage.objects;
CREATE POLICY "Artists manage own artwork media"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'artwork-media' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'artwork-media' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Admins manage all artwork media" ON storage.objects;
CREATE POLICY "Admins manage all artwork media"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'artwork-media' AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (bucket_id = 'artwork-media' AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
