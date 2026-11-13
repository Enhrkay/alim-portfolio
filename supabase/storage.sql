-- Create a PUBLIC Storage bucket called:
-- portfolio-media
--
-- Then run these policies.

drop policy if exists "public reads portfolio media" on storage.objects;
create policy "public reads portfolio media"
on storage.objects for select to public
using (bucket_id = 'portfolio-media');

drop policy if exists "admin uploads portfolio media" on storage.objects;
create policy "admin uploads portfolio media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'portfolio-media'
  and public.is_admin()
);

drop policy if exists "admin updates portfolio media" on storage.objects;
create policy "admin updates portfolio media"
on storage.objects for update to authenticated
using (
  bucket_id = 'portfolio-media'
  and public.is_admin()
)
with check (
  bucket_id = 'portfolio-media'
  and public.is_admin()
);

drop policy if exists "admin deletes portfolio media" on storage.objects;
create policy "admin deletes portfolio media"
on storage.objects for delete to authenticated
using (
  bucket_id = 'portfolio-media'
  and public.is_admin()
);
