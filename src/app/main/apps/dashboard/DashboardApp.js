import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Calendar from "./components/Calendar";
import Filters from "./components/Filters";
import { getCalendarData } from "app/store/slices/dashboardSlice";
import { getFormattedDateTime } from "app/main/common/functions";

//material-ui
import { styled } from "@mui/material/styles";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up("lg")]: {
      minHeight: 100,
      height: 100
    },
    "@media (max-width: 767px)": {
      display: "block",
      paddingTop: "10px",
      width: "100%"
    }
  },
  "& .FusePageSimple-wrapper": {
    minHeight: 0
  },
  "& .FusePageSimple-contentWrapper": {
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: "24px 16px",
      height: "100%"
    }
  },
  "& .FusePageSimple-content": {
    display: "flex",
    height: "auto",
    "@media (max-width: 991px)": {
      display: "block"
    }
  },
  "& .FusePageSimple-sidebar": {
    width: 256,
    border: 0
  },
  "& .box-shadow-dash": {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
  },
  "& .for-width-todo": {
    width: "50%",
    "@media (max-width: 992px)": {
      width: "100%"
    }
  }
}));

function DashboardApp() {
  const [calendarData, setCalendarData] = useState([]);
  const dispatch = useDispatch();
  const pageLayout = useRef(null);

  const callGetCalendarData = (obj) => {
    dispatch(getCalendarData(obj))
      .unwrap()
      .then((data) => {
        let calendarData = data.data;
        calendarData =
          calendarData?.length > 0
            ? calendarData.map((calendar) => {
                calendar.start = getFormattedDateTime({
                  date: calendar.start
                });
                calendar.end = getFormattedDateTime({ date: calendar.end });
                return calendar;
              })
            : calendarData;
        setCalendarData(calendarData);
      });
  };

  useEffect(() => {
    callGetCalendarData({});
  }, [dispatch]);

  return (
    <>
      <Root
        header={<Filters callGetCalendarData={callGetCalendarData} />}
        content={
          <Calendar
            calendarData={calendarData}
            callGetCalendarData={callGetCalendarData}
          />
        }
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
}

export default DashboardApp;
