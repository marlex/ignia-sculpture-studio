-- Artist registration fields (filled in after approval, before publishing).
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS origin TEXT,
  ADD COLUMN IF NOT EXISTS technique TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT;

-- Storage bucket for real artwork photos, one folder per artist (<user_id>/file.jpg).
INSERT INTO storage.buckets (id, name, public)
VALUES ('artwork-images', 'artwork-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view artwork images" ON storage.objects;
CREATE POLICY "Public can view artwork images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'artwork-images');

DROP POLICY IF EXISTS "Artists manage own artwork images" ON storage.objects;
CREATE POLICY "Artists manage own artwork images"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'artwork-images' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'artwork-images' AND (storage.foldername(name))[1] = auth.uid()::text);
