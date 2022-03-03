import { combineReducers } from "@reduxjs/toolkit";
import dossiers from "./dossiersSlice";

const reducer = combineReducers({
  dossiers
});

export default reducer;
