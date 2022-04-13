import { createSlice } from "@reduxjs/toolkit";
import jwtService from "app/services/jwtService";
import { showMessage } from "app/store/fuse/messageSlice";

export const callForgotPassword =
  ({ email }) =>
  async (dispatch) => {
    return jwtService
      .getForgotPasswordMail({ email })
      .then((data) => {
        if (data.status === 201 && data.success) {
          return dispatch(ForgotPasswordSuccess());
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.message }));
        return dispatch(ForgotPasswordError(error));
      });
  };

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    success: false,
    errors: []
  },
  reducers: {
    ForgotPasswordSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    ForgotPasswordError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    }
  },
  extraReducers: {}
});

export const { ForgotPasswordSuccess, ForgotPasswordError } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
