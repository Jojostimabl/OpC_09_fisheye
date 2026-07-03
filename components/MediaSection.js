"use client";

import { useState } from "react";
import MediaModalController from "@/components/MediaModalController";
import MediaSort from "@/components/MediaSort";
import PhotographerStatsBar from "@/components/PhotographerStatsBar";

export default function MediaSection({
  initialTotalLikes,
  medias,
  photographerPrice,
}) {
  const [totalLikes, setTotalLikes] = useState(initialTotalLikes);

  function handleLikeChange(delta) {
    setTotalLikes((currentTotal) => currentTotal + delta);
  }

  return (
    <>
      <section aria-labelledby="media-title" className="media-section">
        <div className="section-heading">
          <h2 id="media-title">Galerie</h2>
        </div>
        <MediaSort />
        <ul className="media-list" aria-label="Galerie des médias">
          {medias.map((media, index) => (
            <MediaModalController
              key={`${media.photographerId}-${media.title}-${media.date}`}
              media={media}
              medias={medias}
              initialIndex={index}
              onLikeChange={handleLikeChange}
            />
          ))}
        </ul>
      </section>
      <PhotographerStatsBar totalLikes={totalLikes} price={photographerPrice} />
    </>
  );
}
