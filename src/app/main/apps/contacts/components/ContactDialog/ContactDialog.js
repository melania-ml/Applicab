import { useState, useEffect, useCallback } from "react";
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
import { createFilterOptions } from "@mui/material/Autocomplete";
import DatePicker from "@mui/lab/DatePicker";
import Countries from "../../../../constants/Countries";
import Nationalities from "../../../../constants/Nationalities";
import Departments from "../../../../constants/Departments";
import Status from "../../../../constants/Status";
import ClientStatus from "../../../../constants/ClientStatus";

import {
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
  getFormTitles
} from "../../store/contactsSlice";

const tags = [];
const filter = createFilterOptions();
function ContactDialog(props) {
  const [allFields, setAllFields] = useState({
    client_type: "Client",
    legal_status: "Enterprise",
    title: "",
    company_name: "",
    country: "",
    address: "",
    city: "",
    postal_code: "",
    capital_social: "",
    RCS_city: "",
    number: "",
    last_name: "",
    first_name: "",
    email: "",
    phone_number: "",
    fixe: "",
    comments: "",
    tags: [],
    status: "Actif",
    date_of_birth: null,
    department: "",
    nationality: "",
    native_city: "",
    profession: "",
    civil_status: ""
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const formTitles = useSelector(
    ({ contactsApp }) => contactsApp.contacts.formTitles
  );
  const types = useSelector(({ contactsApp }) => contactsApp.contacts.types);
  const contactDialog = useSelector(
    ({ contactsApp }) => contactsApp.contacts.contactDialog
  );

  const initDialog = useCallback(() => {
    if (contactDialog.type === "edit" && contactDialog.type) {
      const data = contactDialog.data;
      setAllFields({
        ...allFields,
        client_type: data.client_type,
        legal_status: data.legal_status,
        title: data.title,
        company_name: data.company_name,
        country: data.country,
        address: data.address,
        city: data.city,
        postal_code: data.postal_code,
        capital_social: data.capital_social,
        RCS_city: data.RCS_city,
        number: data.number,
        last_name: data.last_name,
        first_name: data.first_name,
        email: data.email,
        phone_number: data.phone_number,
        fixe: data.fixe,
        comments: data.comments,
        tags: data.tags,
        status: data.status,
        date_of_birth: data.date_of_birth,
        department: data.department,
        nationality: data.nationality,
        native_city: data.native_city,
        profession: data.profession,
        civil_status: data.civil_status
      });
    }
  }, [contactDialog.data, contactDialog.type]);

  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  useEffect(() => {
    dispatch(getFormTitles(allFields.legal_status));
  }, [allFields.legal_status]);

  useEffect(() => {
    if (typeof allFields.client_type === "object") {
      setAllFields({
        ...allFields,
        client_type: allFields.client_type.client_type
      });
    }
    if (typeof allFields.title === "object") {
      setAllFields({
        ...allFields,
        title: allFields.title.title
      });
    }
    const isEmpty = Object.values(errors).every((x) => x === null || x === "");
    if (
      allFields.client_type === "Client" &&
      allFields.legal_status === "Enterprise"
    ) {
      if (
        allFields.client_type &&
        allFields.title &&
        allFields.company_name &&
        allFields.last_name &&
        allFields.first_name &&
        allFields.email &&
        validateEmail(allFields.email) &&
        isEmpty
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (
      allFields.client_type === "Client" &&
      allFields.legal_status === "Particulier"
    ) {
      if (
        allFields.client_type &&
        allFields.title &&
        allFields.last_name &&
        allFields.first_name &&
        allFields.email &&
        validateEmail(allFields.email) &&
        isEmpty
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (
      allFields.client_type !== "Client" &&
      allFields.legal_status === "Particulier"
    ) {
      if (
        allFields.client_type &&
        allFields.title &&
        allFields.last_name &&
        isEmpty
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (
        allFields.client_type &&
        allFields.title &&
        allFields.company_name &&
        isEmpty
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [allFields]);

  function closeComposeDialog() {
    if (contactDialog.type === "edit") {
      dispatch(closeEditContactDialog());
      setAllFields({
        ...allFields,
        client_type: "Client",
        legal_status: "Enterprise",
        title: "",
        company_name: "",
        country: "",
        address: "",
        city: "",
        postal_code: "",
        capital_social: "",
        RCS_city: "",
        number: "",
        last_name: "",
        first_name: "",
        email: "",
        phone_number: "",
        fixe: "",
        comments: "",
        tags: [],
        status: "Actif",
        date_of_birth: null,
        department: "",
        nationality: "",
        native_city: "",
        profession: "",
        civil_status: ""
      });
    } else {
      dispatch(closeNewContactDialog());
    }
  }

  function onSubmit(param) {
    const type = param === "invite" ? true : false;
    if (contactDialog.type === "new") {
      dispatch(addContact({ ...allFields, is_invite: type }));
    } else {
      const typeObj = types.find(
        (type) => type.client_type === allFields?.client_type
      );
      const titleObj = formTitles.find(
        (type) => type.title === allFields?.title
      );
      dispatch(
        updateContact({
          ...allFields,
          is_invite: type,
          client_type: typeObj?.client_type,
          title: titleObj?.title,
          id: contactDialog.data.id
        })
      );
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
      }
    }
    if (name === "title") {
      if (value) {
        setErrors({ ...errors, title: "" });
      } else {
        setErrors({ ...errors, title: "Must enter a Proper Title" });
      }
    }
    if (name === "company_name") {
      if (value) {
        setErrors({ ...errors, company_name: "" });
      } else {
        setErrors({ ...errors, company_name: "Must enter a Company name" });
      }
    }
    if (
      allFields.client_type !== "Client" &&
      allFields.legal_status === "Particulier"
    ) {
      if (name === "last_name") {
        if (value) {
          setErrors({ ...errors, last_name: "" });
        } else {
          setErrors({ ...errors, last_name: "Must enter a Name" });
        }
      }
    }
    if (allFields.client_type === "Client") {
      if (name === "last_name") {
        if (value) {
          setErrors({ ...errors, last_name: "" });
        } else {
          setErrors({ ...errors, last_name: "Must enter a Name" });
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
      // if (name === "number") {
      //   if (value > 0) {
      //     setErrors({ ...errors, number: "" });
      //   } else {
      //     setErrors({ ...errors, number: "Must enter Proper Number" });
      //   }
      // }
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
          <Autocomplete
            className="flex w-full mb-12"
            value={allFields.client_type}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, client_type: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  client_type: newValue.inputValue
                });
              } else {
                setAllFields({
                  ...allFields,
                  client_type: newValue?.client_type
                });
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.client_type
              );
              if (inputValue.trim() !== "" && !isExisting) {
                filtered.push({
                  inputValue: inputValue.trim(),
                  client_type: `Ajouter "${inputValue.trim()}"`
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            error={errors?.client_type}
            helperText={errors?.client_type}
            handleHomeEndKeys
            options={types}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.client_type;
            }}
            renderOption={(props, option) => (
              <li {...props}>{option.client_type}</li>
            )}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Type*" />}
          />
          <div className="flex items-center mb-16">
            <b className="min-w-48 pt-20">Forme juridique*:</b>
            <FormControl>
              <RadioGroup
                style={{ marginLeft: 20 }}
                className="pt-20"
                row
                value={allFields.legal_status}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={allFields.legal_status}
                name="radio-buttons-group"
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    legal_status: e.target.value,
                    title: "",
                    company_name: "",
                    country: "",
                    address: "",
                    city: "",
                    postal_code: "",
                    capital_social: "",
                    RCS_city: "",
                    number: "",
                    last_name: "",
                    first_name: "",
                    email: "",
                    phone_number: "",
                    fixe: "",
                    comments: "",
                    tags: [],
                    status: "Actif",
                    nationality: "",
                    native_city: "",
                    department: "",
                    profession: "",
                    civil_status: ""
                  });
                }}
              >
                <FormControlLabel
                  value="Enterprise"
                  control={<Radio />}
                  label="Enterprise"
                />
                <FormControlLabel
                  value="Particulier"
                  control={<Radio />}
                  label="Particulier"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {allFields.legal_status === "Enterprise" ? (
            <>
              <Autocomplete
                className="flex w-full mb-12"
                value={allFields.title}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setAllFields({ ...allFields, title: newValue });
                  } else if (newValue && newValue.inputValue) {
                    setAllFields({ ...allFields, title: newValue.inputValue });
                  } else {
                    setAllFields({ ...allFields, title: newValue.title });
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.title
                  );
                  if (inputValue.trim() !== "" && !isExisting) {
                    filtered.push({
                      inputValue: inputValue.trim(),
                      title: `Ajouter "${inputValue.trim()}"`
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                error={errors?.title}
                helperText={errors?.title}
                handleHomeEndKeys
                options={formTitles}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Choisissez un titre*" />
                )}
              />
              <TextField
                className="mb-12"
                label="Nom de la compagnie*"
                variant="outlined"
                fullWidth
                value={allFields.company_name}
                error={errors?.company_name}
                helperText={errors?.company_name}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    company_name: e.target.value
                  });
                  checkIsDisable("company_name", e.target.value);
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
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                //onkeypress="return event.keyCode === 8 || event.charCode >= 48 && event.charCode <= 57"
                value={allFields.postal_code}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    postal_code: e.target.value
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
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={allFields.capital_social}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    capital_social: e.target.value
                  })
                }
              />
              <TextField
                className="mt-8 mb-16"
                label="Immatriculé.e au RCS de"
                variant="outlined"
                fullWidth
                value={allFields.RCS_city}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    RCS_city: e.target.value
                  })
                }
              />
              <TextField
                className="mt-8 mb-16"
                label="Numéro"
                variant="outlined"
                fullWidth
                type="number"
                // error={errors?.number}
                // helperText={errors?.number}
                value={allFields.number}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    number: e.target.value
                  });
                  //checkIsDisable("number", e.target.value);
                }}
              />
              <div className="flex mb-14 w-full justify-center">
                <b>Premier contact</b>
              </div>
              <TextField
                className="mb-12"
                name="Name"
                label={allFields.client_type === "Client" ? "Nom*" : "Nom"}
                variant="outlined"
                fullWidth
                value={allFields.last_name}
                error={errors?.last_name}
                helperText={errors?.last_name}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    last_name: e.target.value
                  });
                  checkIsDisable("last_name", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label={
                  allFields.client_type === "Client" ? "Prénom*" : "Prénom"
                }
                variant="outlined"
                fullWidth
                value={allFields.first_name}
                error={errors?.firstName}
                helperText={errors?.firstName}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    first_name: e.target.value
                  });
                  checkIsDisable("firstName", e.target.value);
                }}
              />
              <TextField
                label={allFields.client_type === "Client" ? "Email*" : "Email"}
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
                error={errors?.mobile1}
                helperText={errors?.mobile1}
                value={allFields.phone_number}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    phone_number: e.target.value
                  });
                  checkIsDisable("mobile1", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label="Fixe"
                variant="outlined"
                fullWidth
                type="number"
                error={errors?.mobile2}
                helperText={errors?.mobile2}
                value={allFields.fixe}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    fixe: e.target.value
                  });
                  checkIsDisable("mobile2", e.target.value);
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
                value={allFields.title}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setAllFields({ ...allFields, title: newValue });
                  } else if (newValue && newValue.inputValue) {
                    setAllFields({ ...allFields, title: newValue.inputValue });
                  } else {
                    setAllFields({ ...allFields, title: newValue.title });
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.title
                  );
                  if (inputValue.trim() !== "" && !isExisting) {
                    filtered.push({
                      inputValue: inputValue.trim(),
                      title: `Ajouter "${inputValue.trim()}"`
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={formTitles}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.title}</li>
                )}
                freeSolo
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
                value={allFields.last_name}
                error={errors?.last_name}
                helperText={errors?.last_name}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    last_name: e.target.value
                  });
                  checkIsDisable("last_name", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label={
                  allFields.client_type === "Client" ? "Prénom*" : "Prénom"
                }
                variant="outlined"
                fullWidth
                value={allFields.first_name}
                error={errors?.firstName}
                helperText={errors?.firstName}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    first_name: e.target.value
                  });
                  checkIsDisable("firstName", e.target.value);
                }}
              />
              <TextField
                label={allFields.client_type === "Client" ? "Email*" : "Email"}
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
                value={allFields.phone_number}
                error={errors?.mobile1}
                helperText={errors?.mobile1}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    phone_number: e.target.value
                  });
                  setIsValid("mobile1", e.target.value);
                }}
              />
              <TextField
                className="mb-12"
                label="Fixe"
                variant="outlined"
                type="number"
                fullWidth
                error={errors?.mobile2}
                helperText={errors?.mobile2}
                value={allFields.fixe}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    fixe: e.target.value
                  });
                  setIsValid("mobile2", e.target.value);
                }}
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
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={allFields.postal_code}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    postal_code: e.target.value
                  })
                }
              />
              <div className="flex mb-14 w-full justify-center">
                <b>Information complémentaire</b>
              </div>
              <DatePicker
                label="Date de naissance"
                value={allFields.date_of_birth}
                maxDate={new Date()}
                onChange={(newValue) => {
                  setAllFields({ ...allFields, date_of_birth: newValue });
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
                value={allFields.native_city}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    native_city: e.target.value
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
                <InputLabel>état civil</InputLabel>
                <Select
                  label="état civil"
                  value={allFields.civil_status}
                  onChange={(e) =>
                    setAllFields({
                      ...allFields,
                      civil_status: e.target.value
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
            disabled={!isValid}
            //disabled={_.isEmpty(errors) || !isValid}
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
              !isValid ||
              allFields.status === "Inactif" ||
              allFields.client_type !== "Client"
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
