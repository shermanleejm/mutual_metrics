import { configureStore } from "@reduxjs/toolkit";
import { usersApi, fundsApi, positionsApi } from "./apis";
import { appSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [appSlice.reducerPath]: appSlice.reducer,
    [fundsApi.reducerPath]: fundsApi.reducer,
    [positionsApi.reducerPath]: positionsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(fundsApi.middleware)
      .concat(positionsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
