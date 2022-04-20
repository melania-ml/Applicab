import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import jwtService from "app/services/jwtService";
import { setUserData } from "./userSlice";

export const submitLogin =
  ({ email, password }) =>
  async (dispatch) => {
    return jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserData(user));
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.message }));
        return dispatch(loginError());
      });
  };

const loginSlice = createSlice({
  name: "auth/login",
  initialState: {
    success: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
    },
    loginError: (state, action) => {
      state.success = false;
    }
  },
  extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
