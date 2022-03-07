import { combineReducers } from "@reduxjs/toolkit";
import auth from "app/auth/store";
import fuse from "./fuse";
import i18n from "./i18nSlice";
import contacts from "./slices/contactsSlice";
import dossiers from "./slices/dossiersSlice";

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    fuse,
    i18n,
    ...asyncReducers,
    contacts,
    dossiers
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
