"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MediaModal({
  initialIndex,
  medias,
  onClose,
  returnFocusRef,
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const activeMedia = medias[activeIndex];
  const isImage = Boolean(activeMedia.image);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      returnFocusRef.current?.focus();
    };
  }, [returnFocusRef]);

  function showPreviousMedia(event) {
    event.preventDefault();
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? medias.length - 1 : currentIndex - 1,
    );
  }

  function showNextMedia(event) {
    event.preventDefault();
    setActiveIndex((currentIndex) =>
      currentIndex === medias.length - 1 ? 0 : currentIndex + 1,
    );
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleDialogKeyDown(event) {
    if (event.key === "Escape") {
      onClose();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        currentIndex === 0 ? medias.length - 1 : currentIndex - 1,
      );
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        currentIndex === medias.length - 1 ? 0 : currentIndex + 1,
      );
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusableElements = dialogRef.current.querySelectorAll(
      'a[href], button, video[controls], [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }

  return (
    <div className="lightbox-backdrop" onMouseDown={handleBackdropClick}>
      <section
        ref={dialogRef}
        id="media-lightbox"
        className="lightbox-dialog"
        role="dialog"
        aria-label="image closeup view"
        aria-modal="true"
        onKeyDown={handleDialogKeyDown}
      >
        <a
          className="lightbox-nav lightbox-nav--previous"
          href={`/${activeMedia.image ?? activeMedia.video}`}
          aria-label="Previous image"
          onClick={showPreviousMedia}
        >
          ‹
        </a>
        <figure className="lightbox-figure">
          <div className="lightbox-media">
            {isImage ? (
              <Image
                src={`/${activeMedia.image}`}
                alt={activeMedia.title}
                width={860}
                height={680}
                sizes="90vw"
                priority
              />
            ) : (
              <video controls aria-label={activeMedia.title}>
                <source src={`/${activeMedia.video}`} />
              </video>
            )}
          </div>
          <figcaption>{activeMedia.title}</figcaption>
        </figure>
        <a
          className="lightbox-nav lightbox-nav--next"
          href={`/${activeMedia.image ?? activeMedia.video}`}
          aria-label="Next image"
          onClick={showNextMedia}
        >
          ›
        </a>
        <button
          ref={closeButtonRef}
          className="lightbox-close"
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>
      </section>
    </div>
  );
}
