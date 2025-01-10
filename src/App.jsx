import { useEffect, useState } from "react";
import "./App.css";
import Header from "./header";
import Gameboard from "./gameboard";
import Card from "./card";

function App() {
  // State to store Pokémon data
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemonData, setPokemonData] = useState([
    { id: 1, name: "Pikachu", wasClicked: false },
    { id: 2, name: "Charizard", wasClicked: false },
    { id: 3, name: "Mewtwo", wasClicked: false },
    { id: 4, name: "Bulbasaur", wasClicked: false },
    { id: 5, name: "Charmander", wasClicked: false },
    { id: 6, name: "Squirtle", wasClicked: false },
    { id: 7, name: "Pidgeot", wasClicked: false },
    { id: 8, name: "Jigglypuff", wasClicked: false },
    { id: 9, name: "Snorlax", wasClicked: false },
    { id: 10, name: "Gengar", wasClicked: false },
    { id: 11, name: "Lapras", wasClicked: false },
    { id: 12, name: "Eevee", wasClicked: false },
  ]);

  const fetchPokemonData = async (pokemon) => {
    try {
      // Fetch basic Pokémon details
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await response.json();

      // Extract image URLs
      const images = {
        sprite: data.sprites.front_default,
        officialArtwork: data.sprites.other["official-artwork"].front_default,
      };

      return { name: pokemon, images };
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const updatedData = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const fetchedData = await fetchPokemonData(pokemon.name); // Fetch images
          return { ...pokemon, ...fetchedData }; // Merge fetched data into the Pokémon object
        })
      );

      setPokemonData(updatedData); // Update state with the new data
    };

    fetchData();
  }, []);

  return (
    <div id="app">
      <Header score={score} bestScore={bestScore}></Header>
      <Gameboard
        pokemonData={pokemonData}
        setPokemonData={setPokemonData}
        score={score}
        bestScore={bestScore}
        setBestScore={setBestScore}
        setScore={setScore}
      ></Gameboard>
    </div>
  );
}

export default App;
