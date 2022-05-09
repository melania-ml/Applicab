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
    clientDashboard
  });
  return combinedReducer(state, action);
};

export default createReducer;
