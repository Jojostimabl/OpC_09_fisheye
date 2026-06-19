import PhotographerCard from "@/components/PhotographerCard";

export default function PhotographerList({ photographers }) {
  return (
    <ul className="photographer-list" aria-label="Liste des photographes">
      {photographers.map((photographer, index) => (
        <PhotographerCard
          key={photographer.id}
          photographer={photographer}
          priority={index < 3}
        />
      ))}
    </ul>
  );
}
