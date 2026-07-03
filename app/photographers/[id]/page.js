import Link from "next/link";
import { notFound } from "next/navigation";
import FisheyeLogo from "@/components/FisheyeLogo";
import MediaSection from "@/components/MediaSection";
import ProfileHero from "@/components/ProfileHero";
import {
  getAllMediasForPhotographer,
  getAllPhotographers,
  getPhotographer,
  getTotalLikesForPhotographer,
} from "@/lib/fisheye-data";

export const dynamic = "force-dynamic";

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

  const [photographerMedias, totalLikes] = await Promise.all([
    getAllMediasForPhotographer(photographer.id),
    getTotalLikesForPhotographer(photographer.id),
  ]);

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
        <MediaSection
          initialTotalLikes={totalLikes}
          medias={photographerMedias}
          photographerPrice={photographer.price}
        />
      </main>
    </>
  );
}
