import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import type { SectionSetting } from "@/lib/types";
import { saveSections } from "./actions";

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("section_settings").select("*").order("sort_order");
  const sections = (data as SectionSetting[] | null) ?? [];
  const defaults = [
    ["hero", "Hero"],
    ["projects", "Live Projects"],
    ["data", "Data Intelligence"],
    ["process", "Signature Process"],
    ["showcase", "Showcase - Workflows, Training & Student Work"],
    ["about", "Professional Profile"],
    ["contact", "Contact"],
  ];

  return (
    <AdminShell title="Settings" subtitle="Control which sections appear on the public portfolio.">
      <section className="admin-card">
        <form action={saveSections} className="section-settings">
          {defaults.map(([key, label], index) => {
            const existing = sections.find((x) => x.section_key === key);
            return (
              <div className="section-setting-row" key={key}>
                <div><strong>{label}</strong><small>{key}</small></div>
                <label className="check"><input name={`enabled_${key}`} type="checkbox" defaultChecked={existing?.enabled ?? true} /> Show</label>
                <label>Order<input name={`sort_${key}`} type="number" defaultValue={existing?.sort_order ?? (index + 1) * 10} /></label>
              </div>
            );
          })}
          <button className="button button-primary">Save Section Settings</button>
        </form>
      </section>
    </AdminShell>
  );
}
