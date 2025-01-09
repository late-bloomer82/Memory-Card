function Card({ name, image }) {
  return (
    <div className="card">
      <img src={image} alt="card-avatar" />
      <h2>{name}</h2>
    </div>
  );
}
export default Card;
