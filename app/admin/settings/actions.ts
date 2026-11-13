"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function saveSections(formData: FormData) {
  const { supabase } = await requireAdmin();
  const keys = ["hero", "projects", "data", "process", "showcase", "about", "contact"];

  for (const [index, key] of keys.entries()) {
    const payload = {
      section_key: key,
      enabled: formData.get(`enabled_${key}`) === "on",
      sort_order: Number(formData.get(`sort_${key}`) || (index + 1) * 10),
    };

    const { data } = await supabase.from("section_settings").select("id").eq("section_key", key).maybeSingle();
    if (data?.id) await supabase.from("section_settings").update(payload).eq("id", data.id);
    else await supabase.from("section_settings").insert(payload);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
