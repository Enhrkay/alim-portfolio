import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import type { AnalyticsProject } from "@/lib/types";
import { deleteAnalyticsProject, saveAnalyticsProject } from "./actions";
import { MediaUrlField } from "@/components/MediaUrlField";

function AnalyticsForm({ item }: { item?: AnalyticsProject }) {
  return (
    <form action={saveAnalyticsProject} className="form-grid">
      {item && <input type="hidden" name="id" value={item.id} />}
      <label>Title<input name="title" defaultValue={item?.title || ""} required /></label>
      <label>Subtitle<input name="subtitle" defaultValue={item?.subtitle || ""} placeholder="Power BI Dashboard" /></label>
      <label className="wide">Description<textarea name="description" rows={4} defaultValue={item?.description || ""} /></label>
      <label className="wide">Business Question<textarea name="business_question" rows={3} defaultValue={item?.business_question || ""} /></label>
      <label className="wide">Data Context<textarea name="data_context" rows={3} defaultValue={item?.data_context || ""} /></label>
      <label className="wide">Key Insight<textarea name="key_insight" rows={3} defaultValue={item?.key_insight || ""} /></label>
      <label className="wide">Tools - comma separated<input name="tools" defaultValue={(item?.tools || []).join(", ")} placeholder="Power BI, SQL, DAX" /></label>
      <MediaUrlField name="image_url" label="Dashboard Screenshot" defaultValue={item?.image_url || ""} />
      <label className="wide">Embed URL<input name="embed_url" defaultValue={item?.embed_url || ""} placeholder="Power BI publish-to-web embed URL" /></label>
      <label className="wide">Full Dashboard / Case Study URL<input name="live_url" defaultValue={item?.live_url || ""} /></label>
      <label>Sort Order<input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} /></label>
      <label>Status<select name="status" defaultValue={item?.status || "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></label>
      <label className="check"><input name="featured" type="checkbox" defaultChecked={item?.featured || false} /> Featured</label>
      <div className="wide"><button className="button button-primary">{item ? "Save Changes" : "Add Analytics Project"}</button></div>
    </form>
  );
}

export default async function AnalyticsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("analytics_projects").select("*").order("sort_order");
  const items = (data as AnalyticsProject[] | null) ?? [];

  return (
    <AdminShell title="Data Intelligence" subtitle="Manage Power BI, Tableau, SQL, Python and analytical portfolio work.">
      <section className="admin-card">
        <p className="eyebrow">ADD ANALYTICS WORK</p>
        <h2>Show the business question, not only the chart.</h2>
        <p>For Power BI, use a public embed URL only when the data is safe to publish. Otherwise use a screenshot and a case-study link.</p>
        <AnalyticsForm />
      </section>

      <div className="editor-list">
        {items.map((item) => (
          <details className="editor-card" key={item.id}>
            <summary><div><strong>{item.title}</strong><span>{item.subtitle || "Analytics"}</span></div><span className={`status-chip ${item.status}`}>{item.status}</span></summary>
            <AnalyticsForm item={item} />
            <form action={deleteAnalyticsProject} className="danger-zone"><input type="hidden" name="id" value={item.id} /><button>Delete analytics project</button></form>
          </details>
        ))}
      </div>
    </AdminShell>
  );
}
