import { useSelector } from "react-redux";
import { IPokemonState } from "./pokemon/slice";
import { IStoreState } from "./reducers";

export const getPokemonState = (state: IPokemonState) => state.pokemons;

export const usePokemonStore = () =>
  useSelector((state: IStoreState) => state.pokemon);
