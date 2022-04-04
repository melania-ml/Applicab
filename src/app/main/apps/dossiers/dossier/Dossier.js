import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import withReducer from "app/store/withReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider } from "react-hook-form";
import {
  getContacts,
  getNatures,
  getProcedures
} from "app/store/slices/dossiersSlice";
import reducer from "app/store";

import DossierHeader from "./DossierHeader";
import InformationTab from "./tabs/InformationTab";
import EtapesTab from "./tabs/EtapesTab";
import EmailTab from "./tabs/EmailTab";
import DocumentsTab from "./tabs/DocumentsTab";

//material-ui
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

const Root = styled(FusePageCarded)(({ theme }) => ({
  "& .FusePageCarded-header": {
    minHeight: 100,
    height: 100,
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      minHeight: 100,
      height: 100
    }
  },
  "& .FusePageCarded-contentWrapper": {
    padding: 0
  },
  "& .search-bar-dossier": {
    borderRadius: 5
  }
}));

function Dossier(props) {
  const routeParams = useParams();
  const dispatch = useDispatch();

  const {
    isCaseAdded,
    editDossierData: { type },
    etapeTabFromAction
  } = useSelector(({ dossiers }) => dossiers);

  const [tabValue, setTabValue] = useState(
    type === "edit" && etapeTabFromAction ? 1 : 0
  );
  useEffect(() => {
    if (type === "new" && isCaseAdded) {
      setTabValue(1);
    }
  }, [isCaseAdded, etapeTabFromAction, type]);

  useDeepCompareEffect(async () => {
    await dispatch(getNatures());
    await dispatch(getProcedures());
    await dispatch(getContacts());
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
            <Tab
              className="h-64 w-1/4 max-w-full"
              label="Informations"
              disabled={type === "new" && isCaseAdded}
            />
            <Tab
              className="h-64 w-1/4 max-w-full"
              label="Étapes"
              disabled={type === "new" && !isCaseAdded}
            />
            <Tab
              className="h-64 w-1/4 max-w-full"
              label="Messages"
              disabled={type === "new" && !isCaseAdded}
            />
            <Tab
              className="h-64 w-1/4 max-w-full"
              label="Documents"
              disabled={type === "new" && !isCaseAdded}
            />
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
