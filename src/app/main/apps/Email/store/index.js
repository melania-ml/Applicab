import { combineReducers } from "@reduxjs/toolkit";
import contacts from "./emailSlice";

const reducer = combineReducers({
  contacts,
});

export default reducer;
