import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import withRouter from "@fuse/core/withRouter";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Tooltip,
  styled,
  tooltipClasses,
  Typography,
  Select,
  Table,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  AppBar,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { cloneElement, memo } from "react";
import _ from "@lodash";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Paper, Input, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContactsSearchText } from "../Email/store/emailSlice";

function Message() {
  function createData(userImage, name, msgTime, userMsg, msgCounter) {
    return { userImage, name, msgTime, userMsg, msgCounter };
  }

  const [allFields, setAllFields] = useState({
    image: "",
    profile: "",
  });

  const rows = [
    createData(
      <Avatar
        className="w-56 h-56 ml-8 mt-4"
        alt="user photo"
        src={
          (allFields.image && URL.createObjectURL(allFields.image)) ||
          allFields.profile
        }
      />,
      <Typography className="mt-32 userName font-bold">
        Altata - SAA-BAH-20211217-0065
      </Typography>,
      <Typography className="font-semibold">Il y a 2 jours</Typography>,
      "Lorem ipsum dolor sit amet",
      1
    ),
    createData(
      <Avatar
        className="w-56 h-56 ml-8 mt-4"
        alt="user photo"
        src={
          (allFields.image && URL.createObjectURL(allFields.image)) ||
          allFields.profile
        }
      />,
      <Typography className="mt-32 userName font-bold">
        Adhoc - SAA-BAH-20211217-0066
      </Typography>,
      <Typography className="font-semibold">Il y a 3 jours</Typography>,
      "Amec dossier duke bike layo",
      2
    ),
  ];

  // const searchText = useSelector(
  //   ({ contactsApp }) => contactsApp.contacts.searchText
  // );
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="mb-5 mb-md-0 box-shadow-dash h-full"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <AppBar
              position="static"
              elevation={0}
              className="rounded-t-lg h-96"
            >
              <Paper
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className="flex p-28 items-center search-bar-contact h-48 m-24 "
              >
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Recherche"
                  // className="flex flex-1 px-16"
                  disableUnderline
                  fullWidth
                  // value={searchText}
                  inputProps={{
                    "aria-label": "Search",
                  }}
                  onChange={(ev) => dispatch(setContactsSearchText(ev))}
                />
              </Paper>
            </AppBar>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  // sx={{
                  //   "&:last-child td, &:last-child th": { border: "none" },
                  // }}
                >
                  <TableCell className="border-none" align="left">
                    {row.userImage}
                  </TableCell>
                  <TableRow className="mt-24" align="left">
                    <b>{row.name}</b>
                    <TableCell
                      className="mt-12 border-none whitespace-pre"
                      align="right"
                    >
                      {row.msgTime}
                    </TableCell>
                  </TableRow>

                  <TableRow className="text-ellipsis" align="left">
                    {row.userMsg}
                  </TableRow>
                  <TableCell className="border-none">
                    <Fab
                      // align="right"
                      variant="circular"
                      className="h-1 w-36 msgCounter"
                      disableRipple={true}
                      // size="small"
                      sx={{
                        boxShadow: 0,
                        backgroundColor: "#22d3ee",
                        "&:hover": { backgroundColor: "#22d3ee" },
                      }}
                      aria-label="add"
                    >
                      {row.msgCounter}
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Grid>

          <Grid item xs={12} md={9}>
            <AppBar
              position="static"
              elevation={0}
              className="rounded-t-lg max-h-96"
            >
              {/* <Avatar
                className="w-68 h-68 ml-60 mt-16"
                alt="user photo"
                src={
                  (allFields.image && URL.createObjectURL(allFields.image)) ||
                  allFields.profile
                }
              /> */}
              <Typography
                variant="subtitle1"
                color="inherit"
                className="h-68 ml-60 mt-32"
              >
                Altata - SAA-CIV-20210120-003
              </Typography>
            </AppBar>
            <br />
            <br />
            <div
              style={{
                display: "inline-block",
                width: "100%",
                marginRight: "2rem",
              }}
            >
              <Avatar
                className="w-24 h-24 ml-36 clientAvatar"
                alt="user photo"
                src={
                  (allFields.image && URL.createObjectURL(allFields.image)) ||
                  allFields.profile
                }
              />
              <Typography
                variant="subtitle1"
                color="#192A3E"
                className="clientName"
              >
                Avocat - Melania Munoz
              </Typography>
              <Typography
                variant="subtitle1"
                color="#BABABF"
                className="msgTime"
              >
                11:12
              </Typography>
              <Card className="max-w-md ml-36">
                <CardContent>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Nibh mauris cursus mattis molestie. Ligula
                    ullamcorper malesuada proin libero nunc consequat interdum.
                    A lacus vestibulum sed arcu non odio euismod lacinia.
                    Aliquet eget sit amet tellus cras adipiscing enim.
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Avatar
                className="w-24 h-24 float-right clientAvatar"
                alt="user photo"
                src={
                  (allFields.image && URL.createObjectURL(allFields.image)) ||
                  allFields.profile
                }
              />
              <Typography
                variant="subtitle1"
                color="#192A3E"
                className="senderClient"
              >
                Vous Shasha Andrie
              </Typography>
              <Typography
                variant="subtitle1"
                color="#BABABF"
                className="senderTime"
              >
                11:20
              </Typography>
              <Card className="max-w-md float-right mr-36">
                <CardContent
                  className="max-w-md"
                  style={{
                    background: "#272E41",
                    color: "#F8F8F8",
                    alignItems: "right",
                  }}
                >
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Nibh mauris cursus mattis molestie. Ligula
                    ullamcorper malesuada proin libero nunc consequat interdum.
                    A lacus vestibulum sed arcu non odio euismod lacinia.
                    Aliquet eget sit amet tellus cras adipiscing enim.
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <br />
            <br />
            <hr />
            <br />
            <Typography variant="h6">
              Subject : Codes d'accès AppliCab envoi au(x) client(s)
            </Typography>
            <Typography variant="h6">Date : 15/12/2022 18:30:00</Typography>
            <br />
            <Typography variant="subtitle1" className="max-w-md">
              Chère Madame, Cher Monsieur, Je reviens vers vous dans le dossier
              visé en référence et fais suite à votre courriel. Je vous confirme
              que nous avons effectivement en notre possession le jugement
              original. A quelle adresse pouvons-nous effectuer cet envoi? Vous
              remerciant par avance pour votre retour, Je vous prie de croire,
              Chère Madame, Cher Monsieur, à l'assurance de mes salutations
              distinguées et dévouées.
            </Typography>
            <br />
            <br />
            <hr />
            <br />
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 24, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center h-48 sendButton"
            >
              <Icon className="flex flex-1 px-36" color="action">
                sentiment_satisfied
              </Icon>
              <Input
                placeholder="Envoyer un message..."
                className="flex flex-initial w-11/12"
                disableUnderline
                fullWidth
              />
              <Icon
                className="flex flex-1 pr-44"
                color="action"
                onClick={() => setAttachDocument(null)}
              >
                attachment
              </Icon>
            </Paper>
            <br />
            <br />
            <br />
            <br />
            <br />
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}

export default withRouter(Message);
