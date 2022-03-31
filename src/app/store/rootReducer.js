import { combineReducers } from "@reduxjs/toolkit";
import auth from "app/auth/store";
import fuse from "./fuse";
import contacts from "./slices/contactsSlice";
import dossiers from "./slices/dossiersSlice";
import verifyEmail from "./slices/verifyEmailSlice";
import resetPassword from "./slices/resetPasswordSlice";
import forgotPassword from "./slices/forgotPasswordSlice";
import createPassword from "./slices/createPasswordSlice";
import etapes from "./slices/etapesSlice";
import userMenu from "./slices/userMenuSlice";

const createReducer = () => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    fuse,
    contacts,
    dossiers,
    verifyEmail,
    resetPassword,
    forgotPassword,
    createPassword,
    etapes,
    userMenu
  });
  return combinedReducer(state, action);
};

export default createReducer;
