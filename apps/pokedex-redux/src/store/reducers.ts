import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { IPokemonState } from "./pokemon/slice";
import pokemon from "./pokemon/slice";

export interface IStoreState {
  pokemon: IPokemonState;
}

const combinedReducer = combineReducers({ pokemon });

const reducers: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- no need to worry
    return nextState;
  }
  return combinedReducer(state, action);
};

export default reducers;
