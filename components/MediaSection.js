"use client";

import { useMemo, useState } from "react";
import MediaModalController from "@/components/MediaModalController";
import MediaSort from "@/components/MediaSort";
import PhotographerStatsBar from "@/components/PhotographerStatsBar";

export default function MediaSection({
  initialTotalLikes,
  medias,
  photographerPrice,
}) {
  const [totalLikes, setTotalLikes] = useState(initialTotalLikes);
  const [sortBy, setSortBy] = useState("popularity");
  const [mediaItems, setMediaItems] = useState(medias);

  function handleLikeChange(mediaId, delta) {
    setTotalLikes((currentTotal) => currentTotal + delta);

    setMediaItems((currentMedias) =>
      currentMedias.map((media) =>
        media.id === mediaId
          ? { ...media, likes: media.likes + delta }
          : media,
      ),
    );
  }

  const sortedMedias = useMemo(() => {
    return [...mediaItems].sort((a, b) => {
      if (sortBy === "popularity") {
        return b.likes - a.likes;
      }

      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      }

      return a.title.localeCompare(b.title, "fr", { sensitivity: "base" });
    });
  }, [mediaItems, sortBy]);

  return (
    <>
      <section aria-label="Galerie des médias" className="media-section">
        <MediaSort selectedValue={sortBy} onSortChange={setSortBy} />
        <ul className="media-list">
          {sortedMedias.map((media, index) => (
            <MediaModalController
              key={`${media.photographerId}-${media.title}-${media.date}`}
              media={media}
              medias={sortedMedias}
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
