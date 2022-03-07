import { combineReducers } from "@reduxjs/toolkit";
import contacts from "./contactsSlice";
import dossiers from "./dossiersSlice";

const reducer = combineReducers({
  contacts,
  dossiers
});

export default reducer;
