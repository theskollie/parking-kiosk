import { configureStore } from "@reduxjs/toolkit";
import lotReducer from "./lotSlice";
import ticketReducer from "./ticketSlice";

export const store = configureStore({
  reducer: {
    lot: lotReducer,
    ticket: ticketReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
