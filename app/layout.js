import "./globals.css";

export const metadata = {
  title: "FishEye",
  description: "Prototype Next.js du site FishEye",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
