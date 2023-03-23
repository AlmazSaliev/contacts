import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import Contacts from "./Contacts";

const persistConfig = {
  key: "contact",
  storage,
};

const persistedReducer = persistReducer(persistConfig, Contacts.reducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
