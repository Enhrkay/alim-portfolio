import { AdminShell } from "@/components/AdminShell";
import { MediaUrlField } from "@/components/MediaUrlField";
import { requireAdmin } from "@/lib/auth";
import type { ShowcaseMedia } from "@/lib/types";
import { deleteShowcaseMedia, saveShowcaseMedia } from "./actions";

function ShowcaseForm({ item }: { item?: ShowcaseMedia }) {
  return (
    <form action={saveShowcaseMedia} className="form-grid">
      {item && <input type="hidden" name="id" value={item.id} />}
      <label>Title<input name="title" defaultValue={item?.title || ""} required /></label>
      <label>Category<input name="category" defaultValue={item?.category || "Workflow"} placeholder="n8n Workflow" /></label>
      <label className="wide">Caption<textarea name="caption" rows={3} defaultValue={item?.caption || ""} /></label>
      <MediaUrlField name="image_url" label="Workflow Screenshot" defaultValue={item?.image_url || ""} required />
      <label>Sort Order<input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} /></label>
      <label>Status<select name="status" defaultValue={item?.status || "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></label>
      <div className="wide"><button className="button button-primary">{item ? "Save Changes" : "Add to Carousel"}</button></div>
    </form>
  );
}

export default async function ShowcasePage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("showcase_media").select("*").order("sort_order");
  const items = (data as ShowcaseMedia[] | null) ?? [];

  return (
    <AdminShell title="Workflow Showcase" subtitle="Upload workflow screenshots and place them in the cinematic carousel.">
      <section className="admin-card"><p className="eyebrow">CAROUSEL ITEM</p><h2>Add a workflow screenshot directly.</h2><p>The upload button attaches the Supabase Storage URL automatically.</p><ShowcaseForm /></section>
      <div className="editor-list">
        {items.map((item) => (
          <details className="editor-card" key={item.id}>
            <summary><div><strong>{item.title}</strong><span>{item.category}</span></div><span className={`status-chip ${item.status}`}>{item.status}</span></summary>
            <ShowcaseForm item={item} />
            <form action={deleteShowcaseMedia} className="danger-zone"><input type="hidden" name="id" value={item.id} /><button>Delete carousel item</button></form>
          </details>
        ))}
      </div>
    </AdminShell>
  );
}
