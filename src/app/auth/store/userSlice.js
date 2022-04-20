import { createSlice } from "@reduxjs/toolkit";
import "firebase/compat/auth";
import history from "@history";
import _ from "@lodash";
import { setInitialSettings } from "app/store/fuse/settingsSlice";
import jwtService from "app/services/jwtService";
import { loginError } from "./loginSlice";

export const setUserData = (user) => async (dispatch, getState) => {
  dispatch(setUser(user));
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
  role: [],
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
