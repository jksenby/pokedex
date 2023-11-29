import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// "pokemons": {
//   "id": 12,
//   "name": "butterfree",
//   "thumb": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
//   "types": [
//     {
//       "slot": 1,
//       "type": {
//         "name": "bug",
//         "url": "https://pokeapi.co/api/v2/type/7/"
//       }
//     },
//     {
//       "slot":2,
//       "type": {
//         "name": "flying",
//         "url": "https://pokeapi.co/api/v2/type/3/"
//       }
//     }
//   ]
// }
