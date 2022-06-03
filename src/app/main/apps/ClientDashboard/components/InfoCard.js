import * as React from "react";
import { useDispatch } from "react-redux";
import history from "@history";
import { getWholeCaseName } from "app/main/common/functions";
import { CustomTooltip } from "app/main/common/components";
import {
  getMessages,
  setCaseNameObj,
  setCaseId,
  setGroupId,
  getDossierListForMessage
} from "app/store/slices/messagesSlice";

//material-ui
import { Avatar, Button, Paper, Box, Grid } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary
}));

export default function InfoCard({ caseData, lawyerData }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Item className="h-full mt-md-0 flex">
              <div className="ml-12 mt-12">
                <h1
                  className="py-1 font-semibold text-base textWidthLimit"
                  style={{ color: theme.palette.primary.main }}
                >
                  Mon dossier
                </h1>
                <h4 className="font-medium text-sm text-black textWidthLimit">
                  {getWholeCaseName(
                    caseData?.case_name,
                    caseData?.procedure?.procedure_type,
                    caseData?.created_date,
                    caseData?.unique_code
                  )}
                </h4>
                <h4 className="font-medium text-sm text-black textWidthLimit">
                  Juridiction : {caseData?.procedure?.procedure_type}
                </h4>
                <h4 className="font-medium text-sm text-black textWidthLimit">
                  Gestionnaire : {lawyerData?.first_name}{" "}
                  {lawyerData?.last_name}
                </h4>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item className="flex items-center res-flex-direction mt-5 mt-md-0 msg-mo dash-monavocat-tab">
              <div className="flex">
                <Avatar
                  className="avatar w-72 h-72 p-8 box-content mon-avocate ml-24"
                  alt="user photo"
                  src={lawyerData?.profile || "assets/images/logos/profile.jpg"}
                />
                <div className="ml-12">
                  <h1
                    className="py-1 font-semibold text-base textWidthLimit mt-12	"
                    style={{ color: theme.palette.primary.main }}
                  >
                    Mon Avocat
                  </h1>
                  <h4 className="font-medium text-sm text-black textWidthLimit">
                    {lawyerData?.company_name}
                  </h4>
                  <h4 className="font-medium text-sm text-black textWidthLimit">
                    Avocat - {lawyerData?.first_name}
                  </h4>
                  {lawyerData?.website && (
                    <h4 className="font-medium text-sm text-black textWidthLimit">
                      {lawyerData.website}
                    </h4>
                  )}
                </div>
              </div>
              <Button
                onClick={() => {
                  dispatch(getDossierListForMessage());
                  dispatch(setCaseNameObj(caseData));
                  dispatch(setCaseId(caseData?.id));
                  dispatch(setGroupId(caseData?.case_group?.id));
                  dispatch(
                    getMessages({
                      caseId: caseData?.id,
                      groupId: caseData?.case_group?.id
                    })
                  );
                  history.push({
                    pathname: "/apps/messages/all"
                  });
                }}
                variant="contained"
                color="secondary"
                className="mr-16 rounded float-right ml-auto w-auto whitespace-no-wrap linkButton"
              >
                Messagerie
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
