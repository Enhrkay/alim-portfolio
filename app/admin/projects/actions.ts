"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function splitTools(v: FormDataEntryValue | null) {
  return String(v || "").split(",").map((x) => x.trim()).filter(Boolean);
}

export async function saveProject(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();

  if (!title) return;

  const payload = {
    title,
    slug: slugify(title),
    category: String(formData.get("category") || "Project"),
    year: String(formData.get("year") || "") || null,
    description: String(formData.get("description") || ""),
    problem: String(formData.get("problem") || "") || null,
    solution: String(formData.get("solution") || "") || null,
    tools: splitTools(formData.get("tools")),
    image_url: String(formData.get("image_url") || "") || null,
    live_url: String(formData.get("live_url") || "") || null,
    video_url: String(formData.get("video_url") || "") || null,
    github_url: String(formData.get("github_url") || "") || null,
    preview_mode: String(formData.get("preview_mode") || "image"),
    featured: formData.get("featured") === "on",
    status: String(formData.get("status") || "draft"),
    sort_order: Number(formData.get("sort_order") || 0),
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from("projects").update(payload).eq("id", id);
  } else {
    await supabase.from("projects").insert(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");

  if (id) await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}
