import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import assetSlice from "./slice/assetSlice";
import productSlice from "./slice/ProductSlice";
import cartSlice from "./slice/cartSlice";
import authSlice from "./slice/authSlice";
import billingSlice from "./slice/billingSlice";
import blogSlice from "./slice/blogSlice";
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "home",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);
const rootReducer = combineReducers({
  auth: persistedReducer,

  assets: assetSlice,
  products: productSlice,
  carts: cartSlice,
  bill: billingSlice,
  blog: blogSlice
});
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
