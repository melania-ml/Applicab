import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import jwtService from "app/services/jwtService";
import { setUserData } from "./userSlice";
import { setProfileData } from "app/store/slices/userMenuSlice";

export const submitLogin =
  ({ email, password, is_admin }) =>
  async (dispatch) => {
    return jwtService
      .signInWithEmailAndPassword(email, password, is_admin)
      .then((user) => {
        const userName = user.data.is_superuser
          ? "Admin"
          : user.data.is_lawyer
          ? "Lawyer"
          : "Client";
        const newUser = {
          ...user,
          data: {
            ...user.data,
            user_type: userName
          }
        };
        const data = { profile: user.data.profile };
        dispatch(setProfileData(data));
        dispatch(setUserData(newUser));
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
