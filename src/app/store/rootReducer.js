import { combineReducers } from "@reduxjs/toolkit";
import auth from "app/auth/store";
import fuse from "./fuse";
import i18n from "./i18nSlice";
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
    i18n,
    contacts,
    dossiers,
    verifyEmail,
    resetPassword,
    forgotPassword,
    createPassword
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === "auth/user/userLoggedOut") {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
