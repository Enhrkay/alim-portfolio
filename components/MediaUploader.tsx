"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function MediaUploader() {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  async function upload(file: File) {
    const supabase = createClient();
    setMessage("Uploading...");

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const path = `alim/${safeName}`;

    const { error } = await supabase.storage
      .from("portfolio-media")
      .upload(path, file, { upsert: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("portfolio-media")
      .getPublicUrl(path);

    setUrl(data.publicUrl);
    setMessage("Uploaded. Copy the URL below into your profile or project.");
  }

  return (
    <div className="media-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) upload(file);
        }}
      />

      {message && <p>{message}</p>}
      {url && (
        <div>
          <input value={url} readOnly onFocus={(e) => e.currentTarget.select()} />
        </div>
      )}
    </div>
  );
}
