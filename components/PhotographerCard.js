import Image from "next/image";
import Link from "next/link";

export default function PhotographerCard({ photographer, priority = false }) {
  return (
    <li className="photographer-card">
      <article aria-labelledby={`photographer-${photographer.id}`}>
        <Link className="photographer-link" href={`/photographers/${photographer.id}`}>
          <Image
            src={`/${photographer.portrait}`}
            alt=""
            width={220}
            height={220}
            sizes="(max-width: 720px) 200px, 220px"
            className="photographer-portrait"
            priority={priority}
          />
          <h2 id={`photographer-${photographer.id}`}>{photographer.name}</h2>
        </Link>
        <p className="photographer-location">
          {photographer.city}, {photographer.country}
        </p>
        <p className="photographer-tagline">{photographer.tagline}</p>
        <p className="photographer-price">{photographer.price}€/jour</p>
      </article>
    </li>
  );
}
