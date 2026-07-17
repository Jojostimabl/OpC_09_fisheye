"use client";

import { useEffect, useRef } from "react";

export default function ContactModal({
  photographerName,
  onClose,
  returnFocusRef,
}) {
  const dialogRef = useRef(null);
  const firstNameRef = useRef(null);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstNameRef.current?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      returnFocusRef.current?.focus();
    };
  }, [returnFocusRef]);

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

    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusableElements = dialogRef.current.querySelectorAll(
      'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])',
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

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.info("Formulaire de contact envoy\u00e9 :", {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    });
  }

  return (
    <div className="dialog-backdrop" onMouseDown={handleBackdropClick}>
      <section
        ref={dialogRef}
        id="contact-dialog"
        className="contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onKeyDown={handleDialogKeyDown}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Fermer le formulaire de contact"
          onClick={onClose}
        >
          ×
        </button>
        <h1 id="contact-title">
          Contactez-moi
          <span>{photographerName}</span>
        </h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="first-name">Prénom</label>
          <input
            ref={firstNameRef}
            id="first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
          />
          <label htmlFor="last-name">Nom</label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <label htmlFor="message">Votre message</label>
          <textarea id="message" name="message" rows="5" required />
          <button type="submit">Envoyer</button>
        </form>
      </section>
    </div>
  );
}
