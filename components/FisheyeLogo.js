import Image from "next/image";
import Link from "next/link";

export default function FisheyeLogo() {
  return (
    <Link className="fisheye-logo" href="/" aria-label="FishEye - Accueil">
      <Image
        src="/logo/logo.png"
        alt="FishEye"
        width={200}
        height={50}
        priority
        className="fisheye-logo-image"
      />
    </Link>
  );
}
