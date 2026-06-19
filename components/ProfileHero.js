import Image from "next/image";
import ContactButton from "@/components/ContactButton";

export default function ProfileHero({ photographer }) {
  return (
    <section className="profile-hero" aria-labelledby="profile-title">
      <div className="profile-copy">
        <h1 id="profile-title">{photographer.name}</h1>
        <p className="profile-location">
          {photographer.city}, {photographer.country}
        </p>
        <p className="profile-tagline">{photographer.tagline}</p>
      </div>
      <ContactButton photographerName={photographer.name} />
      <Image
        src={`/${photographer.portrait}`}
        alt={photographer.name}
        width={220}
        height={220}
        sizes="220px"
        className="photographer-portrait photographer-portrait--large"
        priority
      />
    </section>
  );
}
