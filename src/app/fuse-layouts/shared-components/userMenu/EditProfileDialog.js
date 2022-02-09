import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileData } from "./store/userMenuSlice";
import {
  Dialog,
  AppBar,
  Typography,
  Toolbar,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

function EditProfileDialog(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const { userData } = useSelector(({ userMenu }) => userMenu.userMenu);
  const [allFields, setAllFields] = useState({
    enterPriseName: "",
    name: "",
    firstName: "",
    function: "",
    email: "",
    website: "",
    address: "",
    city: "",
    postalCode: "",
    mobile1: "",
    mobile2: ""
  });
  useEffect(() => {
    setAllFields({
      ...allFields,
      enterPriseName: userData.company_name,
      name: userData.last_name,
      firstName: userData.first_name,
      email: userData.email,
      address: userData.address,
      city: userData.city,
      postalCode: userData.postal_code,
      mobile1: userData.phone_number,
      mobile2: userData.fixe
    });
  }, [userData]);

  const saveProfile = () => {
    dispatch(updateProfileData(allFields, user.data.id));
    props.onClose();
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
      </AppBar>
      <DialogContent>
        <TextField
          className="mb-12"
          name="Name"
          label="Nom d'entreprise"
          variant="outlined"
          fullWidth
          disabled
          value={allFields.enterPriseName}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Nom"
          variant="outlined"
          fullWidth
          disabled
          value={allFields.name}
        />
        <TextField
          className="mb-12"
          label="Prénom"
          variant="outlined"
          fullWidth
          disabled
          value={allFields.firstName}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Fonction"
          variant="outlined"
          fullWidth
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
          value={allFields.email}
        />
        <TextField
          className="mb-12"
          name="Name"
          label="Website"
          variant="outlined"
          fullWidth
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
          value={allFields.postalCode}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              postalCode: e.target.value
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
          type="number"
          label="Fixe"
          variant="outlined"
          fullWidth
          value={allFields.mobile2}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              mobile2: e.target.value
            });
          }}
        />
        <br />
        <DialogActions className="justify-between p-0">
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
      </DialogContent>
    </Dialog>
  );
}
export default EditProfileDialog;
