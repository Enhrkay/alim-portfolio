"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function saveShowcaseMedia(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const imageUrl = String(formData.get("image_url") || "").trim();
  if (!title || !imageUrl) return;

  const payload = {
    title,
    caption: String(formData.get("caption") || "") || null,
    image_url: imageUrl,
    category: String(formData.get("category") || "Workflow"),
    status: String(formData.get("status") || "draft"),
    sort_order: Number(formData.get("sort_order") || 0),
    updated_at: new Date().toISOString(),
  };

  if (id) await supabase.from("showcase_media").update(payload).eq("id", id);
  else await supabase.from("showcase_media").insert(payload);

  revalidatePath("/");
  revalidatePath("/admin/showcase");
}

export async function deleteShowcaseMedia(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await supabase.from("showcase_media").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/showcase");
}
