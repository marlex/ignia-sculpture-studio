ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'es'
  CHECK (language IN ('es','en'));