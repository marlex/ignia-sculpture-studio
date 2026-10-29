-- Clean up leftover test accounts from the publish/approval flow testing.
-- profiles.id -> auth.users(id) and artworks.artist_id -> profiles(id) both
-- cascade, so deleting the auth user removes the profile and any artworks.
DELETE FROM public.applications
WHERE email IN (
  'magbolivar+flowtest@gmail.com',
  'magbolivar+flowtest2@gmail.com',
  'magbolivar+pruebafinal@gmail.com'
);

DELETE FROM auth.users
WHERE email IN (
  'magbolivar+flowtest@gmail.com',
  'magbolivar+flowtest2@gmail.com',
  'magbolivar+pruebafinal@gmail.com'
);
