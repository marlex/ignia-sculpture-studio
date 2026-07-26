ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS estado_final boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS estado_confirmado_en timestamptz;