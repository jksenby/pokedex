import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function defineType(type) {
  switch (type) {
    case "normal":
      return "#A8A878";
    case "grass":
      return "#78C850";
    case "fire":
      return "#E97F34";
    case "water":
      return "#6890F0";
    case "electric":
      return "#F8D030";
    case "ice":
      return "#98D8D8";
    case "fighting":
      return "#C03028";
    case "poison":
      return "#D589AC";
    case "ground":
      return "#E0C068";
    case "flying":
      return "#A890F0";
    case "psychic":
      return "#F75987";
    case "bug":
      return "#A8B820";
    case "rock":
      return "#B29C3F";
    case "ghost":
      return "#7B6D7D";
    case "dragon":
      return "#7038F8";
    case "dark":
      return "#705848";
    case "steel":
      return "#A8A5B4";
    case "fairy":
      return "#F0B6BC";
    default:
      return "#232222";
  }
}
export default function useRenderItems(arr, ...props) {
  if (arr === null) {
    return null;
  }
  const items = arr.map((item) => {
    let typeNames = "";
    const types = item.types.map((itemtype) => {
      const typeColor = defineType(itemtype.type.name);
      typeNames += typeColor + ",";
      return (
        <button style={{ backgroundColor: typeColor }}>
          {itemtype.type.name}
        </button>
      );
    });
    let type = {};
    if (item.types.length === 1) {
      type = {
        border: `3px solid ${typeNames.slice(0, typeNames.length - 1)}`,
      };
    } else {
      type = {
        border: "3px solid",
        borderImage: `linear-gradient(45deg, ${typeNames.slice(
          0,
          typeNames.length - 1
        )}) 1`,
      };
    }
    return (
      <li tabIndex={0} key={item.id}>
        <Link to={`/pokemon/${item.id}`} style={{ textDecoration: "none" }}>
          <Card style={{ width: "12rem", margin: "50px" }}>
            <Card.Img
              variant="top"
              alt={item.name}
              src={item.thumb}
              style={type}
            />
            <Card.Body>
              <Card.Title>
                {item.name[0].toUpperCase()}
                {item.name.slice(1)}
              </Card.Title>
              {types}
            </Card.Body>
          </Card>
        </Link>
      </li>
    );
  });
  return <ul style={{ display: "-ms-grid" }}>{items}</ul>;
}
