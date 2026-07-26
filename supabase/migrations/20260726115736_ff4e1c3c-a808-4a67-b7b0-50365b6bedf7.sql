
-- Gender enum + column on profiles
DO $$ BEGIN
  CREATE TYPE public.gender_option AS ENUM ('female','male','non_binary','prefer_not_to_say','other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender public.gender_option;

-- artwork event type
DO $$ BEGIN
  CREATE TYPE public.artwork_event_type AS ENUM ('view','ar_activated','3d_activated','favorited','inquiry');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- artwork_events table
CREATE TABLE IF NOT EXISTS public.artwork_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id text NOT NULL,
  event_type public.artwork_event_type NOT NULL,
  visitor_country text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS artwork_events_artwork_idx ON public.artwork_events(artwork_id);
CREATE INDEX IF NOT EXISTS artwork_events_type_idx ON public.artwork_events(event_type);
CREATE INDEX IF NOT EXISTS artwork_events_created_idx ON public.artwork_events(created_at DESC);

GRANT INSERT ON public.artwork_events TO anon, authenticated;
GRANT SELECT ON public.artwork_events TO authenticated;
GRANT ALL ON public.artwork_events TO service_role;

ALTER TABLE public.artwork_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert artwork events"
  ON public.artwork_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    artwork_id IS NOT NULL
    AND length(btrim(artwork_id)) BETWEEN 1 AND 200
    AND (visitor_country IS NULL OR length(visitor_country) <= 100)
  );

CREATE POLICY "Admins can view artwork events"
  ON public.artwork_events FOR SELECT
  TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
