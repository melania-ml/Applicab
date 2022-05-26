import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const sendMessage = (obj) => async (dispatch) => {
  await axios
    .post(`api/caseManagement/sendMessage`, {
      message: obj.message,
      group_id: obj.groupId
    })
    .then(() => {})
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const getMessages = createAsyncThunk(
  "messagesApp/messages/getMessages",
  async (obj, { dispatch, getState }) => {
    if (obj?.caseId) {
      !obj.fromChat && dispatch(setIsLoading(true));
      const response = await axios.get(
        `api/caseManagement/caseGroupMessages/${obj.caseId}`
      );
      const data = await response.data;
      await dispatch(readGroupMessages({ groupId: obj.groupId }));
      dispatch(setIsLoading(false));
      return data.data;
    }
  }
);

export const readGroupMessages =
  ({ groupId }) =>
  async (dispatch) => {
    await axios
      .put(`api/caseManagement/readGroupMessages`, {
        group_id: groupId
      })
      .then((data) => {
        if (data.data.status === 200 && data.data.success) {
          dispatch(getDossierListForMessage());
        }
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.message }));
      });
  };

export const getDossierListForMessage = createAsyncThunk(
  "messagesApp/getDossierListForMessage",
  async () => {
    const response = await axios.get(`api/caseManagement/clientChatGroup`);
    const data = await response.data;
    return { data: data.data };
  }
);

const messagesSlice = createSlice({
  name: "messagesApp/messages",
  initialState: {
    caseNameObj: {},
    isLoading: false,
    caseId: null,
    groupId: null
  },
  reducers: {
    setCaseNameObj: (state, action) => {
      state.caseNameObj = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCaseId: (state, action) => {
      state.caseId = action.payload;
    },
    setGroupId: (state, action) => {
      state.groupId = action.payload;
    }
  },
  extraReducers: {}
});

export const {
  setDossiersList,
  setCaseNameObj,
  setIsLoading,
  setCaseId,
  setGroupId
} = messagesSlice.actions;

export default messagesSlice.reducer;
