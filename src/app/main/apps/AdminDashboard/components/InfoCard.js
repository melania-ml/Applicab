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
            <Item className="h-full">
              <h1 className="py-1 font-semibold text-sm text-black">Mon dossier</h1>
              <h4 className="pb-20 font-medium text-sm text-black">
                SAA-BAH-20211217-0065 / Altata Juridiction : Tribunal Judiciaire
                AGEN Gestionnaire : Melania Muñoz
              </h4>{" "}
            </Item>
          </Grid>
          <Grid item xs={12} md={6}>
            <Item className="flex items-center res-flex-direction">
              <Avatar
                className="avatar w-72 h-72 p-8 box-content mon-avocate"
                alt="user photo"
                src={user.data.profile}
              />
              <div>
              <h1 className="py-1 font-semibold text-sm text-black">Mon Avocat</h1>
              <h4 className="pb-12 font-medium text-sm text-black">
                Altata Conseil Company Avocat - Melania Muñoz www.altata.tech
              </h4>
              </div>
              {" "}
              <Button
                // onClick={() => {
                //   dispatch(dispatch(openNewContactDialog()));
                // }}
                variant="contained"
                color="secondary"
                className="w-full rounded"
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
