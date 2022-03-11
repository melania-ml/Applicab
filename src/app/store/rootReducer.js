import { combineReducers } from "@reduxjs/toolkit";
import auth from "app/auth/store";
import fuse from "./fuse";
import contacts from "./slices/contactsSlice";
import dossiers from "./slices/dossiersSlice";
import verifyEmail from "./slices/verifyEmailSlice";
import resetPassword from "./slices/resetPasswordSlice";
import forgotPassword from "./slices/forgotPasswordSlice";
import createPassword from "./slices/createPasswordSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    ...asyncReducers,
    auth,
    fuse,
    contacts,
    dossiers,
    verifyEmail,
    resetPassword,
    forgotPassword,
    createPassword
  });
  return combinedReducer(state, action);
};

export default createReducer;
