import { useState, useEffect } from 'react';
import GetPokemon from './components/Pokemon/GetPokemon';
import type { Pokemon } from './components/Pokemon/GetPokemon';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);

  async function fetchPokemon() {
    const rndmId = Math.floor(Math.random() * 1017);
    const url = 'https://pokeapi.co/api/v2/pokemon/' + rndmId;
    const res = await fetch(url);
    const data = await res.json();
    setPokemon(data);
  }

  function ifCatched(exp: number) {
    const chance = Math.random();
    const catched = -0.00109 * exp + 0.549;
    return chance <= catched;
  }

  async function handleCatch() {
    if (ifCatched(pokemon.base_experience)) {
      const response = await fetch('http://localhost:3000/api/pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pokemon.name,
          base_experience: pokemon.base_experience,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Caught Pokémon:', data);
      } else {
        console.log('Failed to catch Pokémon');
      }
    } else {
      console.log('Pokémon escaped!');
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className='w-full h-screen bg-slate-400'>
      <GetPokemon data={pokemon} />
      <button onClick={handleCatch}>Catch</button>
    </div>
  );
}

export default App;
