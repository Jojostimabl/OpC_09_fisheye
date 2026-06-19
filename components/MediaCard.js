import Image from "next/image";

export default function MediaCard({ media }) {
  const asset = media.image ?? media.video;
  const isImage = Boolean(media.image);

  return (
    <li className="media-card">
      <a
        className="media-preview"
        href={`/${asset}`}
        aria-label={media.title}
      >
        {isImage ? (
          <Image
            src={`/${media.image}`}
            alt=""
            width={420}
            height={320}
            sizes="(max-width: 720px) 100vw, 33vw"
          />
        ) : (
          <video aria-label={media.title}>
            <source src={`/${media.video}`} />
          </video>
        )}
      </a>
      <div className="media-meta">
        <h2>{media.title}</h2>
        <p className="media-likes">
          <span>{media.likes}</span>
          <span aria-label="likes" className="likes-icon">
            ♥
          </span>
        </p>
      </div>
    </li>
  );
}
