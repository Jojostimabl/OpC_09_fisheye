"use client";

import MediaCard from "@/components/MediaCard";
import MediaModal from "@/components/MediaModal";
import ModalController from "@/components/ModalController";

export default function MediaModalController({
  media,
  medias,
  initialIndex,
  onLikeChange,
}) {
  return (
    <li className="media-card">
      <ModalController
        renderTrigger={({ ref, isOpen, onOpen }) => (
          <MediaCard
            ref={ref}
            media={media}
            isOpen={isOpen}
            onOpen={onOpen}
            onLikeChange={onLikeChange}
          />
        )}
        renderModal={({ onClose, returnFocusRef }) => (
          <MediaModal
            initialIndex={initialIndex}
            medias={medias}
            onClose={onClose}
            returnFocusRef={returnFocusRef}
          />
        )}
      />
    </li>
  );
}
