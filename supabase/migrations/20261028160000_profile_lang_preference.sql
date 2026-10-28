-- Persist each profile's preferred language so an artist's My Studio
-- login defaults to the language they last chose, on any device.
alter table public.profiles
  add column if not exists lang text not null default 'es'
  check (lang in ('es', 'en'));
