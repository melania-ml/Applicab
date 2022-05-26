import { useRef, useState, useEffect } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import MyDocuments from "./components/MyDocuments";
import SidebarContent from "./components/SidebarContent";
import InfoCard from "./components/InfoCard";
import DashboardHeader from "./components/DashboardHeader";
import {
  getCaseList,
  getClientDashboardData
} from "app/store/slices/clientDashboardSlice";
import { getFormattedDateTime } from "app/main/common/functions";

//material-ui
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: 88,
    height: 96,
    [theme.breakpoints.up("lg")]: {
      minHeight: 92,
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
    width: "100%",
    "@media (max-width: 992px)": {
      width: "100%"
    }
  },
  "& .mon-avocate img": {
    borderRadius: "60px"
  },
  "& .res-flex-direction": {
    "@media (max-width: 992px)": {
      flexDirection: "column"
    }
  },
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary
}));

function MainDashboard() {
  const [caseList, setCaseList] = useState([]);
  const [caseData, setCaseData] = useState({});
  const [lawyerData, setLawyerData] = useState({});
  const [documents, setDocuments] = useState([]);
  const [etapes, setEtapes] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const dispatch = useDispatch();
  const {
    data: { id }
  } = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(getCaseList(id))
      .unwrap()
      .then((data) => {
        setCaseList(data.data);
      });
  }, [dispatch]);

  const getCallClientDashboard = (id) => {
    dispatch(getClientDashboardData(id))
      .unwrap()
      .then(({ data }) => {
        setCaseData(data.case_management_data);
        setLawyerData(data.lawyer_data);
        setDocuments(data.case_management_documents);
        setEtapes(data.case_task);
        let calendarData = data.calender_data;
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
    if (caseList?.length > 0) {
      getCallClientDashboard(caseList[0]?.id);
    }
  }, [caseList]);

  return (
    <>
      {caseList?.length > 0 && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={2}>
              <SidebarContent
                caseList={caseList}
                getCallClientDashboard={getCallClientDashboard}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <InfoCard caseData={caseData} lawyerData={lawyerData} />
              <Grid container spacing={5} className="mt-2">
                <Grid item xs={12} md={4}>
                  <MyDocuments documents={documents} caseData={caseData} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Calendar calendarData={calendarData} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TodoList etapes={etapes} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

function ClientDashboardApp() {
  const pageLayout = useRef(null);
  return (
    <>
      <Root
        header={<DashboardHeader />}
        content={<MainDashboard />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
}

export default ClientDashboardApp;
