export default function PhotographerStatsBar({ totalLikes, price }) {
  const formattedLikes = new Intl.NumberFormat("fr-FR").format(totalLikes);

  return (
    <aside
      className="photographer-stats-bar"
      aria-label="Statistiques du photographe"
    >
      <p aria-label={`${formattedLikes} mentions j'aime`}>
        <span>{formattedLikes}</span>
        <span aria-hidden="true">♥</span>
      </p>
      <p>{price}€ / jour</p>
    </aside>
  );
}
