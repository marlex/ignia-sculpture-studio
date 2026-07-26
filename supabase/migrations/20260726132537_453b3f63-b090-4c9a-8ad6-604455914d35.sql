
CREATE TYPE public.artwork_status AS ENUM ('pendiente', 'aprobada', 'rechazada');

CREATE TABLE public.artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price NUMERIC,
  year INT,
  medium TEXT,
  dimensions TEXT,
  status public.artwork_status NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.artworks TO authenticated;
GRANT ALL ON public.artworks TO service_role;

ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists manage own artworks" ON public.artworks
  FOR ALL TO authenticated
  USING (artist_id = auth.uid())
  WITH CHECK (artist_id = auth.uid());

CREATE POLICY "Admins view all artworks" ON public.artworks
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

CREATE POLICY "Admins update all artworks" ON public.artworks
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

CREATE POLICY "Admins delete all artworks" ON public.artworks
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

CREATE TRIGGER trg_artworks_updated_at
BEFORE UPDATE ON public.artworks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX artworks_artist_id_idx ON public.artworks(artist_id);
CREATE INDEX artworks_status_idx ON public.artworks(status);
