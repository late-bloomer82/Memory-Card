import { useEffect, useState } from "react";
import "./App.css";
import Header from "./header";
import Gameboard from "./gameboard";
import Card from "./card";

function App() {
  // State to store Pokémon data
  const [pokemonData, setPokemonData] = useState([
    { id: 1, name: "Pikachu", selected: false },
    { id: 2, name: "Charizard", selected: false },
    { id: 3, name: "Mewtwo", selected: false },
    { id: 4, name: "Bulbasaur", selected: false },
    { id: 5, name: "Charmander", selected: false },
    { id: 6, name: "Squirtle", selected: false },
    { id: 7, name: "Pidgeot", selected: false },
    { id: 8, name: "Jigglypuff", selected: false },
    { id: 9, name: "Snorlax", selected: false },
    { id: 10, name: "Gengar", selected: false },
    { id: 11, name: "Lapras", selected: false },
    { id: 12, name: "Eevee", selected: false },
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
      <Header></Header>
      <Gameboard pokemonData={pokemonData}></Gameboard>
    </div>
  );
}

export default App;
