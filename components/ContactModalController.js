"use client";

import ModalController from "@/components/ModalController";
import ContactModal from "@/components/ContactModal";

export default function ContactModalController({ photographerName }) {
  return (
    <ModalController
      renderTrigger={({ ref, isOpen, onOpen }) => (
        <button
          ref={ref}
          className="contact-button"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="contact-dialog"
          onClick={onOpen}
        >
          Contactez-moi
        </button>
      )}
      renderModal={({ onClose, returnFocusRef }) => (
        <ContactModal
          photographerName={photographerName}
          onClose={onClose}
          returnFocusRef={returnFocusRef}
        />
      )}
    />
  );
}
