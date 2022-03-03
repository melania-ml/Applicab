import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { styled } from "@mui/material/styles";
import DossiersHeader from "./components/DossiersHeader";
import DossiersList from "./components/DossiersList";
import reducer from "./store";
import { getDossiers, getNatures, getProcedures } from "./store/dossiersSlice";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    minHeight: "auto",
    height: "auto",
    [theme.breakpoints.up("lg")]: {
      height: 140
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
  "& .for-date label": {
    paddingRight: "25px"
  },
  "& .search-bar-dossier": {
    width: 250,
    borderRadius: "5px",
    "@media (max-width: 767px)": {
      width: "100%",
      marginBottom: 10
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

function DossiersApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(async () => {
    await dispatch(getDossiers(routeParams));
    await dispatch(getNatures());
    await dispatch(getProcedures());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<DossiersHeader pageLayout={pageLayout} />}
        content={<DossiersList />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
    </>
  );
}

export default withReducer("dossiersApp", reducer)(DossiersApp);
