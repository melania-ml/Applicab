import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import { fr } from "date-fns/locale";
import Countries from "app/main/constants/Countries";
import Nationalities from "app/main/constants/Nationalities";
import Departments from "app/main/constants/Departments";
import Status from "app/main/constants/Status";
import ClientStatus from "app/main/constants/ClientStatus";
import {
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
  getFormTitles,
  getAllTypes
} from "app/store/slices/contactsSlice";
import {
  checkIsMobileNumber,
  getNumericValidation
} from "app/main/common/functions";

//material-ui
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
  Chip,
  Icon
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const tags = [];
const filter = createFilterOptions();
function LawyerDialog(props) {
  const [allFields, setAllFields] = useState({
    client_type: "Lawyer",
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
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
  const dispatch = useDispatch();
  const { success, contactDialog, types, formTitles } = useSelector(
    ({ contacts }) => contacts
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
        tags: data.tags ?? [],
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
    if (success) {
      setAllFields({
        client_type: "Lawyer",
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
    }
  }, [contactDialog.props.open, success]);

  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  useEffect(() => {
    if (contactDialog.props.open) {
      dispatch(getAllTypes());
      if (allFields.legal_status) {
        dispatch(getFormTitles(allFields.legal_status));
      }
    }
  }, [contactDialog.props.open, allFields.legal_status]);

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
      allFields.client_type === "Lawyer" &&
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
      allFields.client_type === "Lawyer" &&
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
      allFields.client_type !== "Lawyer" &&
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
        client_type: "Lawyer",
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

  const handleRemoveDate = () => {
    setAllFields({ ...allFields, date_of_birth: null });
  };

  function onSubmit(param) {
    const type = param === "invite" ? true : false;
    if (contactDialog.type === "new") {
      dispatch(addContact({ ...allFields, is_invite: type, is_lawyer: true }));
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
          client_type: typeObj?.client_type || allFields.client_type,
          title: titleObj?.title || allFields.title,
          id: contactDialog?.data?.id,
          is_lawyer: true
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
      allFields.client_type !== "Lawyer" &&
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
    if (allFields.client_type === "Lawyer") {
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
            setErrors({
              ...errors,
              email: "Must enter a valid Email like abc@gmail.com"
            });
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
            {contactDialog.type === "new" ? "Nouveau lawyer" : "Edit lawyer"}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent
        classes={{ root: "p-24" }}
        style={{ overflowY: isAutoCompleteOpen ? "hidden" : "auto" }}
      >
        <div className="row">
          <div className="flex items-center mb-16">
            <FormControl>
              <RadioGroup
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
                  setErrors({});
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
                autoComplete="off"
                className="flex w-full mb-12"
                value={allFields.title}
                onOpen={() => setIsAutoCompleteOpen(true)}
                onClose={() => setIsAutoCompleteOpen(false)}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setAllFields({ ...allFields, title: newValue });
                  } else if (newValue && newValue.inputValue) {
                    setAllFields({ ...allFields, title: newValue?.inputValue });
                  } else {
                    setAllFields({ ...allFields, title: newValue?.title });
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
                  <TextField
                    {...params}
                    label="Choisissez un titre*"
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
                  />
                )}
              />
              <TextField
                className="mb-12"
                label="Nom de la compagnie*"
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                style={{ color: "#FFFFFF" }}
                options={Countries}
                value={allFields.country}
                onOpen={() => setIsAutoCompleteOpen(true)}
                onClose={() => setIsAutoCompleteOpen(false)}
                onChange={(e, newValue) =>
                  setAllFields({
                    ...allFields,
                    country: newValue?.label
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pays"
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
                  />
                )}
              />
              <TextField
                className="mb-12"
                label="Adresse"
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
                onKeyDown={getNumericValidation}
                value={allFields.postal_code}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    postal_code: e.target.value > 0 ? e.target.value : ""
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
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
                onKeyDown={getNumericValidation}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                value={allFields.capital_social}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    capital_social: e.target.value > 0 ? e.target.value : ""
                  })
                }
              />
              <TextField
                className="mt-8 mb-16"
                label="Immatriculé.e au RCS de"
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                type="number"
                inputProps={{ maxLength: 100 }}
                onKeyDown={getNumericValidation}
                value={allFields.number}
                onChange={(e) => {
                  setAllFields({
                    ...allFields,
                    number: e.target.value > 0 ? e.target.value : ""
                  });
                }}
              />
              <div className="flex mb-14 w-full justify-center">
                <b>Premier lawyer</b>
              </div>
              <TextField
                className="mb-12"
                name="Name"
                label={allFields.client_type === "Lawyer" ? "Nom*" : "Nom"}
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                  allFields.client_type === "Lawyer" ? "Prénom*" : "Prénom"
                }
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                label={allFields.client_type === "Lawyer" ? "Email*" : "Email"}
                className="mb-12"
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                variant="outlined"
                fullWidth
                autoComplete="off"
                onKeyDown={checkIsMobileNumber}
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                onChange={(event, newValue) => {
                  if (newValue.toString().length <= 100) {
                    setAllFields({
                      ...allFields,
                      tags: [...newValue]
                    });
                  }
                }}
                options={tags}
                value={allFields.tags}
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
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
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
                    <MenuItem value={category.value} key={category?.id}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <Autocomplete
                autoComplete="off"
                className="flex w-full mb-12"
                value={allFields.title}
                onOpen={() => setIsAutoCompleteOpen(true)}
                onClose={() => setIsAutoCompleteOpen(false)}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setAllFields({ ...allFields, title: newValue });
                  } else if (newValue && newValue.inputValue) {
                    setAllFields({ ...allFields, title: newValue?.inputValue });
                  } else {
                    setAllFields({ ...allFields, title: newValue?.title });
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
                  <TextField
                    autoComplete="off"
                    {...params}
                    label="Choisissez un titre*"
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
                  />
                )}
              />
              <TextField
                className="mb-12"
                name="Name"
                label="Nom*"
                autoComplete="off"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
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
                  allFields.client_type === "Lawyer" ? "Prénom*" : "Prénom"
                }
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                label={allFields.client_type === "Lawyer" ? "Email*" : "Email"}
                className="mb-12"
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                variant="outlined"
                fullWidth
                autoComplete="off"
                onKeyDown={checkIsMobileNumber}
                inputProps={{ maxLength: 100 }}
                value={allFields.phone_number}
                error={errors?.mobile1}
                helperText={errors?.mobile1}
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
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                label="Adresse"
                variant="outlined"
                fullWidth
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                fullWidth
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
                onKeyDown={getNumericValidation}
                value={allFields.postal_code}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    postal_code: e.target.value > 0 ? e.target.value : ""
                  })
                }
              />
              <div className="flex mb-14 w-full justify-center">
                <b>Information complémentaire</b>
              </div>
              <div
                className="flex w-full mb-12"
                onKeyDownCapture={(e) => e.preventDefault()}
              >
                <FormControl className="w-full for-date" variant="outlined">
                  <LocalizationProvider
                    locale={fr}
                    dateAdapter={AdapterDateFns}
                  >
                    <DesktopDatePicker
                      label="Date de naissance"
                      value={allFields.date_of_birth}
                      inputFormat={"dd/MM/yyyy"}
                      onChange={(newValue) => {
                        setAllFields({
                          ...allFields,
                          date_of_birth: newValue
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          autoComplete="off"
                          className="w-full mb-12"
                          {...params}
                        />
                      )}
                    />
                    {allFields.date_of_birth && (
                      <Icon
                        style={{
                          fontSize: "large",
                          position: "absolute",
                          right: 35,
                          top: 16,
                          cursor: "pointer"
                        }}
                        onClick={handleRemoveDate}
                      >
                        clear
                      </Icon>
                    )}
                  </LocalizationProvider>
                </FormControl>
              </div>
              <Autocomplete
                autoComplete="off"
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={Nationalities}
                value={allFields.nationality}
                onOpen={() => setIsAutoCompleteOpen(true)}
                onClose={() => setIsAutoCompleteOpen(false)}
                onChange={(e, newValue) => {
                  setAllFields({
                    ...allFields,
                    nationality: newValue?.label
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    autoComplete="off"
                    {...params}
                    label="Nationalité"
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
                  />
                )}
              />
              <Autocomplete
                className="flex w-full mb-12"
                disablePortal
                style={{ color: "#FFFFFF" }}
                options={Countries}
                value={allFields.country}
                autoComplete="off"
                onOpen={() => setIsAutoCompleteOpen(true)}
                onClose={() => setIsAutoCompleteOpen(false)}
                onChange={(e, newValue) =>
                  setAllFields({
                    ...allFields,
                    country: newValue?.label
                  })
                }
                renderInput={(params) => (
                  <TextField
                    autoComplete="off"
                    {...params}
                    label="Pays"
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
                  />
                )}
              />
              <TextField
                className="mb-12"
                label="Ville de naissance"
                variant="outlined"
                autoComplete="off"
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                value={allFields.department}
                onOpen={() => setIsAutoCompleteOpen(true)}
                onClose={() => setIsAutoCompleteOpen(false)}
                onChange={(e, newValue) =>
                  setAllFields({
                    ...allFields,
                    department: newValue?.label
                  })
                }
                renderInput={(params) => (
                  <TextField
                    autoComplete="off"
                    {...params}
                    label="Département"
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
                  />
                )}
              />
              <FormControl className="flex w-full mb-12" variant="outlined">
                <InputLabel>Statut matrimonial</InputLabel>
                <Select
                  label="Statut matrimonial"
                  value={allFields.civil_status}
                  onChange={(e) =>
                    setAllFields({
                      ...allFields,
                      civil_status: e.target.value
                    })
                  }
                >
                  {ClientStatus.map((category) => (
                    <MenuItem value={category.value} key={category?.id}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                className="mb-12"
                label="Profession"
                variant="outlined"
                inputProps={{ maxLength: 100 }}
                value={allFields.profession}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    profession: e.target.value
                  })
                }
                fullWidth
                autoComplete="off"
              />
              <TextField
                className="mb-12"
                label="Commentaire"
                variant="outlined"
                multiline
                autoComplete="off"
                rows={5}
                fullWidth
                inputProps={{ maxLength: 100 }}
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
                autoComplete="off"
                onChange={(event, newValue) => {
                  if (newValue.toString().length <= 100) {
                    setAllFields({
                      ...allFields,
                      tags: [...newValue]
                    });
                  }
                }}
                options={tags}
                value={allFields.tags}
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
                    autoComplete="off"
                    {...params}
                    label="Tags"
                    placeholder="Add your tags"
                    inputProps={{ ...params.inputProps, maxLength: 100 }}
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
                    <MenuItem value={category.value} key={category?.id}>
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
              allFields.client_type !== "Lawyer"
            }
          >
            Envoyer invitation
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default LawyerDialog;
