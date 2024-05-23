import Pokemon from '../Pokemon/Pokemon';
import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [busquedaPokemon, setBusquedaPokemon] = useState("");
  const [pokemonFiltrado, setPokemonFiltrado] = useState([]);
  const obtenerPokemonRef = useRef(null);

  useEffect(() => {
    const obtenerPokemon = async () => {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=807&offset=0";
      const response = await fetch(URL);
      if (!response.ok) {
        console.log("Peticion fallida");
      } else {
        const data = await response.json();
        setPokemon(data.results);
        setPokemonFiltrado(data.results);
        setMostrar(true);
      }
    };
    //asigna la función obtenerPokemon a la propiedad current de la referencia obtenerPokemonRef creada con useRef.
    obtenerPokemonRef.current = obtenerPokemon;

    
  }, []);

  const buscarPokemon = () => {
    const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(busquedaPokemon.toLowerCase()));
    setPokemonFiltrado(filteredPokemon); // Actualizar el estado pokemonFiltrado con los resultados filtrados
  };


  return (
    <div className='App'>
      <h1>Api - Pokemon</h1>
      <button onClick={() => obtenerPokemonRef.current()} disabled={mostrar}>Fetch Pokemon</button>
      <input 
          type="text" 
          placeholder="Buscar Pokémon" 
          value={busquedaPokemon}
          onChange={(e) => setBusquedaPokemon(e.target.value)}
        />
      <button onClick={buscarPokemon}>Buscar Pokemon</button>
      {pokemonFiltrado.map((pokemon, index) => {
        return (
          <Pokemon key={index} name={pokemon.name} />
        );
      })}
      
  
    </div>
  );
}

export default App;
