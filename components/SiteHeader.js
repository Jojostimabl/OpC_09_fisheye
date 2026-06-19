import FisheyeLogo from "@/components/FisheyeLogo";

export default function SiteHeader({ title }) {
  return (
    <header className="site-header">
      <FisheyeLogo />
      {title ? <h1>{title}</h1> : null}
    </header>
  );
}
