"use client";

import { useMemo } from "react";

function getPlaylistId(value: string) {
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.searchParams.get("list");
  } catch {
    const match = value.match(/[?&]list=([^&]+)/i);
    return match?.[1] ?? null;
  }
}

export function YouTubePlaylistEmbed({
  title,
  playlistUrl,
}: {
  title: string;
  playlistUrl: string;
}) {
  const playlistId = useMemo(() => getPlaylistId(playlistUrl), [playlistUrl]);

  if (!playlistId) {
    return (
      <div className="playlist-embed-fallback">
        <span>YOUTUBE COLLECTION</span>
        <strong>Playlist preview unavailable</strong>
        <a href={playlistUrl} target="_blank" rel="noreferrer">
          Open playlist ↗
        </a>
      </div>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}`;

  return (
    <div className="playlist-embed-shell">
      <iframe
        src={embedUrl}
        title={`${title} YouTube playlist`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
