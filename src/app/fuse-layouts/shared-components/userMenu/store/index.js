import { combineReducers } from "@reduxjs/toolkit";
import userMenu from "./userMenuSlice";

const reducer = combineReducers({
  userMenu
});

export default reducer;
