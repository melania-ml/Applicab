import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCaseList = createAsyncThunk(
  "clientDashboard/getCaseList",
  async (id) => {
    const response = await axios.post(
      `api/common/filterData/caseManagement/CaseManagement`,
      {
        query: { client_id: id, status__in: ["Ouvert", "En attente"] },
        orderBy: "-created_date"
      }
    );
    const data = await response.data;
    return { data: data.data };
  }
);

export const getClientDashboardData = createAsyncThunk(
  "clientDashboard/getClientDashboardData",
  async (id) => {
    const response = await axios.get(
      `api/caseManagement/clientDashboardData/${id}`
    );
    const data = await response.data;
    return { data: data.data };
  }
);

const clientDashboardSlice = createSlice({
  name: "clientDashboard",
  initialState: {},
  reducers: {},
  extraReducers: {}
});

export const {} = clientDashboardSlice.actions;

export default clientDashboardSlice.reducer;
