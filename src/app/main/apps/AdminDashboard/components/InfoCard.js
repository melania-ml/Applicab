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
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Item>
              <h1 className="py-16 font-semibold">Mon dossier</h1>
              <h4 className="pb-20 font-medium">
                SAA-BAH-20211217-0065 / Altata Juridiction : Tribunal Judiciaire
                AGEN Gestionnaire : Melania Muñoz
              </h4>{" "}
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Avatar
                className="avatar w-72 h-72 p-8 box-content"
                alt="user photo"
                src={user.data.profile}
              />
              <h1 className="py-16 font-semibold">Mon Avocat</h1>
              <h4 className="pb-12 font-medium">
                Altata Conseil Company Avocat - Melania Muñoz www.altata.tech
              </h4>{" "}
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
