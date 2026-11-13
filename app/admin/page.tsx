import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const [{ count: projects }, { count: analytics }, { count: showcase }, { count: playlists }] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("analytics_projects").select("*", { count: "exact", head: true }),
    supabase.from("showcase_media").select("*", { count: "exact", head: true }),
    supabase.from("playlists").select("*", { count: "exact", head: true }),
  ]);

  return (
    <AdminShell title="Overview" subtitle="Manage the complete portfolio without touching code.">
      <section className="admin-stats">
        <article><small>PROJECTS</small><strong>{projects ?? 0}</strong></article>
        <article><small>DATA WORK</small><strong>{analytics ?? 0}</strong></article>
        <article><small>SHOWCASE</small><strong>{showcase ?? 0}</strong></article>
        <article><small>MEDIA COLLECTIONS</small><strong>{playlists ?? 0}</strong></article>
      </section>
      <section className="admin-card">
        <p className="eyebrow">YOUR WORKFLOW</p><h2>Edit → Preview → Publish</h2>
        <div className="admin-quick-grid">
          <a href="/admin/projects"><strong>Projects</strong><span>Live products, demos, GitHub and screenshots.</span></a>
          <a href="/admin/analytics"><strong>Data Intelligence</strong><span>Power BI, Tableau, SQL and analytical work.</span></a>
          <a href="/admin/showcase"><strong>Workflow Showcase</strong><span>Upload screenshots for the cinematic carousel.</span></a>
          <a href="/admin/content"><strong>Content</strong><span>Profile, YouTube collections, headshot and links.</span></a>
          <a href="/admin/design"><strong>Design</strong><span>Colours, typography and visual style.</span></a>
          <a href="/admin/settings"><strong>Settings</strong><span>Section visibility and page structure.</span></a>
        </div>
      </section>
    </AdminShell>
  );
}
