import { combineReducers } from "@reduxjs/toolkit";
import auth from "app/auth/store";
import fuse from "./fuse";
import contacts from "./slices/contactsSlice";
import dossiers from "./slices/dossiersSlice";
import verifyEmail from "./slices/verifyEmailSlice";
import resetPassword from "./slices/resetPasswordSlice";
import forgotPassword from "./slices/forgotPasswordSlice";
import createPassword from "./slices/createPasswordSlice";
import userMenu from "./slices/userMenuSlice";
import dashboard from "./slices/dashboardSlice";
import clientDashboard from "./slices/clientDashboardSlice";
import messages from "./slices/messagesSlice";

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
    userMenu,
    dashboard,
    clientDashboard,
    messages
  });
  if (action.type === "auth/user/userLoggedOut") {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export default createReducer;
