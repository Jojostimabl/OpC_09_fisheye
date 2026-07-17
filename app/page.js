import PhotographerList from "@/components/PhotographerList";
import SiteHeader from "@/components/SiteHeader";
import { getAllPhotographers } from "@/lib/fisheye-data";

export default async function HomePage() {
  const photographers = await getAllPhotographers();

  return (
    <>
      <SiteHeader title="Nos photographes" />
      <main id="main-content" className="page-shell home-page">
        <PhotographerList photographers={photographers} />
      </main>
    </>
  );
}
