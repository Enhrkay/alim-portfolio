"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function saveTheme(formData: FormData) {
  const { supabase } = await requireAdmin();

  const payload = {
    primary_color: String(formData.get("primary_color") || "#0F7A4A"),
    secondary_color: String(formData.get("secondary_color") || "#0B3D2E"),
    accent_color: String(formData.get("accent_color") || "#C8A96B"),
    background_color: String(formData.get("background_color") || "#FBFCFA"),
    surface_color: String(formData.get("surface_color") || "#FFFFFF"),
    text_color: String(formData.get("text_color") || "#111A15"),
    muted_color: String(formData.get("muted_color") || "#66736B"),
    border_color: String(formData.get("border_color") || "#DCE7E0"),
    heading_font: String(formData.get("heading_font") || "Manrope"),
    body_font: String(formData.get("body_font") || "DM Sans"),
    radius: String(formData.get("radius") || "rounded"),
    card_style: String(formData.get("card_style") || "elevated"),
    animation_level: String(formData.get("animation_level") || "elegant"),
    updated_at: new Date().toISOString(),
  };

  const { data } = await supabase.from("theme").select("id").limit(1).maybeSingle();

  if (data?.id) {
    await supabase.from("theme").update(payload).eq("id", data.id);
  } else {
    await supabase.from("theme").insert(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/design");
}
