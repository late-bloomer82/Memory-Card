import Card from "./card";

function Gameboard({
  pokemonData,
  setPokemonData,
  score,
  bestScore,
  setScore,
  setBestScore,
  shuffleCards,
  resetClickedProperty,
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

  function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  const handleClick = (pokemon) => {
    //Shuffle card order on each turn
    setPokemonData((previousPokemonData) => {
      const updatedData = shuffleCards(previousPokemonData);
      return updatedData;
    });
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
      setPokemonData((previousData) => resetClickedProperty(previousData));
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
          name={capitalizeFirstLetter(pokemon.name)}
          image={pokemon.images.officialArtwork}
          onClick={() => {
            handleClick(pokemon);
            console.log(pokemonData);
          }}
        ></Card>
      ))}
    </section>
  );
}
export default Gameboard;
