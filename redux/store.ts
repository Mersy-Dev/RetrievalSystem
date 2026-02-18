// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./document/Slice";
import authReducer from "./user/Slice";



export const store = configureStore({
  reducer: {
    documents: documentReducer,
    auth: authReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
