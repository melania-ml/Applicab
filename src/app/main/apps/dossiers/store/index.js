import { combineReducers } from "@reduxjs/toolkit";
import contacts from "./dossiersSlice";

const reducer = combineReducers({
  contacts
});

export default reducer;
