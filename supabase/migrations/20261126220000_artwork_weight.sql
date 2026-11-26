-- Weight of the work in kg (including base/plinth), asked in the artist
-- upload form. Needed for the public technical sheet and for shipping quotes.
alter table public.artworks
  add column if not exists weight_kg numeric(8,2)
  check (weight_kg is null or weight_kg > 0);
