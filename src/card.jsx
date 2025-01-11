function Card({ name, image, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img className="pokemon-avatar" src={image} alt="card-avatar" />
      <h2>{name}</h2>
    </div>
  );
}
export default Card;
