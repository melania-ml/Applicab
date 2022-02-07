import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const callVerifyEmail = (otp) => async (dispatch) => {
  await axios
    .post("http://178.79.138.121:8080/auth/user/validateEmailOtp", otp)
    .then((data) => {
      if (data.data.status === 201 && data.data.success) {
        return dispatch(VerifyEmailSuccess());
      }
    })
    .catch((errors) => {
      return dispatch(VerifyEmailError(errors));
    });
};

export const callResendOTP =
  ({ userId }) =>
  async (dispatch) => {
    await axios
      .put("http://178.79.138.121:8080/auth/user/resendEmailOtp", userId)
      .then((data) => {
        if (data.data.status === 201 && data.data.success) {
          return dispatch(ResendOTPSuccess());
        }
      })
      .catch((errors) => {
        return dispatch(ResendOTPError(errors));
      });
  };

const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState: {
    success: false,
    errors: []
  },
  reducers: {
    VerifyEmailSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    VerifyEmailError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
    ResendOTPSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    ResendOTPError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    }
  },
  extraReducers: {}
});

export const {
  VerifyEmailSuccess,
  VerifyEmailError,
  ResendOTPSuccess,
  ResendOTPError
} = verifyEmailSlice.actions;

export default verifyEmailSlice.reducer;
