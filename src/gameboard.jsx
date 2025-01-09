import Card from "./card";

function Gameboard({ pokemonData }) {
  return (
    <section id="gameboard">
      {pokemonData.map((pokemon) => (
        <Card
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.images.sprite}
        ></Card>
      ))}
    </section>
  );
}
export default Gameboard;
