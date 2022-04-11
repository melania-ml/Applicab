import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getProfileData = (userId) => async (dispatch) => {
  await axios
    .get(`api/common/updateRetrieve/user/User/${userId}/`)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setProfileData(data.data.data));
      }
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const updateProfileData = (fields, userId) => async (dispatch) => {
  await axios
    .patch(`auth/user/updateUser/${userId}`, fields)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        const localUser = window.localStorage.getItem("User");
        if (data.data.data.profile) {
          const parsedObj = JSON.parse(localUser);
          const newLocalUser = {
            ...parsedObj,
            data: {
              ...parsedObj.data,
              profile: data.data.data.profile
            }
          };
          window.localStorage.setItem("User", JSON.stringify(newLocalUser));
        }
        dispatch(setProfileData(data.data.data));
        dispatch(showMessage({ message: data.data.message }));
      }
      return data;
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
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
