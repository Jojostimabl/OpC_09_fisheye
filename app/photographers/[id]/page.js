import Link from "next/link";
import { notFound } from "next/navigation";
import FisheyeLogo from "@/components/FisheyeLogo";
import MediaList from "@/components/MediaList";
import MediaSort from "@/components/MediaSort";
import ProfileHero from "@/components/ProfileHero";
import {
  getAllMediasForPhotographer,
  getAllPhotographers,
  getPhotographer,
} from "@/lib/fisheye-data";

export async function generateStaticParams() {
  const photographers = await getAllPhotographers();

  return photographers.map((photographer) => ({
    id: String(photographer.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const photographer = await getPhotographer(id);

  if (!photographer) {
    return {
      title: "Photographe introuvable - FishEye",
    };
  }

  return {
    title: `${photographer.name} - FishEye`,
    description: photographer.tagline,
  };
}

export default async function PhotographerPage({ params }) {
  const { id } = await params;
  const photographer = await getPhotographer(id);

  if (!photographer) {
    notFound();
  }

  const photographerMedias = await getAllMediasForPhotographer(photographer.id);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>
      <header className="site-header site-header--profile">
        <FisheyeLogo />
        <Link className="back-link" href="/">
          Retour
        </Link>
      </header>
      <main id="main-content" className="page-shell">
        <ProfileHero photographer={photographer} />
        <section aria-labelledby="media-title" className="media-section">
          <div className="section-heading">
            <h2 id="media-title">Galerie</h2>
            <p>{photographer.price} EUR/jour</p>
          </div>
          <MediaSort />
          <MediaList medias={photographerMedias} />
        </section>
      </main>
    </>
  );
}
