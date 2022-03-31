import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  });

  middlewares.push(logger);
}
const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, createReducer());

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === "development"
});

export const persistor = persistStore(store);

store.persistor = persistor;

export default store;
