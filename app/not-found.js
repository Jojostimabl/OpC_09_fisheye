import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-feedback">
      <h1>Photographe introuvable</h1>
      <p>Cette page n&apos;existe pas ou le photographe n&apos;est plus disponible.</p>
      <Link href="/">Voir tous les photographes</Link>
    </main>
  );
}
