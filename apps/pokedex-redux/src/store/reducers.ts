import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import pokemon, { IPokemonState } from "./pokemon/slice";
import { HYDRATE } from "next-redux-wrapper";

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
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default reducers;
