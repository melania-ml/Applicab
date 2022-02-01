import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/jwtService';

export const callResetPassword =
  (params) =>
    async (dispatch) => {
      return jwtService
        .postCallResetPassword({ params })
        .then((data) => {
          debugger
          if (data.status === 200 && data.success) {
            return dispatch(ResetPasswordSuccess());
          }
        })
        .catch((errors) => {
          debugger
          return dispatch(ResetPasswordError(errors));
        });
    };

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    success: false,
    errors: [],
  },
  reducers: {
    ResetPasswordSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    ResetPasswordError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {}
});

export const { ResetPasswordSuccess, ResetPasswordError } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
