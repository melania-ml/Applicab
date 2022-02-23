import withReducer from "app/store/withReducer";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import reducer from "./store";
import MyDocuments from "./components/MyDocuments";
import SidebarContent from "./components/SidebarContent";
import InfoCard from "./components/InfoCard";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up("lg")]: {
      minHeight: 100,
      height: 100,
    },
    "@media (max-width: 767px)": {
      display: "block",
      paddingTop: "10px",
      width: "100%",
    },
  },
  "& .FusePageSimple-wrapper": {
    minHeight: 0,
  },
  "& .FusePageSimple-contentWrapper": {
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: "24px 16px",
      height: "100%",
    },
  },
  "& .FusePageSimple-content": {
    display: "flex",
    height: "auto",
    "@media (max-width: 991px)": {
      display: "block",
    },
  },
  "& .FusePageSimple-sidebar": {
    width: 256,
    border: 0,
  },
  "& .box-shadow-dash": {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  "& .for-width-todo": {
    width: "100%",
    "@media (max-width: 992px)": {
      width: "100%",
    },
  },
  "& .mon-avocate img":{
    borderRadius:"60px"
  },
  "& .res-flex-direction": {
    "@media (max-width: 992px)": {
      flexDirection:"column",
    },
  },

  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function MainDashboard() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={2}>
            <SidebarContent />
          </Grid>
          <Grid item xs={12} md={10}>
            <InfoCard />
            <Grid container spacing={5} className="mt-2">
              <Grid item xs={12} md={4}>
                <MyDocuments />
              </Grid>
              <Grid item xs={12} md={4}>
                <Calendar />
              </Grid>
              <Grid item xs={12} md={4}>
                <TodoList />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/*       
      <MyDocuments />
      <Calendar />
      <TodoList /> */}
    </>
  );
}

function DashboardApp() {
  const pageLayout = useRef(null);
  return (
    <>
      <Root
        header={<Filters />}
        content={<MainDashboard />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
}

export default withReducer("calendarApp", reducer)(DashboardApp);
