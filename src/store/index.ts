import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import customersReducer from "./customers/customerSlice";

const store = configureStore({
  reducer: {
    customers: customersReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReduxThunkDispatch<RootState, any, any>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
