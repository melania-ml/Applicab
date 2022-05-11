import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const sendMessage = (obj) => async (dispatch) => {
  await axios
    .post(`api/caseManagement/sendMessage`, {
      message: obj.message,
      group_id: obj.groupId
    })
    .then((data) => {
      dispatch(
        getMessages({
          caseId: obj.caseId,
          groupId: obj.groupId,
          fromChat: true
        })
      );
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const getMessages = createAsyncThunk(
  "messagesApp/messages/getMessages",
  async ({ caseId, groupId, fromChat }, { dispatch, getState }) => {
    !fromChat && dispatch(setIsLoading(true));
    const response = await axios.get(
      `api/caseManagement/caseGroupMessages/${caseId}`
    );
    const data = await response.data;
    await dispatch(readGroupMessages({ groupId }));
    dispatch(setMessages(data.data.group_message));
    dispatch(setIsLoading(false));
    return data.data;
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

export const getDossierListForMessage = () => async (dispatch) => {
  await axios
    .get(`api/caseManagement/clientChatGroup`)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setDossiersList(data.data.data));
      }
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

const messagesSlice = createSlice({
  name: "messagesApp/messages",
  initialState: {
    dossierList: [],
    messages: {},
    caseNameObj: {},
    isLoading: false,
    caseId: null,
    groupId: null
  },
  reducers: {
    setDossiersList: (state, action) => {
      state.dossierList = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
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
  setMessages,
  setCaseNameObj,
  setIsLoading,
  setCaseId,
  setGroupId
} = messagesSlice.actions;

export default messagesSlice.reducer;
