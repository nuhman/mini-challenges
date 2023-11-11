import { configureStore } from "@reduxjs/toolkit";
import { challengesApi } from "./api";

export const store = configureStore({
  reducer: {
    [challengesApi.reducerPath]: challengesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(challengesApi.middleware),
});
