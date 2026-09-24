-- Hybrid self-registration: capture what a self-signed-up user asked to be
-- (artist or collector) at signup time. The real `role` column stays NULL
-- (the existing "pending" convention already used by Login.tsx) until an
-- admin confirms it.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS requested_role text CHECK (requested_role IN ('artist', 'collector'));
