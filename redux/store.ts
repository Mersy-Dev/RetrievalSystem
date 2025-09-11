// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./document/Slice";

export const store = configureStore({
  reducer: {
    documents: documentReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
