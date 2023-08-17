import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../state";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { quotesApi } from "../api/quotes";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  // blacklist: [quotesApi.reducerPath],
};
const persistedReducer = persistReducer(persistConfig, themeReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
