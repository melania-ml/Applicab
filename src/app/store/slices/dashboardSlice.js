import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCalendarData = createAsyncThunk(
  "dashboardSlice/getCalendarData",
  async (obj) => {
    const response = await axios.post(
      "api/caseManagement/getDashboardData",
      obj
    );
    const data = await response.data;
    return { data: data.data };
  }
);

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {},
  reducers: {}
});

export const { setCalendarData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
