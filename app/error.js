"use client";

export default function Error({ reset }) {
  return (
    <main className="page-feedback" role="alert">
      <h1>Une erreur est survenue</h1>
      <p>{"Les informations demand\u00e9es ne sont pas disponibles pour le moment."}</p>
      <button type="button" onClick={reset}>
        {"R\u00e9essayer"}
      </button>
    </main>
  );
}
