import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import PokeServices from "../../services/PokeServices";

const pokeAdapter = createEntityAdapter();

const initialState = pokeAdapter.getInitialState({
  pokeLoadingStatus: "idle",
  description: null,
});

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (id) => {
    const fetchData = async () => {
      const { getPokemon } = PokeServices();
      const res = await getPokemon(id);
      return res;
    };
    return fetchData();
  }
);
export const fetchDescription = createAsyncThunk(
  "pokemon/fetchDescription",
  async (id) => {
    const fetchData = async () => {
      const { getDescription } = PokeServices();
      const res = await getDescription(id);
      return res;
    };
    return fetchData();
  }
);
export const fetchPokedex = createAsyncThunk(
  "pokedex/fetchPokedex",
  async (page) => {
    const fetchData = async () => {
      const newPokedex = [];
      const { getPokemon } = PokeServices();
      for (let i = page; i < page + 20; i++) {
        const res = await getPokemon(i);
        newPokedex.push(res);
      }
      return newPokedex;
    };
    return fetchData();
  }
);

const pokeSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setId: (state, action) => {
      console.log("2");
      state.pokeId = action.payload;
    },
    getId: (state) => {
      return state.pokeId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokedex.pending, (state) => {
        state.pokeLoadingStatus = "loading";
      })
      .addCase(fetchPokedex.fulfilled, (state, action) => {
        state.pokeLoadingStatus = "idle";
        pokeAdapter.addMany(state, action.payload);
      })
      .addCase(fetchPokedex.rejected, (state) => {
        state.pokeLoadingStatus = "error";
      })
      .addCase(fetchPokemon.pending, (state) => {
        state.pokeLoadingStatus = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.pokeLoadingStatus = "idle";
        pokeAdapter.addOne(state, action.payload);
      })
      .addCase(fetchPokemon.rejected, (state) => {
        state.pokeLoadingStatus = "error";
      })
      .addCase(fetchDescription.pending, (state) => {
        state.pokeLoadingStatus = "loading";
      })
      .addCase(fetchDescription.fulfilled, (state, action) => {
        state.pokeLoadingStatus = "idle";
        state.description = action.payload;
      })
      .addCase(fetchDescription.rejected, (state) => {
        state.pokeLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = pokeSlice;
export default reducer;

const { selectAll } = pokeAdapter.getSelectors((state) => state.pokemons);
const { selectEntities } = pokeAdapter.getSelectors((state) => state.pokemons);
export const pokemonSelector = createSelector(selectEntities, (pokemon) => {
  return pokemon;
});
export const pokedexSelector = createSelector(selectAll, (pokedex) => {
  return pokedex;
});
export const { setId, getId } = actions;
