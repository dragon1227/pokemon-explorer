import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { TBasicItem, TPokemonDetails } from "@repo/types";
// eslint-disable-next-line import/no-cycle -- mixed definitions
import { fetchPokemons, fetchPokemonDetail } from "./thunk";

export interface IPokemonState {
  pokemons: Record<number, TPokemonDetails>;
  items: TBasicItem[] | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
}

const pokemonInitialState: IPokemonState = {
  pokemons: {},
  items: null,
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  hasNext: true,
  hasPrev: false,
  total: 0,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: pokemonInitialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<TPokemonDetails>) => {
      state.pokemons[action.payload.id] = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; limit: number; total?: number }>,
    ) => {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      if (action.payload.total && action.payload.total > 0)
        state.total = action.payload.total;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      state.items = payload.results ?? null;
      state.hasNext = payload.hasNext;
      state.hasPrev = payload.hasPrev;
      state.isLoading = false;
    });
    builder.addCase(fetchPokemons.pending, (state) => {
      state.items = null;
      state.isLoading = true;
    });
    builder.addCase(fetchPokemons.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.items = null;
      // @ts-expect-error
      state.error = payload?.message;
    });
    builder.addCase(fetchPokemonDetail.fulfilled, (state, { payload }) => {
      if (payload) {
        state.pokemons[payload.id] = payload;
      }
    });
  },
});

export const { addPokemon, setPagination } = pokemonSlice.actions;

export default pokemonSlice.reducer;
