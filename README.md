# Alim Personal Portfolio Studio

This is the **single-user production edition** of the portfolio system.

It is deliberately separate from the multi-tenant SaaS build.

## Purpose

This version is only for Alim Abdulwasiu.

There is:
- no public signup,
- no workspace onboarding,
- no customer tenants,
- no subdomain routing,
- no user theme sharing.

There is only:
- one public portfolio,
- one private admin studio,
- one authorised admin identity.

## Included

### Public portfolio
- premium responsive hero
- projects
- Vercel/live-project links
- YouTube demos
- GitHub links
- signature process
- training playlists
- student testimonials/capstones
- professional profile
- contact links
- configurable branding
- mobile/tablet/laptop support

### Admin
- secure login
- admin UUID allowlist
- dashboard
- project management
- draft/published projects
- profile editor
- logo/headshot URLs
- direct image uploader
- training/student playlist manager
- premium colour editor
- typography controls
- card/corner/animation controls
- section show/hide settings

### Security
Security is not based on hiding `/admin`.

The system uses:
1. Supabase Auth
2. `admins` allowlist table
3. RLS
4. server-side admin checks
5. storage policies

Public visitors can only read published content.

## Setup

### 1. Create Supabase project

Copy:

```text
.env.example
```

to:

```text
.env.local
```

Fill:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Run database schema

In Supabase SQL Editor run:

```text
supabase/schema.sql
```

### 3. Create your one admin account

Supabase:

```text
Authentication
→ Users
→ Add user
```

Create your email/password login.

Copy the User UUID.

Then SQL Editor:

```sql
insert into public.admins (user_id)
values ('YOUR-USER-UUID');
```

Do not add anyone else unless you want them to have admin access.

### 4. Create Storage bucket

Supabase:

```text
Storage
→ New bucket
```

Name:

```text
portfolio-media
```

Make it public.

Then run:

```text
supabase/storage.sql
```

### 5. Install

PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
```

Public portfolio:

```text
http://localhost:3000
```

Private admin:

```text
http://localhost:3000/admin
```

## Normal day-to-day use

You should not need to edit code.

Use:

```text
/admin/projects
```

for projects.

Use:

```text
/admin/content
```

for:
- headshot
- logo
- bio
- social links
- YouTube playlists
- student testimonials
- capstones

Use:

```text
/admin/design
```

for:
- primary colour
- secondary colour
- accent
- background
- typography
- corners
- cards
- animation

Use:

```text
/admin/settings
```

to hide/show portfolio sections.

## Publishing

Projects support:

```text
Draft
Published
```

Draft projects are visible in Admin but not on the public portfolio.

Switch to Published and save.

The live portfolio updates without a Vercel redeployment.

## Media uploader

Admin → Content includes a direct image uploader.

Upload:
- headshot
- logo
- project screenshot

It returns a public URL.

Copy that URL into the appropriate profile/project field.

## Vercel

Push the folder to GitHub.

Import it into Vercel.

Add the same Supabase environment variables to Vercel.

Deploy.

Normal content edits happen in Supabase through the admin studio, so they do not require repeated deployments.

## Future

Keep the separate multi-tenant SaaS project for the global platform.

Use this project as your personal production portfolio now.

## Cinematic V2.4

This build adds a decisive dark cinematic middle act for Data Intelligence, Process, and Showcase; a bento-style media wall; stronger typography and spacing; a Git-safe `.gitignore`; and a GitHub/Vercel deployment guide.
