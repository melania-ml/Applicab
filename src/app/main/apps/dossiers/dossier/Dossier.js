import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import {
  addContact,
  resetDossier,
  getContacts,
  getNatures,
  getProcedures
} from "../store/dossiersSlice";
import reducer from "../store";
import DossierHeader from "./DossierHeader";
import InformationTab from "./tabs/InformationTab";
import EtapesTab from "./tabs/EtapesTab";
import EmailTab from "./tabs/EmailTab";
import DocumentsTab from "./tabs/DocumentsTab";

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {
    minHeight: 145,
    height: 145,
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      minHeight: 100,
      height: 100
    }
  },
  "& .FusePageCarded-contentWrapper": {
    padding: 0
  }
}));

function Dossier(props) {
  const [tabValue, setTabValue] = useState(0);
  const routeParams = useParams();
  const dispatch = useDispatch();
  useDeepCompareEffect(async () => {
    await dispatch(getNatures());
    await dispatch(getProcedures());
  }, [dispatch, routeParams]);

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  return (
    <FormProvider>
      <Root
        header={<DossierHeader />}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: "w-full h-94 caseManagementTabs" }}
          >
            <Tab className="h-64 w-1/4 max-w-full" label="Informations" />
            <Tab className="h-64 w-1/4 max-w-full" label="Étapes" />
            <Tab className="h-64 w-1/4 max-w-full" label="Messages" />
            <Tab className="h-64 w-1/4 max-w-full" label="Documents" />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24">
            <div className={tabValue !== 0 ? "hidden" : ""}>
              <InformationTab />
            </div>
            <div className={tabValue !== 1 ? "hidden" : ""}>
              <EtapesTab />
            </div>
            <div className={tabValue !== 2 ? "hidden" : ""}>
              <EmailTab />
            </div>
            <div className={tabValue !== 3 ? "hidden" : ""}>
              <DocumentsTab />
            </div>
          </div>
        }
        innerScroll
      />
    </FormProvider>
  );
}
export default withReducer("dossiersApp", reducer)(Dossier);
