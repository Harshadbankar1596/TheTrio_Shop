import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { adminApiSlice } from "./Admin/adminAPI";
import adminReducer from "./Admin/adminSlice";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Persist admin slice
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin"],
};

const rootReducer = combineReducers({
  admin: adminReducer,
  [adminApiSlice.reducerPath]: adminApiSlice.reducer,
});

// Persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(adminApiSlice.middleware),
});

// Persistor
export const persistor = persistStore(store);

