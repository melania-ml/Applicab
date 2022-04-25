import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const callVerifyEmail = (otp) => async (dispatch) => {
  await axios
    .post("auth/user/validateEmailOtp", {
      emailOtp: otp
    })
    .then((data) => {
      if (data.data.data.validation && data.data.success) {
        dispatch(setCreatePasswordToken(data.data.data.setPasswordToken));
        dispatch(showMessage({ message: data.data.message }));
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
      .put("auth/user/resendEmailOtp", { userId })
      .then((data) => {
        if (data.data.data.otp_shared && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
        }
      })
      .catch((error) => {
        return dispatch(showMessage({ message: error.response.message }));
      });
  };

const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState: {
    success: false,
    errors: [],
    token: ""
  },
  reducers: {
    setCreatePasswordToken: (state, action) => {
      state.token = action.payload;
    },
    VerifyEmailSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    VerifyEmailError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    }
  },
  extraReducers: {}
});

export const { VerifyEmailSuccess, VerifyEmailError, setCreatePasswordToken } =
  verifyEmailSlice.actions;

export default verifyEmailSlice.reducer;
