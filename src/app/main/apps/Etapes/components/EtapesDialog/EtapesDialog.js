import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import {
  Typography,
  Toolbar,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  AppBar,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Icon,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import Statut from "app/main/constants/Statut";
import Clients from "app/main/constants/Clients";

import {
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
} from "../../store/etapesSlice";

const tags = [];

function EtapesDialog(props) {
  const [allFields, setAllFields] = useState({
    position: "",
    clientStatus: "Case",
    step: "Etapes that are fixed Value",
    type: "Client",
    rename: "",
    dateValue: null,
    legalStatus: "Enterprise",
    title: "",
    companyName: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    capitalSocial: "",
    RCSCity: "",
    number: "",
    name: "",
    firstName: "",
    email: "",
    mobile1: "",
    mobile2: "",
    comments: "",
    tags: [],
    status: "dossier that are fixed Value ",
    department: "",
    nationality: "",
    nativeCity: "",
    profession: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const contactDialog = useSelector(
    ({ contactsApp }) => contactsApp.contacts.contactDialog
  );

  useEffect(() => {
    if (allFields.type === "Client" && allFields.legalStatus === "Enterprise") {
      if (
        allFields.type &&
        allFields.title &&
        allFields.companyName &&
        allFields.name &&
        allFields.firstName &&
        allFields.email &&
        validateEmail(allFields.email)
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (
      allFields.type === "Client" &&
      allFields.legalStatus === "Personne"
    ) {
      if (
        allFields.type &&
        allFields.title &&
        allFields.name &&
        allFields.firstName &&
        allFields.email &&
        validateEmail(allFields.email)
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (
      allFields.type !== "Client" &&
      allFields.legalStatus === "Personne"
    ) {
      if (allFields.type && allFields.title && allFields.name) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (allFields.type && allFields.title && allFields.companyName) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [allFields]);

  function closeComposeDialog() {
    return contactDialog.type === "edit"
      ? dispatch(closeEditContactDialog())
      : dispatch(closeNewContactDialog());
  }

  function onSubmit(data) {
    if (contactDialog.type === "new") {
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
  }

  const registerUser = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(allFields));
  };

  const validateEmail = (value) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (value) {
      if (regex.test(value) === false) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const checkIsDisable = (name, value) => {
    if (name === "companyName") {
      if (value) {
        setErrors({ ...errors, companyName: "" });
      } else {
        setErrors({ ...errors, companyName: "Must enter a Company name" });
      }
    }
    if (allFields.type !== "Client" && allFields.legalStatus === "Personne") {
      if (name === "name") {
        if (value) {
          setErrors({ ...errors, name: "" });
        } else {
          setErrors({ ...errors, name: "Must enter a Name" });
        }
      }
    }
    if (allFields.type !== "Position" && allFields.position === "Position") {
      if (name === "Position") {
        if (value) {
          setErrors({ ...errors, name: "" });
        } else {
          setErrors({ ...errors, name: "Must enter a Position" });
        }
      }
    }
    if (allFields.type === "Client") {
      if (name === "name") {
        if (value) {
          setErrors({ ...errors, name: "" });
        } else {
          setErrors({ ...errors, name: "Must enter a Name" });
        }
      }
      if (name === "firstName") {
        if (value) {
          setErrors({ ...errors, firstName: "" });
        } else {
          setErrors({ ...errors, firstName: "Must enter a First name" });
        }
      }
      if (name === "email") {
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (value) {
          if (regex.test(value) === false) {
            setErrors({ ...errors, email: "Must enter a valid Email" });
          } else {
            setErrors({ ...errors, email: "" });
          }
        } else {
          setErrors({ ...errors, email: "Must enter an Email" });
        }
      }
    }
  };

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="sm"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === "new"
              ? "Nouveau Etapes"
              : " Ajouter une nouvelle étape "}
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        //onSubmit={handleSubmit(onSubmit)}
        onSubmit={registerUser}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: "p-24" }}>
          <div className="row">
            <TextField
              className="mb-12"
              name="Position"
              label="Position"
              variant="outlined"
              fullWidth
              value={allFields.position}
              error={errors?.position}
              helperText={errors?.position}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  position: e.target.value,
                });
                checkIsDisable("name", e.target.value);
              }}
            />
            <TextField
              className="mb-12"
              name="Dossier"
              label="Dossier"
              disabled
              variant="outlined"
              fullWidth
              value={allFields.status}
              error={errors?.status}
              helperText={errors?.status}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  status: e.target.value,
                });
                checkIsDisable("name", e.target.value);
              }}
            />
            <TextField
              className="mb-12"
              name="Étape"
              label="Étape"
              disabled
              variant="outlined"
              fullWidth
              value={allFields.step}
              error={errors?.step}
              helperText={errors?.step}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  step: e.target.value,
                });
                checkIsDisable("name", e.target.value);
              }}
            />
            <TextField
              className="mb-12"
              name="Renommer"
              type="text"
              label="Renommer"
              variant="outlined"
              fullWidth
              value={allFields.name}
              error={errors?.name}
              helperText={errors?.name}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  name: e.target.value,
                });
                checkIsDisable("name", e.target.value);
              }}
            />
            <FormControl className="flex w-full mb-12" variant="outlined">
              <InputLabel>Statut</InputLabel>
              <Select
                label="Statut"
                value={allFields.clientStatus}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    clientStatus: e.target.value,
                  })
                }
              >
                {Statut.map((category) => (
                  <MenuItem value={category.value} key={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DatePicker
              label="Date"
              value={allFields.dateValue}
              maxDate={new Date()}
              onChange={(newValue) => {
                setAllFields({ ...allFields, dateValue: newValue });
              }}
              renderInput={(params) => (
                <TextField className="w-full mb-12" {...params} />
              )}
            />
            <br />
            <br />
            <br />
            <div className="px-18">
              <Button
                variant="outlined"
                style={{ borderRadius: 5 }}
                color="secondary"
              >
                <Icon
                  style={{
                    color: "secondary",
                    fontSize: "large",
                    margin: "10px",
                  }}
                >
                  notifications
                </Icon>
                Ajouter une notification
              </Button>
              <br />
              <br />
              <br />
              <h2>
                <b>Message</b>
              </h2>
              <br />
            </div>
            <FormControl className="flex w-full mb-12" variant="outlined">
              <InputLabel>Choisissez un ou plusieurs clients</InputLabel>
              <Select
                label="Choisissez un ou plusieurs clients"
                // value={allFields.name}
                // onChange={(e) =>
                //   setAllFields({
                //     ...allFields,
                //     name: e.target.value,
                //   })
                // }
              >
                {Clients.map((category) => (
                  <MenuItem value={category.value} key={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              className="mb-12"
              name="Object"
              label="Object"
              variant="outlined"
              fullWidth
              value={allFields.profession}
              error={errors?.profession}
              helperText={errors?.profession}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  profession: e.target.value,
                });
                checkIsDisable("name", e.target.value);
              }}
            />
            <TextField
              className="mb-12"
              label="Message"
              type="text"
              variant="outlined"
              multiline
              rows={8}
              fullWidth
              value={allFields.comments}
              onChange={(e) =>
                setAllFields({
                  ...allFields,
                  comments: e.target.value,
                })
              }
            />
          </div>
          <div className="px-18">
            <br />
            <h2>
              <b>Documents</b>
            </h2>
            <br />
            <Button
              variant="outlined"
              style={{ borderRadius: 5, marginRight: 7 }}
              color="secondary"
            >
              <Icon
                style={{
                  color: "secondary",
                  fontSize: "large",
                  margin: "10px",
                }}
              >
                attach_file
              </Icon>
              Ajouter un document
            </Button>
          </div>
          <br />
          <br />
          <br />
          <br />
        </DialogContent>
        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              style={{ borderRadius: 0 }}
              disabled={_.isEmpty(errors) || !isValid}
            >
              Enregister
            </Button>
          </div>
          <div className="px-16">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              style={{ borderRadius: 0 }}
              disabled={
                _.isEmpty(errors) ||
                !isValid ||
                allFields.status === "Inactif" ||
                allFields.type !== "Client"
              }
            >
              Envoyer invitation
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EtapesDialog;
