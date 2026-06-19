import Link from "next/link";

export default function FisheyeLogo() {
  return (
    <Link className="fisheye-logo" href="/" aria-label="FishEye - Accueil">
      <span aria-hidden="true">Fish</span>
      <span className="logo-camera" aria-hidden="true" />
      <span aria-hidden="true">eye</span>
    </Link>
  );
}
