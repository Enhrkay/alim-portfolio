import Link from "next/link";

export function AdminShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span>AA</span><div><strong>ALIM STUDIO</strong><small>Private Portfolio CMS</small></div></div>
        <nav>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/analytics">Data Intelligence</Link>
          <Link href="/admin/showcase">Workflow Showcase</Link>
          <Link href="/admin/content">Content</Link>
          <Link href="/admin/design">Design</Link>
          <Link href="/admin/settings">Settings</Link>
        </nav>
        <div className="admin-sidebar-bottom"><Link href="/" target="_blank">View Portfolio ↗</Link><form action="/api/auth/signout" method="post"><button>Sign out</button></form></div>
      </aside>
      <main className="admin-main">
        <header className="admin-header"><div><p className="eyebrow">PRIVATE ADMIN</p><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div><Link href="/" target="_blank" className="button button-ghost">Preview Portfolio ↗</Link></header>
        {children}
      </main>
    </div>
  );
}
