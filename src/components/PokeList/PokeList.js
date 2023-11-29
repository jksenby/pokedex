import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";
import { fetchPokedex, pokedexSelector } from "./PokeSlice";
import { useDispatch, useSelector } from "react-redux";
import "./pokeList.scss";

import useRenderItems from "../../hooks/useRenderItems";

const PokeList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const pokedex = useSelector(pokedexSelector);
  const pokeList = useRenderItems(pokedex.length > 0 ? pokedex : null);
  const pokeLoadingStatus = useSelector(
    (state) => state.pokemons.pokeLoadingStatus
  );
  useEffect(() => {
    dispatch(fetchPokedex(page));
    // eslint-disable-next-line
  }, [page]);

  // function renderItems(arr) {
  //   const items = arr.map((item) => {
  //     console.log(item);
  //     let typeNames = "";
  //     const types = item.types.map((item) => {
  //       const typeColor = defineType(item.type.name);
  //       typeNames += typeColor + ",";
  //       return (
  //         <button style={{ backgroundColor: typeColor }}>
  //           {item.type.name}
  //         </button>
  //       );
  //     });
  //     let type = {};
  //     if (item.types.length === 1) {
  //       type = {
  //         border: `3px solid ${typeNames.slice(0, typeNames.length - 1)}`,
  //       };
  //     } else {
  //       type = {
  //         border: "3px solid",
  //         borderImage: `linear-gradient(45deg, ${typeNames.slice(
  //           0,
  //           typeNames.length - 1
  //         )}) 1`,
  //       };
  //     }
  //     return (
  //       <li tabIndex={0} key={item.id}>
  //         <Card style={{ width: "12rem", margin: "50px" }}>
  //           <Card.Img
  //             variant="top"
  //             alt={item.name}
  //             src={item.thumb}
  //             style={type}
  //           />
  //           <Card.Body>
  //             <Card.Title>
  //               {item.name[0].toUpperCase()}
  //               {item.name.slice(1)}
  //             </Card.Title>
  //             {types}
  //           </Card.Body>
  //         </Card>
  //       </li>
  //     );
  //   });
  //   return <ul style={{ display: "-ms-grid" }}>{items}</ul>;
  //

  const spinner = pokeLoadingStatus === "loading" ? <Spinner /> : null;
  return (
    <div className="list">
      {pokeList}
      {spinner}
      <Button
        variant="dark"
        onClick={() => {
          setPage((page) => {
            return page + 20;
          });
        }}
      >
        Load more...
      </Button>
    </div>
  );
};

export default PokeList;
