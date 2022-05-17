import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getCaseList = (id) => async (dispatch) => {
  await axios
    .post(`api/common/filterData/caseManagement/CaseManagement`, {
      query: {
        client_id: id,
        status__in: ["Ouvert", "En attente"]
      },
      orderBy: "-created_date"
    })
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setCaseList(data.data.data));
      }
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

export const getClientDashboardData = (id) => async (dispatch) => {
  await axios
    .get(`api/caseManagement/clientDashboardData/${id}`)
    .then((data) => {
      if (data.data.status === 200 && data.data.success) {
        dispatch(setCaseData(data.data.data.case_management_data));
        dispatch(setLawyerData(data.data.data.lawyer_data));
        dispatch(setDocuments(data.data.data.case_management_documents));
        dispatch(setTodos(data.data.data.case_task));
        dispatch(setCalendarData(data.data.data.calender_data));
      }
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.response.message }));
    });
};

const clientDashboardSlice = createSlice({
  name: "clientDashboard",
  initialState: {
    caseList: [],
    lawyerData: {},
    caseData: {},
    documents: [],
    todos: [],
    calendarData: []
  },
  reducers: {
    setCaseList: (state, action) => {
      state.caseList = action.payload;
    },
    setLawyerData: (state, action) => {
      state.lawyerData = action.payload;
    },
    setCaseData: (state, action) => {
      state.caseData = action.payload;
    },
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setCalendarData: (state, action) => {
      state.calendarData = action.payload;
    }
  },
  extraReducers: {}
});

export const {
  setCaseList,
  setLawyerData,
  setCaseData,
  setDocuments,
  setTodos,
  setCalendarData
} = clientDashboardSlice.actions;

export default clientDashboardSlice.reducer;
