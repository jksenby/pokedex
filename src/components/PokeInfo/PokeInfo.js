import "./PokeInfo.scss";

import {
  fetchPokemon,
  pokemonSelector,
  fetchDescription,
} from "../PokeList/PokeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import store from "../../store/store";
import Spinner from "../Spinner/Spinner";

const PokeInfo = () => {
  const [wtf, setWtf] = useState(0);
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
  const description = store.getState().pokemons.description;

  useEffect(() => {
    dispatch(fetchPokemon(id));
    dispatch(fetchDescription(id));
    // eslint-disable-next-line
  }, []);

  if (!pokemon || !description) {
    return <Spinner />;
  }
  console.log(pokemon + " - " + description);
  return (
    <Container>
      {wtf}
      <div className="info-wrapper">
        <Row>
          <Col className="col">
            <img src={pokemon.thumb} alt="pokeImage" />
          </Col>
          <Col className="col">
            <h1>
              {pokemon.name[0].toUpperCase()}
              {pokemon.name.slice(1)}
            </h1>
            <p>{description}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PokeInfo;
