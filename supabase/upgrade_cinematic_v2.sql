-- =========================================================
-- ALIM PORTFOLIO CINEMATIC V2 UPGRADE
-- Run once in Supabase SQL Editor for an existing installation.
-- Safe to run more than once.
-- =========================================================

create table if not exists public.analytics_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text not null default '',
  business_question text,
  data_context text,
  key_insight text,
  tools text[] not null default '{}',
  image_url text,
  embed_url text,
  live_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.showcase_media (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text,
  image_url text not null,
  category text not null default 'Workflow',
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.analytics_projects enable row level security;
alter table public.showcase_media enable row level security;

revoke all on public.analytics_projects from anon, authenticated;
revoke all on public.showcase_media from anon, authenticated;

grant select on public.analytics_projects, public.showcase_media to anon;
grant select, insert, update, delete on public.analytics_projects, public.showcase_media to authenticated;

drop policy if exists "public reads published analytics projects" on public.analytics_projects;
create policy "public reads published analytics projects"
on public.analytics_projects for select to anon
using (status = 'published');

drop policy if exists "authenticated admin reads all analytics projects" on public.analytics_projects;
create policy "authenticated admin reads all analytics projects"
on public.analytics_projects for select to authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "admin manages analytics projects" on public.analytics_projects;
create policy "admin manages analytics projects"
on public.analytics_projects for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public reads published showcase media" on public.showcase_media;
create policy "public reads published showcase media"
on public.showcase_media for select to anon
using (status = 'published');

drop policy if exists "authenticated admin reads all showcase media" on public.showcase_media;
create policy "authenticated admin reads all showcase media"
on public.showcase_media for select to authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "admin manages showcase media" on public.showcase_media;
create policy "admin manages showcase media"
on public.showcase_media for all to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.section_settings (section_key, enabled, sort_order)
values
  ('data', true, 30),
  ('showcase', true, 50)
on conflict (section_key) do update
set enabled = excluded.enabled,
    sort_order = excluded.sort_order;

-- The old training/student_work settings can remain in the database.
-- Cinematic V2 combines those collections inside the single Showcase section.
