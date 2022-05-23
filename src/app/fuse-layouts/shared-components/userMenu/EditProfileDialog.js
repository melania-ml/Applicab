import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileData } from "app/store/slices/userMenuSlice";
import { setUser } from "app/auth/store/userSlice";

//material-ui
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
import { checkIsMobileNumber } from "app/main/common/functions";

function EditProfileDialog(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const { userData } = useSelector(({ userMenu }) => userMenu);
  const [errors, setErrors] = useState({});
  const [allFields, setAllFields] = useState({
    image: "",
    profile: "",
    enterPriseName: "",
    name: "",
    firstName: "",
    function: "",
    email: "",
    website: "",
    address: "",
    city: "",
    postal_code: "",
    phone_number: "",
    fixe: ""
  });
  useEffect(() => {
    setAllFields({
      ...allFields,
      enterPriseName: userData.company_name,
      name: userData.last_name,
      firstName: userData.first_name,
      function: userData.function,
      email: userData.email,
      address: userData.address,
      city: userData.city,
      postal_code: userData.postal_code,
      phone_number: userData.phone_number,
      fixe: userData.fixe,
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

  const saveProfile = () => {
    if (!allFields.image) {
      delete allFields["profile"];
    }
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

  const checkIsDisable = (name, val) => {
    const value = val.trim();
    if (name === "mobile1") {
      const regex =
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
      if (value) {
        if (regex.test(value) === false) {
          setErrors({
            ...errors,
            mobile1: "Please enter valid Mobile number"
          });
        } else {
          setErrors({ ...errors, mobile1: "" });
        }
      } else {
        setErrors({ ...errors, mobile1: "" });
      }
    }
    if (name === "mobile2") {
      const regex =
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
      if (value) {
        if (regex.test(value) === false) {
          setErrors({
            ...errors,
            mobile2: "Please enter valid Mobile number"
          });
        } else {
          setErrors({ ...errors, mobile2: "" });
        }
      } else {
        setErrors({ ...errors, mobile2: "" });
      }
    }
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
          disabled
          inputProps={{ maxLength: 100 }}
          value={allFields.enterPriseName}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Nom"
          variant="outlined"
          fullWidth
          disabled
          inputProps={{ maxLength: 100 }}
          value={allFields.name}
        />
        <TextField
          className="mb-12"
          label="Prénom"
          variant="outlined"
          fullWidth
          disabled
          inputProps={{ maxLength: 100 }}
          value={allFields.firstName}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Fonction"
          variant="outlined"
          fullWidth
          autoComplete="off"
          inputProps={{ maxLength: 100 }}
          value={allFields.function}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              function: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Email"
          variant="outlined"
          fullWidth
          disabled
          inputProps={{ maxLength: 100 }}
          value={allFields.email}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Website"
          variant="outlined"
          fullWidth
          autoComplete="off"
          inputProps={{ maxLength: 100 }}
          value={allFields.website}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              website: e.target.value
            });
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Adresse"
          variant="outlined"
          fullWidth
          autoComplete="off"
          inputProps={{ maxLength: 100 }}
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
          autoComplete="off"
          inputProps={{ maxLength: 100 }}
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
          autoComplete="off"
          inputProps={{ maxLength: 100 }}
          value={allFields.postal_code}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              postal_code: e.target.value > 0 ? e.target.value : ""
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
          autoComplete="off"
          error={errors?.mobile1}
          helperText={errors?.mobile1}
          onKeyDown={checkIsMobileNumber}
          value={allFields.phone_number}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              phone_number: e.target.value > 0 ? e.target.value : ""
            });
            checkIsDisable("mobile1", e.target.value);
          }}
        />
        <TextField
          className="mb-12"
          name="Name"
          type="number"
          label="Fixe"
          variant="outlined"
          fullWidth
          autoComplete="off"
          error={errors?.mobile2}
          helperText={errors?.mobile2}
          onKeyDown={checkIsMobileNumber}
          value={allFields.fixe}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              fixe: e.target.value > 0 ? e.target.value : ""
            });
            checkIsDisable("mobile2", e.target.value);
          }}
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
export default EditProfileDialog;
