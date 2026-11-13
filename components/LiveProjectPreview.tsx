"use client";

import { useMemo, useState } from "react";

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function LiveProjectPreview({
  title,
  liveUrl,
  imageUrl,
}: {
  title: string;
  liveUrl: string;
  imageUrl?: string | null;
}) {
  const [loaded, setLoaded] = useState(false);
  const normalizedUrl = useMemo(() => normalizeUrl(liveUrl), [liveUrl]);

  return (
    <div className="live-preview">
      {imageUrl && (
        <img
          className={`live-preview-fallback ${loaded ? "is-hidden" : ""}`}
          src={imageUrl}
          alt={`${title} preview`}
        />
      )}

      {normalizedUrl && (
        <div className="live-preview-viewport">
          <iframe
            className={loaded ? "is-loaded" : ""}
            src={normalizedUrl}
            title={`${title} live website preview`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}

      {!loaded && (
        <div className="live-preview-loader">
          <span />
          <div>
            <strong>{"Opening live project"}</strong>
            <small>Loading the live landing page inside this portfolio.</small>
          </div>
        </div>
      )}

      <div className="live-preview-actions">
        <span>{loaded ? "LIVE WEBSITE" : "PROJECT PREVIEW"}</span>
        <a href={normalizedUrl} target="_blank" rel="noreferrer">
          Open full site ↗
        </a>
      </div>
    </div>
  );
}
