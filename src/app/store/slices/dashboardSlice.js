import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import { getFormattedDateTime } from "app/main/common/functions";

export const getCalendarData = (obj) => async (dispatch) => {
  await axios
    .post("api/caseManagement/getDashboardData", obj)
    .then((data) => {
      const response = data.data;
      response.data =
        response.data?.length > 0
          ? response.data.map((calendar) => {
              calendar.start = getFormattedDateTime({
                date: calendar.start
              });
              calendar.end = getFormattedDateTime({ date: calendar.end });
              return calendar;
            })
          : response.data;
      dispatch(setCalendarData(response.data));
    })
    .catch((errors) => {
      return dispatch(showMessage({ message: errors.response.data.message }));
    });
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    calendarData: []
  },
  reducers: {
    setCalendarData: (state, action) => {
      state.calendarData = action.payload;
    }
  }
});

export const { setCalendarData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
