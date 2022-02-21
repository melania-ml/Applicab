import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const callCreatePassword =
  ({ password, token }) =>
  async (dispatch) => {
    debugger;
    await axios
      .post(`auth/user/setPassword/${token}`, {
        password
      })
      .then((data) => {
        if (data.data.data.passwordCreated && data.data.success) {
          dispatch(showMessage({ message: data.data.message }));
          return dispatch(CreatePasswordSuccess());
        }
      })
      .catch((errors) => {
        return dispatch(CreatePasswordError(errors));
      });
  };

const createPasswordSlice = createSlice({
  name: "createPassword",
  initialState: {
    success: false,
    errors: []
  },
  reducers: {
    CreatePasswordSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    CreatePasswordError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    }
  },
  extraReducers: {}
});

export const { CreatePasswordSuccess, CreatePasswordError } =
  createPasswordSlice.actions;

export default createPasswordSlice.reducer;
