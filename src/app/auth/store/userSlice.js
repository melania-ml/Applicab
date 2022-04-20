/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import history from "@history";
import _ from "@lodash";
import {
  setInitialSettings,
  setDefaultSettings
} from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import jwtService from "app/services/jwtService";
import settingsConfig from "app/fuse-configs/settingsConfig";
import { loginError } from "./loginSlice";

export const setUserData = (user) => async (dispatch, getState) => {
  /*
  You can redirect the logged-in user to a specific route depending on his role
  */
  if (user.loginRedirectUrl) {
    settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
  }

  /*
  Set User Settings
  */
  //dispatch(setDefaultSettings(user.data.settings));
  let newUser;
  if (!user.data.profile) {
    newUser = {
      ...user,
      data: { ...user.data, profile: "assets/images/logos/profile.jpg" }
    };
  } else {
    newUser = user;
  }
  dispatch(setUser(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
  dispatch(loginError());

  history.push({
    pathname: "/"
  });

  jwtService.logout();

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

const initialState = {
  role: [], // guest
  data: {
    profile: "assets/images/logos/profile.jpg",
    shortcuts: ["calendar", "mail", "contacts", "todo"]
  }
};

const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState
  },
  extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
