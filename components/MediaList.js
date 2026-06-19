import MediaCard from "@/components/MediaCard";

export default function MediaList({ medias }) {
  return (
    <ul className="media-list" aria-label="Galerie des médias">
      {medias.map((media) => (
        <MediaCard key={`${media.photographerId}-${media.title}-${media.date}`} media={media} />
      ))}
    </ul>
  );
}
