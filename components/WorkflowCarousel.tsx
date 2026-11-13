"use client";

import { useRef } from "react";
import type { ShowcaseMedia } from "@/lib/types";

export function WorkflowCarousel({ items }: { items: ShowcaseMedia[] }) {
  const track = useRef<HTMLDivElement>(null);

  function move(direction: number) {
    track.current?.scrollBy({ left: direction * 460, behavior: "smooth" });
  }

  return (
    <div className="workflow-carousel-wrap">
      <div className="workflow-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous workflow">Back</button>
        <button type="button" onClick={() => move(1)} aria-label="Next workflow">Next</button>
      </div>
      <div className="workflow-carousel" ref={track}>
        {items.map((item, index) => (
          <article className="workflow-slide" key={item.id}>
            <div className="workflow-slide-index">{String(index + 1).padStart(2, "0")}</div>
            <div className="workflow-slide-media">
              <img src={item.image_url} alt={item.title} />
              <span>{item.category}</span>
            </div>
            <div className="workflow-slide-copy">
              <strong>{item.title}</strong>
              {item.caption && <p>{item.caption}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
