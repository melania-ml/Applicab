import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import {
  Typography,
  Toolbar,
  FormControlLabel,
  Radio,
  RadioGroup,
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
  Autocomplete,
  InputAdornment,
  Chip
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import Countries from "../../../../constants/Countries";
import Nationalities from "../../../../constants/Nationalities";
import Departments from "../../../../constants/Departments";
import Types from "../../../../constants/Types";
import EnterpriseTitles from "../../../../constants/EnterpriseTitles";
import Status from "../../../../constants/Status";
import ClientStatus from "../../../../constants/ClientStatus";
import PersonTitles from "../../../../constants/PersonTitles";

import {
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog
} from "../../store/contactsSlice";

const tags = [];

function ContactDialog(props) {
  const [allFields, setAllFields] = useState({
    type: "Client",
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
    status: "Actif",
    dateValue: null,
    department: "",
    nationality: "",
    nativeCity: "",
    profession: "",
    clientStatus: ""
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

  function onSubmit(param) {
    if (contactDialog.type === "new") {
      const type = param === "invite" ? true : false;
      dispatch(addContact({ ...allFields, is_invite: type }));
    } else {
      //dispatch(updateContact({ ...contactDialog.data, ...data }));
    }
    closeComposeDialog();
  }

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
        paper: "m-24"
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="sm"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === "new" ? "Nouveau contact" : "Edit Contact"}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: "p-24" }}>
        <div className="row">
          <FormControl className="flex w-full" variant="outlined">
            <InputLabel>Type*</InputLabel>
            <Select
              label="Type*"
              value={allFields.type}
              onChange={(e) => {
                setAllFields({ ...allFields, type: e.target.value });
                setErrors({});
              }}
            >
              {Types.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="flex items-center mb-16">
            <b className="min-w-48 pt-20">Forme juridique*:</b>
            <FormControl>
              <RadioGroup
                style={{ marginLeft: 20 }}
                className="pt-20"
                row
                value={allFields.legalStatus}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={allFields.legalStatus}
                name="radio-buttons-group"
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    legalStatus: e.target.value,
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
                    status: "Actif",
                    nationality: "",
                    nativeCity: "",
                    department: "",
                    profession: "",
                    clientStatus: ""
                  });
                }}
              >
                <FormControlLabel
                  value="Enterprise"
                  control={<Radio />}
                  label="Enterprise"
                />
                <FormControlLabel
                  value="Personne"
                  control={<Radio />}
                  label="Personne"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {allFields.legalStatus === "Enterprise" ? (
            <>
              <Autocomplete
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={EnterpriseTitles}
                value={allFields.title}
                onChange={(e, newValue) => {
                  setAllFields({
                    ...allFields,
                    title: newValue.label
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Choisissez un titre*" />
                )}
              />
              <TextField
                className="mb-12"
                label="Nom de la compagnie*"
                variant="outlined"
                fullWidth
                value={allFields.companyName}
                error={errors?.companyName}
                helperText={errors?.companyName}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    companyName: e.target.value
                  });
                  checkIsDisable("companyName", e.target.value);
                }}
              />
              <Autocomplete
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={Countries}
                value={allFields.country}
                onChange={(e, newValue) =>
                  setAllFields({
                    ...allFields,
                    country: newValue.label
                  })
                }
                renderInput={(params) => <TextField {...params} label="Pays" />}
              />
              <TextField
                className="mb-12"
                label="Adresse"
                variant="outlined"
                fullWidth
                value={allFields.address}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    address: e.target.value
                  })
                }
              />
              <TextField
                className="mb-12"
                label="Ville"
                variant="outlined"
                fullWidth
                value={allFields.city}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    city: e.target.value
                  })
                }
              />
              <TextField
                className="mb-12"
                label="CP"
                type="number"
                variant="outlined"
                fullWidth
                value={allFields.postalCode}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    postalCode: e.target.value
                  })
                }
              />
              <TextField
                className="mt-8 mb-16"
                label="Capital social"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  )
                }}
                type="number"
                variant="outlined"
                fullWidth
                value={allFields.capitalSocial}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    capitalSocial: e.target.value
                  })
                }
              />
              <TextField
                className="mt-8 mb-16"
                label="Immatriculé.e au RCS de"
                variant="outlined"
                fullWidth
                value={allFields.RCSCity}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    RCSCity: e.target.value
                  })
                }
              />
              <TextField
                className="mt-8 mb-16"
                label="Numéro"
                variant="outlined"
                fullWidth
                value={allFields.number}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    number: e.target.value
                  })
                }
              />
              <div className="mb-12 text-center">
                <b>Premier contact</b>
              </div>
              <TextField
                className="mb-12"
                name="Name"
                label={allFields.type === "Client" ? "Nom*" : "Nom"}
                variant="outlined"
                fullWidth
                value={allFields.name}
                error={errors?.name}
                helperText={errors?.name}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    name: e.target.value
                  });
                  checkIsDisable("name", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label={allFields.type === "Client" ? "Prénom*" : "Prénom"}
                variant="outlined"
                fullWidth
                value={allFields.firstName}
                error={errors?.firstName}
                helperText={errors?.firstName}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    firstName: e.target.value
                  });
                  checkIsDisable("firstName", e.target.value);
                }}
              />
              <TextField
                label={allFields.type === "Client" ? "Email*" : "Email"}
                className="mb-12"
                variant="outlined"
                fullWidth
                value={allFields.email}
                error={errors?.email}
                helperText={errors?.email}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    email: e.target.value
                  });
                  checkIsDisable("email", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label="Mobile"
                type="number"
                variant="outlined"
                fullWidth
                value={allFields.mobile1}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    mobile1: e.target.value
                  })
                }
              />
              <TextField
                className="mb-12"
                label="Fixe"
                variant="outlined"
                fullWidth
                type="number"
                value={allFields.mobile2}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    mobile2: e.target.value
                  })
                }
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
              <Autocomplete
                className="w-full mb-12"
                multiple
                freeSolo
                onChange={(event, newValue) => {
                  setAllFields({
                    ...allFields,
                    tags: [
                      ...allFields.tags,
                      ...newValue.filter(
                        (option) => allFields.tags.indexOf(option) === -1
                      )
                    ]
                  });
                }}
                options={tags}
                getOptionLabel={(option) => option.title}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      disabled={tags.indexOf(option) !== -1}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Add your tags"
                  />
                )}
              />
              <FormControl className="flex w-full mb-12" variant="outlined">
                <InputLabel>Statut*</InputLabel>
                <Select
                  label="Statut*"
                  value={allFields.status}
                  onChange={(e) =>
                    setAllFields({
                      ...allFields,
                      status: e.target.value
                    })
                  }
                >
                  {Status.map((category) => (
                    <MenuItem value={category.value} key={category.id}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <Autocomplete
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={PersonTitles}
                value={allFields.title}
                onChange={(e, newValue) => {
                  setAllFields({
                    ...allFields,
                    title: newValue.label
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Choisissez un titre*" />
                )}
              />
              <TextField
                className="mb-12"
                name="Name"
                label="Nom*"
                variant="outlined"
                fullWidth
                value={allFields.name}
                error={errors?.name}
                helperText={errors?.name}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    name: e.target.value
                  });
                  checkIsDisable("name", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label={allFields.type === "Client" ? "Prénom*" : "Prénom"}
                variant="outlined"
                fullWidth
                value={allFields.firstName}
                error={errors?.firstName}
                helperText={errors?.firstName}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    firstName: e.target.value
                  });
                  checkIsDisable("firstName", e.target.value);
                }}
              />
              <TextField
                label={allFields.type === "Client" ? "Email*" : "Email"}
                className="mb-12"
                variant="outlined"
                fullWidth
                error={errors?.email}
                helperText={errors?.email}
                value={allFields.email}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    email: e.target.value
                  });
                  checkIsDisable("email", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label="Mobile"
                type="number"
                variant="outlined"
                fullWidth
                value={allFields.mobile1}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    mobile1: e.target.value
                  })
                }
              />
              <TextField
                className="mb-12"
                label="Fixe"
                variant="outlined"
                type="number"
                fullWidth
                value={allFields.mobile2}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    mobile2: e.target.value
                  })
                }
              />
              <TextField
                className="mb-12"
                label="Adresse"
                variant="outlined"
                fullWidth
                value={allFields.address}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    address: e.target.value
                  })
                }
              />
              <TextField
                className="mb-12"
                label="Ville"
                variant="outlined"
                fullWidth
                value={allFields.city}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    city: e.target.value
                  })
                }
              />
              <TextField
                className="mb-12"
                label="CP"
                type="number"
                variant="outlined"
                fullWidth
                value={allFields.postalCode}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    postalCode: e.target.value
                  })
                }
              />
              <div className="mb-12 text-center">
                <b>Information complémentaire</b>
              </div>
              <DatePicker
                label="Date de naissance"
                value={allFields.dateValue}
                maxDate={new Date()}
                onChange={(newValue) => {
                  setAllFields({ ...allFields, dateValue: newValue });
                }}
                renderInput={(params) => (
                  <TextField className="w-full mb-12" {...params} />
                )}
              />
              <Autocomplete
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={Nationalities}
                value={allFields.nationality}
                onChange={(e, newValue) => {
                  setAllFields({
                    ...allFields,
                    nationality: newValue.label
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Nationalité" />
                )}
              />
              <Autocomplete
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={Countries}
                value={allFields.country}
                onChange={(e, newValue) =>
                  setAllFields({
                    ...allFields,
                    country: newValue.label
                  })
                }
                renderInput={(params) => <TextField {...params} label="Pays" />}
              />
              <TextField
                className="mb-12"
                label="Ville de naissance"
                variant="outlined"
                value={allFields.nativeCity}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    nativeCity: e.target.value
                  })
                }
                fullWidth
              />
              <Autocomplete
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={Departments}
                value={allFields.department}
                onChange={(e, newValue) =>
                  setAllFields({
                    ...allFields,
                    department: newValue.label
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Département" />
                )}
              />
              <TextField
                className="mb-12"
                label="Profession"
                variant="outlined"
                value={allFields.profession}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    profession: e.target.value
                  })
                }
                fullWidth
              />
              <FormControl className="flex w-full mb-12" variant="outlined">
                <InputLabel>Statut</InputLabel>
                <Select
                  label="Statut"
                  value={allFields.clientStatus}
                  onChange={(e) =>
                    setAllFields({
                      ...allFields,
                      clientStatus: e.target.value
                    })
                  }
                >
                  {ClientStatus.map((category) => (
                    <MenuItem value={category.value} key={category.id}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <Autocomplete
                className="w-full mb-12"
                multiple
                freeSolo
                onChange={(event, newValue) => {
                  setAllFields({
                    ...allFields,
                    tags: [
                      ...allFields.tags,
                      ...newValue.filter(
                        (option) => allFields.tags.indexOf(option) === -1
                      )
                    ]
                  });
                }}
                options={tags}
                getOptionLabel={(option) => option.title}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      disabled={tags.indexOf(option) !== -1}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Add your tags"
                  />
                )}
              />
              <FormControl className="flex w-full mb-12" variant="outlined">
                <InputLabel>Statut*</InputLabel>
                <Select
                  label="Statut*"
                  value={allFields.status}
                  onChange={(e) =>
                    setAllFields({
                      ...allFields,
                      status: e.target.value
                    })
                  }
                >
                  {Status.map((category) => (
                    <MenuItem value={category.value} key={category.id}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </div>
      </DialogContent>

      <DialogActions className="justify-between p-4 pb-16">
        <div className="px-16">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{ borderRadius: 0 }}
            disabled={_.isEmpty(errors) || !isValid}
            onClick={() => onSubmit("submit")}
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
            onClick={() => onSubmit("invite")}
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
    </Dialog>
  );
}

export default ContactDialog;
