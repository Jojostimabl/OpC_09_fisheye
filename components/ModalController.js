"use client";

import { useRef, useState } from "react";

export default function ModalController({ renderTrigger, renderModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {renderTrigger({
        ref: triggerRef,
        isOpen,
        onOpen: openModal,
      })}
      {isOpen
        ? renderModal({
            onClose: closeModal,
            returnFocusRef: triggerRef,
          })
        : null}
    </>
  );
}
