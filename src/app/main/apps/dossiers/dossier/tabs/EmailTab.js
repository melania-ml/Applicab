import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "app/auth/store/userSlice";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  TextField,
  Paper,
  Icon,
  Input
} from "@mui/material";
// import { setContactsSearchText } from "app/main/apps/Email/store/emailSlice";
import { motion } from "framer-motion";
import FuseMessage from "@fuse/core/FuseMessage";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

function EmailTab(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const { userData } = useSelector(({ userMenu }) => userMenu);
  const [allFields, setAllFields] = useState({
    image: "",
    profile: ""
  });
  useEffect(() => {
    setAllFields({
      ...allFields,
      profile: userData.profile
    });
    const newUser = {
      ...user,
      data: {
        ...user.data,
        profile: userData.profile
      }
    };
    if (userData.profile) {
      dispatch(setUser(newUser));
    }
  }, [userData]);

  //   const saveProfile = () => {
  //     dispatch(updateProfileData(allFields, user.data.id));
  //     props.onClose();
  //   };
  //   const convertBase64 = (file) => {
  //     return new Promise((resolve, reject) => {
  //       const fileReader = new FileReader();
  //       fileReader.readAsDataURL(file);
  //       fileReader.onload = () => {
  //         resolve(fileReader.result);
  //       };
  //       fileReader.onerror = (error) => {
  //         reject(error);
  //       };
  //     });
  //   };
  const onImageUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setAllFields({ ...allFields, profile: base64, image: file });
  };
  return (
    <>
      <FuseMessage />
      <motion.div
        className="mb-5 mb-md-0 box-shadow-dash"
        initial={{ y: 50, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        style={{
          background: "#F8F8F8",
          padding: 0,
          height: "auto",
          borderRadius: 10
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          className="rounded-t-lg ... p-4 flex items-center justify-between message-tab-header"
        >
          <div className="flex items-center res-flex-direction">
            <Avatar
              className="w-68 h-68 md:ml-24"
              alt="user photo"
              src={
                (allFields.image && URL.createObjectURL(allFields.image)) ||
                allFields.profile
              }
            />
            <Typography
              variant="subtitle1"
              color="inherit"
              className="messagesTab md:ml-24"
            >
              Altata - SAA-CIV-20210120-003
            </Typography>
          </div>
          <div className="md:mr-24 mt-3 mt-md-0">
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 24, opacity: 1, transition: { delay: 0.2 } }}
              className="flex p-4 search-bar-contact h-48 ... shadow m-auto message-searchbar"
            >
              <Icon color="action">search</Icon>

              <Input
                placeholder="Recherche"
                className="flex flex-1 px-16"
                disableUnderline
                fullWidth
                // value={searchText}
                inputProps={{
                  "aria-label": "Search"
                }}
                onChange={(ev) => dispatch(setContactsSearchText(ev))}
              />
            </Paper>
          </div>
        </AppBar>
        <br />
        <br />
        <div
          style={{
            display: "inline-block",
            width: "100%",
            marginRight: "2rem"
          }}
        >
          <div className="flex mb-10">
            <Avatar
              className="w-24 h-24 md:ml-36"
              alt="user photo"
              src={
                (allFields.image && URL.createObjectURL(allFields.image)) ||
                allFields.profile
              }
            />
            <Typography
              variant="subtitle1"
              color="#192A3E"
              className="senderName ml-2"
            >
              Avocat - Melania Munoz
            </Typography>
            <Typography
              variant="subtitle1"
              color="#BABABF"
              className="readMsgTime"
            >
              11:12
            </Typography>
          </div>
          <Card className="max-w-md md:ml-36">
            <CardContent>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
                mauris cursus mattis molestie. Ligula ullamcorper malesuada
                proin libero nunc consequat interdum. A lacus vestibulum sed
                arcu non odio euismod lacinia. Aliquet eget sit amet tellus cras
                adipiscing enim.
              </Typography>
            </CardContent>
          </Card>
          <br />
          <div className="flex mb-10 justify-end">
            <Avatar
              className="w-24 h-24 float-right receiverAvatar"
              alt="user photo"
              src={
                (allFields.image && URL.createObjectURL(allFields.image)) ||
                allFields.profile
              }
            />
            <Typography
              variant="subtitle1"
              color="#192A3E"
              className="reveiverName ml-2"
            >
              Vous Shasha Andrie
            </Typography>
            <Typography
              variant="subtitle1"
              color="#BABABF"
              className="reveiveMsgTime md:mr-36 sm:mr-2"
            >
              11:20
            </Typography>
          </div>
          <Card className="max-w-md float-right md:mr-36">
            <CardContent
              className="max-w-md"
              style={{
                background: "#272E41",
                color: "#F8F8F8",
                alignItems: "right"
              }}
            >
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
                mauris cursus mattis molestie. Ligula ullamcorper malesuada
                proin libero nunc consequat interdum. A lacus vestibulum sed
                arcu non odio euismod lacinia. Aliquet eget sit amet tellus cras
                adipiscing enim.
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
          Chère Madame, Cher Monsieur, Je reviens vers vous dans le dossier visé
          en référence et fais suite à votre courriel. Je vous confirme que nous
          avons effectivement en notre possession le jugement original. A quelle
          adresse pouvons-nous effectuer cet envoi? Vous remerciant par avance
          pour votre retour, Je vous prie de croire, Chère Madame, Cher
          Monsieur, à l'assurance de mes salutations distinguées et dévouées.
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
      </motion.div>
    </>
  );
}

export default EmailTab;
