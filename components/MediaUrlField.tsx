"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function MediaUrlField({
  name,
  label,
  defaultValue = "",
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [message, setMessage] = useState("");

  async function upload(file: File) {
    const supabase = createClient();
    setMessage("Uploading...");
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const path = `alim/${safeName}`;
    const { error } = await supabase.storage.from("portfolio-media").upload(path, file, { upsert: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    const { data } = supabase.storage.from("portfolio-media").getPublicUrl(path);
    setUrl(data.publicUrl);
    setMessage("Uploaded and attached.");
  }

  return (
    <label className="wide media-url-field">
      {label}
      <div className="media-url-controls">
        <input name={name} value={url} onChange={(event) => setUrl(event.target.value)} required={required} placeholder="Upload an image or paste a public URL" />
        <span className="media-upload-button">
          Upload image
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload(file);
            }}
          />
        </span>
      </div>
      {message && <small className="media-url-message">{message}</small>}
      {url && <img className="media-url-preview" src={url} alt="Uploaded preview" />}
    </label>
  );
}
