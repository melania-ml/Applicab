import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getProfileData = (userId) => async (dispatch) => {
  await axios
    .get(
      `http://178.79.138.121:8080/api/common/updateRetrieve/user/User/${userId}/`
    )
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setProfileData(data.data.data));
      }
    })
    .catch((errors) => {
      console.error(errors);
    });
};

export const updateProfileData = (fields, userId) => async (dispatch) => {
  await axios
    .patch(`http://178.79.138.121:8080/auth/user/updateUser/${userId}`, fields)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setProfileData(data.data.data));
        dispatch(showMessage({ message: data.data.message }));
      }
      return data;
    })
    .catch((errors) => {
      console.error(errors);
    });
};

const userMenuSlice = createSlice({
  name: "userMenu",
  initialState: {
    userData: {}
  },
  reducers: {
    setProfileData: (state, action) => {
      state.userData = action.payload;
    }
  },
  extraReducers: {}
});

export const { setProfileData } = userMenuSlice.actions;

export default userMenuSlice.reducer;
