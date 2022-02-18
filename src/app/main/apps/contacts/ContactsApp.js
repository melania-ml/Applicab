import FusePageSimple from "@fuse/core/FusePageSimple";
import withReducer from "app/store/withReducer";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { styled } from "@mui/material/styles";
import ContactDialog from "./components/ContactDialog/ContactDialog";
import ContactsHeader from "./components/ContactsHeader";
import ContactsList from "./components/ContactsList";
import reducer from "./store";
import { getContacts, getAllTitles } from "./store/contactsSlice";
import { getUserData } from "./store/userSlice";

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
  "& .search-bar-contact": {
    width: 250,
    borderRadius: "5px",
    "@media (max-width: 767px)": {
      width: "100%"
    }
  },
  "& .for-full-screen": {
    marginBottom:"15px",
    "@media (min-width: 1920px)": {
      width: "60%",
      marginBottom: "0px"
    }
  },
  "& .for-full-scren-flex": {
    "@media (min-width: 1920px)": {
      display:"flex"
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
      marginRight:30
    }
  },
}));

function ContactsApp(props) {
  const dispatch = useDispatch();

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    dispatch(getContacts(routeParams));
    dispatch(getUserData());
    dispatch(getAllTitles());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<ContactsHeader pageLayout={pageLayout} />}
        content={<ContactsList />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <ContactDialog />
    </>
  );
}

export default withReducer("contactsApp", reducer)(ContactsApp);
