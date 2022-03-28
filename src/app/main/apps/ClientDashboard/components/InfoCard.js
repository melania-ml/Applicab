import * as React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Button } from "@mui/material";
import { motion } from "framer-motion";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InfoCard() {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} columns={12}>
          <Grid item xs={12} md={6}>
            <Item className="h-full mt-5 mt-md-0">
              <h1 className="py-1 font-semibold text-base text-black textWidthLimit">
                Mon dossier
              </h1>
              <h4 className="font-medium text-sm text-black textWidthLimit">
                SAA-BAH-20211217-0065 / Altata
              </h4>
              <h4 className="font-medium text-sm text-black textWidthLimit">
                Juridiction : Tribunal Judiciaire AGEN{" "}
              </h4>
              <h4 className="font-medium text-sm text-black textWidthLimit">
                Gestionnaire : Melania Muñoz
              </h4>
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item className="flex items-center res-flex-direction mt-5 mt-md-0">
              <Avatar
                className="avatar w-72 h-72 p-8 box-content mon-avocate"
                alt="user photo"
                src={user.data.profile}
              />
              <div className="ml-12">
                <h1 className="py-1 font-semibold text-base text-black textWidthLimit">
                  Mon Avocat
                </h1>
                <h4 className="font-medium text-sm text-black textWidthLimit">
                  Altata Conseil Company Altata Conseil Company Altata Conseil
                  Company Altata Conseil Company
                </h4>
                <h4 className="font-medium text-sm text-black textWidthLimit">
                  Avocat - Melania Muñoz Avocat - Melania Muñoz Avocat - Melania
                  Muñoz Avocat - Melania Muñoz
                </h4>
                <h4 className="font-medium text-sm text-black textWidthLimit">
                  www.altata.tech
                </h4>
              </div>
              <Button
                // onClick={() => {
                //   dispatch(dispatch(openNewContactDialog()));
                // }}
                variant="contained"
                color="secondary"
                className="mr-16 rounded float-right ml-auto w-auto whitespace-no-wrap"
              >
                Nouveau message
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
