import { fetchPokemon, pokemonSelector } from "../PokeList/PokeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PokeInfo = () => {
  const dispatch = useDispatch();
  let id = "";
  for (let i = window.location.href.length - 1; i >= 0; i--) {
    if (window.location.href[i] === "/") {
      id = +id.split("").reverse().join("");
      break;
    }
    id += window.location.href[i];
  }
  const pokemon = useSelector(pokemonSelector)[id];
  console.log(pokemon);
  useEffect(() => {
    dispatch(fetchPokemon(id));
    // eslint-disable-next-line
  }, []);
  return <button>ad</button>;
};

export default PokeInfo;
