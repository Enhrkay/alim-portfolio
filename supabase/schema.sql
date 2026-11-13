-- =========================================================
-- ALIM PERSONAL PORTFOLIO STUDIO
-- Single-user production schema.
-- =========================================================

create extension if not exists "pgcrypto";

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Alim Abdulwasiu',
  role text not null default 'AI Automation Engineer & Data Strategy Consultant',
  tagline text not null default '',
  bio text not null default '',
  email text,
  linkedin_url text,
  github_url text,
  youtube_url text,
  cv_url text,
  logo_url text,
  headshot_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.theme (
  id uuid primary key default gen_random_uuid(),
  primary_color text not null default '#0F7A4A',
  secondary_color text not null default '#0B3D2E',
  accent_color text not null default '#C8A96B',
  background_color text not null default '#FBFCFA',
  surface_color text not null default '#FFFFFF',
  text_color text not null default '#111A15',
  muted_color text not null default '#66736B',
  border_color text not null default '#DCE7E0',
  heading_font text not null default 'Manrope',
  body_font text not null default 'DM Sans',
  radius text not null default 'rounded' check (radius in ('square','soft','rounded')),
  card_style text not null default 'elevated' check (card_style in ('flat','soft','glass','elevated')),
  animation_level text not null default 'elegant' check (animation_level in ('minimal','elegant','dynamic')),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'Project',
  year text,
  description text not null default '',
  problem text,
  solution text,
  tools text[] not null default '{}',
  image_url text,
  live_url text,
  video_url text,
  github_url text,
  preview_mode text not null default 'image' check (preview_mode in ('image','live','none')),
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('training','student')),
  label text not null default '',
  title text not null,
  description text not null default '',
  playlist_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.section_settings (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  enabled boolean not null default true,
  sort_order integer not null default 0,
  title_override text
);

alter table public.admins enable row level security;
alter table public.profile enable row level security;
alter table public.theme enable row level security;
alter table public.projects enable row level security;
alter table public.playlists enable row level security;
alter table public.section_settings enable row level security;

revoke all on public.admins from anon, authenticated;
revoke all on public.profile from anon, authenticated;
revoke all on public.theme from anon, authenticated;
revoke all on public.projects from anon, authenticated;
revoke all on public.playlists from anon, authenticated;
revoke all on public.section_settings from anon, authenticated;

grant select on public.profile, public.theme, public.projects, public.playlists, public.section_settings to anon;
grant select, insert, update, delete on public.admins, public.profile, public.theme, public.projects, public.playlists, public.section_settings to authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where user_id = (select auth.uid())
  );
$$;

create policy "admin reads own membership"
on public.admins for select to authenticated
using (user_id = (select auth.uid()));

create policy "public reads profile"
on public.profile for select to anon, authenticated
using (true);

create policy "admin manages profile"
on public.profile for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads theme"
on public.theme for select to anon, authenticated
using (true);

create policy "admin manages theme"
on public.theme for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads published projects"
on public.projects for select to anon
using (status = 'published');

create policy "authenticated admin reads all projects"
on public.projects for select to authenticated
using (status = 'published' or public.is_admin());

create policy "admin manages projects"
on public.projects for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads published playlists"
on public.playlists for select to anon
using (status = 'published');

create policy "authenticated admin reads all playlists"
on public.playlists for select to authenticated
using (status = 'published' or public.is_admin());

create policy "admin manages playlists"
on public.playlists for all to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "public reads section settings"
on public.section_settings for select to anon, authenticated
using (true);

create policy "admin manages section settings"
on public.section_settings for all to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.theme (
  primary_color,
  secondary_color,
  accent_color,
  background_color,
  surface_color,
  text_color,
  muted_color,
  border_color
)
select
  '#0F7A4A',
  '#0B3D2E',
  '#C8A96B',
  '#FBFCFA',
  '#FFFFFF',
  '#111A15',
  '#66736B',
  '#DCE7E0'
where not exists (select 1 from public.theme);

insert into public.profile (
  full_name,
  role,
  tagline,
  bio
)
select
  'Alim Abdulwasiu',
  'AI Automation Engineer & Data Strategy Consultant',
  'I design intelligent automation systems, digital products and data-driven solutions that help organisations reduce manual work, make better decisions and scale operations.',
  'I work at the intersection of automation, data and practical learning. My work includes end-to-end automation, AI-enabled workflows, process design, digital products, analytics and practical technical training.'
where not exists (select 1 from public.profile);

insert into public.section_settings (section_key, enabled, sort_order)
values
  ('hero', true, 10),
  ('projects', true, 20),
  ('process', true, 30),
  ('training', true, 40),
  ('student_work', true, 50),
  ('about', true, 60),
  ('contact', true, 70)
on conflict (section_key) do nothing;

-- =========================================================
-- AFTER CREATING YOUR USER IN AUTHENTICATION > USERS:
--
-- insert into public.admins (user_id)
-- values ('YOUR-USER-UUID');
--
-- Only that authorised user can edit.
-- =========================================================
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
