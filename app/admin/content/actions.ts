"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function saveProfile(formData: FormData) {
  const { supabase } = await requireAdmin();

  const payload = {
    full_name: String(formData.get("full_name") || "Alim Abdulwasiu"),
    role: String(formData.get("role") || ""),
    tagline: String(formData.get("tagline") || ""),
    bio: String(formData.get("bio") || ""),
    email: String(formData.get("email") || "") || null,
    linkedin_url: String(formData.get("linkedin_url") || "") || null,
    github_url: String(formData.get("github_url") || "") || null,
    youtube_url: String(formData.get("youtube_url") || "") || null,
    cv_url: String(formData.get("cv_url") || "") || null,
    logo_url: String(formData.get("logo_url") || "") || null,
    headshot_url: String(formData.get("headshot_url") || "") || null,
    updated_at: new Date().toISOString(),
  };

  const { data } = await supabase.from("profile").select("id").limit(1).maybeSingle();

  if (data?.id) {
    await supabase.from("profile").update(payload).eq("id", data.id);
  } else {
    await supabase.from("profile").insert(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function savePlaylist(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");

  const payload = {
    type: String(formData.get("type") || "training"),
    label: String(formData.get("label") || ""),
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    playlist_url: String(formData.get("playlist_url") || "") || null,
    status: String(formData.get("status") || "draft"),
    sort_order: Number(formData.get("sort_order") || 0),
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from("playlists").update(payload).eq("id", id);
  } else {
    await supabase.from("playlists").insert(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/content");
}
