export default function MediaSort() {
  return (
    <div className="media-sort">
      <label htmlFor="media-order">Trier par</label>
      <select id="media-order" name="order" defaultValue="popularity">
        <option value="popularity">Popularité</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
      </select>
    </div>
  );
}
