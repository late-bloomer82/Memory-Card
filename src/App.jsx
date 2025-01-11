import { useEffect, useState } from "react";
import "./App.css";
import Header from "./header";
import Gameboard from "./gameboard";

const pokemons = [
  { id: 1, name: "pikachu", wasClicked: false },
  { id: 2, name: "charizard", wasClicked: false },
  { id: 3, name: "mewtwo", wasClicked: false },
  { id: 4, name: "bulbasaur", wasClicked: false },
  { id: 5, name: "charmander", wasClicked: false },
  { id: 6, name: "squirtle", wasClicked: false },
  { id: 7, name: "pidgeot", wasClicked: false },
  { id: 8, name: "jigglypuff", wasClicked: false },
  { id: 9, name: "snorlax", wasClicked: false },
  { id: 10, name: "gengar", wasClicked: false },
  { id: 11, name: "lapras", wasClicked: false },
  { id: 12, name: "eevee", wasClicked: false },
];

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonData, setPokemonData] = useState(pokemons);
  const [loading, setLoading] = useState(true);

  const resetClickedProperty = (pokemonData) =>
    pokemonData.map((pokemon) => ({ ...pokemon, wasClicked: false }));

  const shuffleCards = (pokemonData) =>
    [...pokemonData].sort(() => Math.random() - 0.5);

  const fetchPokemonData = async (pokemonName) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const data = await response.json();
      const images = {
        sprite: data.sprites.front_default,
        officialArtwork: data.sprites.other["official-artwork"].front_default,
      };
      return { name: pokemonName, images };
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Ensure loading state is true while fetching
      const updatedData = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const fetchedData = await fetchPokemonData(pokemon.name);
          return fetchedData ? { ...pokemon, ...fetchedData } : pokemon;
        })
      );
      setPokemonData(updatedData); // Update the state once after all data is fetched
      setLoading(false); // Set loading to false when data is ready
    };

    fetchData();
  }, []); // Empty dependency array means this only runs once after the initial render

  return (
    <div id="app">
      <Header score={score} bestScore={bestScore} />
      {loading ? (
        <div></div>
      ) : (
        <Gameboard
          pokemonData={pokemonData}
          setPokemonData={setPokemonData}
          score={score}
          bestScore={bestScore}
          setBestScore={setBestScore}
          setScore={setScore}
          shuffleCards={shuffleCards}
          resetClickedProperty={resetClickedProperty}
        />
      )}
    </div>
  );
}

export default App;
