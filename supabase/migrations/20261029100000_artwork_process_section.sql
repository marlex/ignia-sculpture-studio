-- Optional "process" section on Publicar: a short story plus photos of how
-- the piece was made, shown alongside the artwork later on its public page.
ALTER TABLE public.artworks
  ADD COLUMN IF NOT EXISTS process_story TEXT,
  ADD COLUMN IF NOT EXISTS process_photo_urls TEXT[] NOT NULL DEFAULT '{}';
