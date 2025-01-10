import Card from "./card";

function Gameboard({
  pokemonData,
  setPokemonData,
  score,
  bestScore,
  setScore,
  setBestScore,
}) {
  const updateClickedProperty = (clickedPokemon) => {
    setPokemonData((prevData) =>
      prevData.map(
        (pokemon) =>
          pokemon.id === clickedPokemon.id // Replace targetId with the actual ID of the pokemon you're targeting
            ? { ...pokemon, wasClicked: true } // Update the wasClicked property
            : pokemon // Leave the rest of the pokemons unchanged
      )
    );
  };
  const handleClick = (pokemon) => {
    if (!pokemon.wasClicked) {
      setScore((previousScore) => {
        const newScore = previousScore + 1;
        setBestScore((previousBestScore) =>
          newScore > previousBestScore ? newScore : previousBestScore
        );
        updateClickedProperty(pokemon);

        return newScore;
      });
    } else {
      setScore((previousScore) => {
        setBestScore((previousBestScore) =>
          previousScore > previousBestScore ? previousScore : previousBestScore
        );
        return 0; // Reset the score
      });
    }
  };

  return (
    <section id="gameboard">
      {pokemonData.map((pokemon) => (
        <Card
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.images.sprite}
          onClick={() => {
            handleClick(pokemon);
          }}
        ></Card>
      ))}
    </section>
  );
}
export default Gameboard;
