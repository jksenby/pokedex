const PokeServices = () => {
  const _apiBase = "https://pokeapi.co/api/v2/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const getResource = async (property, i) => {
    try {
      const url = `${_apiBase}${property}/${i}`;
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const getPokemon = async (id) => {
    const pokemon = await getResource("pokemon", id);
    return _transformPokemon(pokemon);
  };
  const getDescription = async (id) => {
    const description = await getResource("pokemon-species", id);
    return description.flavor_text_entries[0].flavor_text;
  };

  const _transformPokemon = (pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      thumb: pokemon.sprites["front_default"],
      types: pokemon.types,
      baseExp: pokemon.base_experience,
      abilities: pokemon.abilities,
      height: pokemon.height,
      moves: pokemon.moves,
      weight: pokemon.weight,
      stats: pokemon.stats,
    };
  };

  return { getPokemon, getDescription };
};

export default PokeServices;
