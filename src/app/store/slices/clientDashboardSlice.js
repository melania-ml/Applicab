import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getCaseList = (id) => async (dispatch) => {
  await axios
    .post(`api/common/filterData/caseManagement/CaseManagement`, {
      query: {
        client_id: id,
        status__in: ["Ouvert", "A ouvrir"]
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

const clientDashboardSlice = createSlice({
  name: "clientDashboard",
  initialState: {
    caseList: []
  },
  reducers: {
    setCaseList: (state, action) => {
      state.caseList = action.payload;
    }
  },
  extraReducers: {}
});

export const { setCaseList } = clientDashboardSlice.actions;

export default clientDashboardSlice.reducer;
