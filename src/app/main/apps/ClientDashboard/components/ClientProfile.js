import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateProfileData } from "./store/userMenuSlice";
import { setUser } from "app/auth/store/userSlice";
import {
  Dialog,
  AppBar,
  Typography,
  Toolbar,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar
} from "@mui/material";
import { updateProfileData } from "app/store/slices/userMenuSlice";

function ClientProfile(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const { userData } = useSelector(({ userMenu }) => userMenu);
  const [allFields, setAllFields] = useState({
    title: "",
    image: "",
    profile: "",
    enterPriseName: "",
    name: "",
    firstName: "",
    address: "",
    CP: "",
    city: "",
    mobile1: "",
    lawyerData: "",
    comments: ""
  });
  useEffect(() => {
    setAllFields({
      ...allFields,
      enterPriseName: userData.company_name,
      title: userData.title,
      name: userData.last_name,
      firstName: userData.first_name,
      address: userData.address,
      city: userData.city,
      CP: userData.CP,
      mobile1: userData.phone_number,
      lawyerData: userData.lawyerData,
      comments: userData.comments
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

  const saveProfile = () => {
    dispatch(updateProfileData(allFields, user?.data?.id));
    props.onClose();
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const onImageUpload = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setAllFields({ ...allFields, profile: base64, image: file });
  };
  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Modifier mes données personnelles
          </Typography>
        </Toolbar>
        <div className="flex justify-center align-center">
          <Avatar
            className="w-72 h-72"
            alt="user photo"
            src={
              (allFields.image && URL.createObjectURL(allFields.image)) ||
              allFields.profile
            }
          />
        </div>
        <label
          style={{ cursor: "pointer" }}
          className="flex justify-center align-center w-full mb-8"
          htmlFor="icon-button-file"
        >
          Choisir une photo
        </label>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={onImageUpload}
        />
      </AppBar>
      <DialogContent>
        <TextField
          className="mb-12"
          name="Name"
          label="Nom d'entreprise"
          variant="outlined"
          fullWidth
          value={allFields.enterPriseName}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              enterPriseName: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Titre"
          variant="outlined"
          fullWidth
          value={allFields.title}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              title: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Nom"
          variant="outlined"
          fullWidth
          value={allFields.name}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              name: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          label="Prénom"
          variant="outlined"
          fullWidth
          value={allFields.firstName}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              firstName: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Adresse"
          variant="outlined"
          fullWidth
          value={allFields.address}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              address: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Ville"
          variant="outlined"
          fullWidth
          value={allFields.city}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              city: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="CP"
          variant="outlined"
          fullWidth
          value={allFields.CP}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              CP: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Mobile"
          type="number"
          variant="outlined"
          fullWidth
          value={allFields.mobile1}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              mobile1: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          type="text"
          label="Fixe"
          variant="outlined"
          fullWidth
          value={allFields.lawyerData}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              lawyerData: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          label="Commentaire"
          variant="outlined"
          multiline
          rows={5}
          fullWidth
          value={allFields.comments}
          onChange={(e) =>
            setAllFields({
              ...allFields,
              comments: e.target.value
            })
          }
        />
      </DialogContent>
      <DialogActions className="justify-between p-4 pb-16">
        <div>
          <Button
            variant="contained"
            color="secondary"
            style={{ borderRadius: 0 }}
            onClick={saveProfile}
          >
            Enregistrer
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
export default ClientProfile;
