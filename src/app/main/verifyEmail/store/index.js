import { combineReducers } from "@reduxjs/toolkit";
import verifyEmail from "./verifyEmailSlice";

const reducer = combineReducers({
  verifyEmail
});

export default reducer;
