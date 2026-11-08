-- artworks.image_url was always a single TEXT column, so the Publicar
-- form only ever let an artist upload one main photo (see Eric Vanel's
-- "Premeditation": one photo, because the form had no way to ask for
-- more). image_url stays as the cover photo everything already reads;
-- image_urls holds any additional main photos.
ALTER TABLE public.artworks ADD COLUMN IF NOT EXISTS image_urls TEXT[] NOT NULL DEFAULT '{}';
