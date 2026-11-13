# Alim Portfolio - Cinematic V2 Upgrade

## What this upgrade adds

- Richer cinematic hero lighting and contrast.
- Larger, easier-to-read body copy.
- Less white-on-white visual fatigue.
- Live website previews for projects set to `Preview Mode = Live Website`.
- Screenshot underlay/fallback and full-site button for live previews.
- New Data Intelligence section for Power BI, Tableau, SQL, Python and analytics work.
- New Admin > Data Intelligence CMS.
- New Workflow Showcase carousel.
- New Admin > Workflow Showcase CMS with direct image upload.
- Training and Student Work merged into one Showcase story.
- Student Outcomes folded into a compact outcomes ribbon.
- Simplified public navigation: Work, Data Intelligence, Process, Showcase, Profile, Let's Talk.
- Explicit `turbopack.root` configuration to avoid the nested-lockfile workspace warning.

## Upgrade an existing local project

1. Back up your current project folder.
2. Copy the files from this package over your existing project, preserving your existing `.env.local`.
3. In Supabase Dashboard > SQL Editor, run:

   `supabase/upgrade_cinematic_v2.sql`

4. From the actual inner project folder run:

   `Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue`

   `npm.cmd install`

   `npm.cmd run dev`

5. Open `http://localhost:3000` and hard refresh with `Ctrl + Shift + R`.

## New admin areas

### Admin > Projects

Set `Preview Mode` to `Live Website` and provide a Live URL. The public portfolio lazy-loads the site inside a browser-style frame when the project approaches the viewport.

Note: a third-party site can block iframe embedding with CSP/X-Frame-Options. Your screenshot remains useful as the visual fallback and the `Open Live Project` link always remains available.

### Admin > Data Intelligence

Add:
- Title
- Subtitle
- Description
- Business Question
- Data Context
- Key Insight
- Tools
- Dashboard Screenshot
- Embed URL
- Full Dashboard / Case Study URL

For Power BI, only use Publish-to-web/public embedding when the underlying data is safe to make public. For private dashboards, use a screenshot and a controlled case-study link instead.

### Admin > Workflow Showcase

Upload screenshots directly and add them to the horizontal cinematic carousel. Good examples include:
- n8n canvases
- Make.com scenarios
- architecture diagrams
- automation maps
- dashboard screenshots
- behind-the-scenes build views

### Admin > Content

Your existing Training and Student playlist collections continue to work. Cinematic V2 presents them together under Showcase rather than as two visually disconnected public sections.
