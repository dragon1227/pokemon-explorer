/* eslint-disable import/no-cycle -- mixed definition */
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TBasicItem, TPokemonDetails } from "@repo/types";
import { formatPokemonData } from "@repo/utils";
import {
  getPokemonListRequest,
  getPokemonDetailsRequest,
} from "@/lib/requests/pokemon-request";
import { POKEMON_ACTION } from "./actions";
import { setPagination } from "./slice";

export const fetchPokemons = createAsyncThunk<
  {
    results: TBasicItem[] | undefined;
    message: string | undefined;
    hasNext: boolean;
    hasPrev: boolean;
    total: number;
  },
  { page: number; limit: number }
>(POKEMON_ACTION.FETCH, async ({ page = 1, limit = 12 }, { dispatch }) => {
  try {
    dispatch(setPagination({ page, limit }));
    const offset = (page - 1) * limit;
    const res = await getPokemonListRequest({ offset, limit });
    if (!res) throw new Error("Fetch failed");
    dispatch(setPagination({ page, limit, total: res.count }));
    return {
      results: res.results,
      message: undefined,
      hasNext: res.next !== null,
      hasPrev: res.previous !== null,
      total: res.count,
    };
  } catch (err: unknown) {
    return {
      results: undefined,
      // @ts-expect-error
      message: err.message,
      hasNext: false,
      hasPrev: false,
      total: 0,
    };
  }
});

export const fetchPokemonDetail = createAsyncThunk<
  TPokemonDetails | null,
  number
>(POKEMON_ACTION.FETCH_DETAILS, async (id, { dispatch }) => {
  try {
    const pokemonData = await getPokemonDetailsRequest(id);
    const details = formatPokemonData(pokemonData);
    return details;
  } catch (err: unknown) {
    return null;
  }
});
