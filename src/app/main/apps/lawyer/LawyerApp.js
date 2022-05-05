import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useDeepCompareEffect } from "@fuse/hooks";
import LawyerDialog from "./components/LawyerDialog";
import LawyersHeader from "./components/LawyersHeader";
import LawyersList from "./components/LawyersList";
import { getLawyers, getAllTitles } from "app/store/slices/contactsSlice";

//material-ui
import { styled } from "@mui/material/styles";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: "auto",
    height: "auto",
    [theme.breakpoints.up("lg")]: {
      minHeight: 100,
      height: 100
    }
  },
  "& .FusePageSimple-wrapper": {
    minHeight: "70vh"
  },
  "& .FusePageSimple-contentWrapper": {
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      padding: 24,
      height: "100%"
    }
  },
  "& .FusePageSimple-content": {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  "& .FusePageSimple-sidebar": {
    width: 256,
    border: 0
  },
  "& .for-res-flex-direction": {
    "@media (max-width: 767px)": {
      flexDirection: "column"
    }
  },
  "& .search-bar-contact": {
    width: 250,
    borderRadius: "5px",
    "@media (max-width: 767px)": {
      width: "100%"
    }
  },
  "& .for-full-screen": {
    marginBottom: "15px",
    "@media (min-width: 1920px)": {
      width: "60%",
      marginBottom: "0px"
    }
  },
  "& .for-full-scren-flex": {
    "@media (min-width: 1920px)": {
      display: "flex"
    }
  },
  "& .full-screen-secondwidth": {
    "@media (min-width: 1920px)": {
      width: "40%"
    }
  },
  "& .full-screen-justify-end": {
    "@media (min-width: 1920px)": {
      justifyContent: "end",
      marginRight: 30
    }
  }
}));

function LawyerApp() {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(async () => {
    await dispatch(getLawyers(routeParams));
    await dispatch(getAllTitles());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<LawyersHeader pageLayout={pageLayout} />}
        content={<LawyersList />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <LawyerDialog />
    </>
  );
}

export default LawyerApp;
