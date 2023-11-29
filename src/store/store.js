import { configureStore } from "@reduxjs/toolkit";
import pokemons from "../components/PokeList/PokeSlice";
import { actionApi } from "../components/SignUpPage/accounts";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { pokemons, [actionApi.reducerPath]: actionApi.reducer },

  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, actionApi.middleware),
});

export default store;
