import { combineReducers } from "@reduxjs/toolkit";
import createPassword from "./createPasswordSlice";

const reducer = combineReducers({
  createPassword
});

export default reducer;
