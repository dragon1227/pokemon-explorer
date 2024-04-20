import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import reducers from "./reducers";

const makeStore = () =>
  configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== "production",
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = typeof store.dispatch;

export type ReduxThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export default wrapper;
