"use client";

import { useState } from "react";

export default function ContactButton({ photographerName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="contact-button"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="contact-dialog"
        onClick={() => setIsOpen(true)}
      >
        Contactez-moi
      </button>
      {isOpen ? (
        <div className="dialog-backdrop">
          <section
            id="contact-dialog"
            className="contact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
          >
            <button
              className="dialog-close"
              type="button"
              aria-label="Fermer la fenêtre de contact"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <h2 id="contact-title">Contactez-moi</h2>
            <p>{photographerName}</p>
            <form className="contact-form">
              <label htmlFor="first-name">Prénom</label>
              <input id="first-name" name="firstName" type="text" />
              <label htmlFor="last-name">Nom</label>
              <input id="last-name" name="lastName" type="text" />
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" />
              <label htmlFor="message">Votre message</label>
              <textarea id="message" name="message" rows="5" />
              <button type="submit">Envoyer</button>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
