"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

function splitTools(value: FormDataEntryValue | null) {
  return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
}

export async function saveAnalyticsProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  if (!title) return;

  const payload = {
    title,
    subtitle: String(formData.get("subtitle") || "") || null,
    description: String(formData.get("description") || ""),
    business_question: String(formData.get("business_question") || "") || null,
    data_context: String(formData.get("data_context") || "") || null,
    key_insight: String(formData.get("key_insight") || "") || null,
    tools: splitTools(formData.get("tools")),
    image_url: String(formData.get("image_url") || "") || null,
    embed_url: String(formData.get("embed_url") || "") || null,
    live_url: String(formData.get("live_url") || "") || null,
    status: String(formData.get("status") || "draft"),
    featured: formData.get("featured") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
    updated_at: new Date().toISOString(),
  };

  if (id) await supabase.from("analytics_projects").update(payload).eq("id", id);
  else await supabase.from("analytics_projects").insert(payload);

  revalidatePath("/");
  revalidatePath("/admin/analytics");
}

export async function deleteAnalyticsProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await supabase.from("analytics_projects").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/analytics");
}
