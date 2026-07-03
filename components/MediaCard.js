"use client";

import Image from "next/image";
import { forwardRef } from "react";
import LikeButton from "@/components/LikeButton";

const MediaCard = forwardRef(function MediaCard(
  { media, isOpen, onOpen, onLikeChange },
  ref,
) {
  const isImage = Boolean(media.image);

  return (
    <>
      <button
        ref={ref}
        className="media-preview"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="media-lightbox"
        aria-label={media.title}
        onClick={onOpen}
      >
        {isImage ? (
          <Image
            src={`/${media.image}`}
            alt=""
            width={420}
            height={320}
            sizes="(max-width: 720px) 100vw, 33vw"
          />
        ) : (
          <video aria-label={media.title}>
            <source src={`/${media.video}`} />
          </video>
        )}
      </button>
      <div className="media-meta">
        <h2>{media.title}</h2>
        <LikeButton
          mediaId={media.id}
          initialLikes={media.likes}
          mediaTitle={media.title}
          onLikeChange={onLikeChange}
        />
      </div>
    </>
  );
});

export default MediaCard;
