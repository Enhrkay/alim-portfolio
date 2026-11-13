import { AdminShell } from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";
import type { Theme } from "@/lib/types";
import { saveTheme } from "./actions";

export default async function DesignPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("theme").select("*").limit(1).maybeSingle();
  const theme = data as Theme | null;

  return (
    <AdminShell title="Design" subtitle="Control the visual identity of your portfolio without rewriting CSS.">
      <section className="admin-card">
        <form action={saveTheme} className="form-grid">
          <label>Primary<input name="primary_color" type="color" defaultValue={theme?.primary_color || "#0F7A4A"} /></label>
          <label>Secondary<input name="secondary_color" type="color" defaultValue={theme?.secondary_color || "#0B3D2E"} /></label>
          <label>Accent<input name="accent_color" type="color" defaultValue={theme?.accent_color || "#C8A96B"} /></label>
          <label>Background<input name="background_color" type="color" defaultValue={theme?.background_color || "#FBFCFA"} /></label>
          <label>Surface<input name="surface_color" type="color" defaultValue={theme?.surface_color || "#FFFFFF"} /></label>
          <label>Text<input name="text_color" type="color" defaultValue={theme?.text_color || "#111A15"} /></label>
          <label>Muted Text<input name="muted_color" type="color" defaultValue={theme?.muted_color || "#66736B"} /></label>
          <label>Border<input name="border_color" type="color" defaultValue={theme?.border_color || "#DCE7E0"} /></label>

          <label>
            Heading Font
            <select name="heading_font" defaultValue={theme?.heading_font || "Manrope"}>
              <option>Manrope</option><option>DM Sans</option><option>Inter</option><option>Georgia</option>
            </select>
          </label>

          <label>
            Body Font
            <select name="body_font" defaultValue={theme?.body_font || "DM Sans"}>
              <option>DM Sans</option><option>Inter</option><option>Arial</option><option>Georgia</option>
            </select>
          </label>

          <label>
            Corners
            <select name="radius" defaultValue={theme?.radius || "rounded"}>
              <option value="square">Square</option>
              <option value="soft">Soft</option>
              <option value="rounded">Rounded</option>
            </select>
          </label>

          <label>
            Card Style
            <select name="card_style" defaultValue={theme?.card_style || "elevated"}>
              <option value="flat">Flat</option>
              <option value="soft">Soft</option>
              <option value="glass">Glass</option>
              <option value="elevated">Elevated</option>
            </select>
          </label>

          <label>
            Animation
            <select name="animation_level" defaultValue={theme?.animation_level || "elegant"}>
              <option value="minimal">Minimal</option>
              <option value="elegant">Elegant</option>
              <option value="dynamic">Dynamic</option>
            </select>
          </label>

          <div className="wide"><button className="button button-primary">Save Design</button></div>
        </form>
      </section>

      <section
        className="design-preview"
        style={{
          ["--preview-primary" as any]: theme?.primary_color || "#0F7A4A",
          ["--preview-secondary" as any]: theme?.secondary_color || "#0B3D2E",
          ["--preview-bg" as any]: theme?.background_color || "#FBFCFA",
          ["--preview-text" as any]: theme?.text_color || "#111A15",
        }}
      >
        <p>LIVE STYLE PREVIEW</p>
        <h2>Classic. Premium. Professional.</h2>
        <span>Project Card</span>
      </section>
    </AdminShell>
  );
}
