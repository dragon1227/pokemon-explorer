import { useSelector } from "react-redux";
import type { IPokemonState } from "./pokemon/slice";
import type { IStoreState } from "./reducers";

export const getPokemonState = (state: IPokemonState) => state.pokemons;

export const usePokemonStore = () =>
  useSelector((state: IStoreState) => state.pokemon);
