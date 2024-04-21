import { createSlice } from "@reduxjs/toolkit";
import type { TBasicItem, TPokemonDetails } from "@repo/types";
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
    // no reducer actions needed currently
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state, { meta }) => {
      const { page, limit } = meta.arg;
      state.items = null;
      state.isLoading = true;
      state.page = page;
      state.limit = limit;
    });
    builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      const { results, message, hasNext, hasPrev, total } = payload;
      state.items = results ?? null;
      state.hasNext = hasNext;
      state.hasPrev = hasPrev;
      state.total = total;
      state.error = message ?? null;
      state.isLoading = false;
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

export default pokemonSlice.reducer;
