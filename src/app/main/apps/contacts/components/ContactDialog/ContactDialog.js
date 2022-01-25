import { useState, useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import * as yup from "yup";
import FuseUtils from "@fuse/utils/FuseUtils";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import Countries from "../../../../constants/Countries";
import Nationalities from '../../../../constants/Nationalities';
import Departments from '../../../../constants/Departments';

import PersonalFields from "./PersonalFields";
import {
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
} from "../../store/contactsSlice";

const defaultValues = {
  id: "",
  name: "",
  lastName: "",
  avatar: "assets/images/avatars/profile.jpg",
  nickname: "",
  company: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  notes: "",
  type: "",
};
const tags = [];
const status1 = [
  {
    id: 1,
    value: "Célibataire",
    label: "Célibataire",
  },
  {
    id: 2,
    value: "Marié.e",
    label: "Marié.e",
  },
  {
    id: 3,
    value: "Pacsé.e",
    label: "Pacsé.e",
  },
  {
    id: 4,
    value: "Divorcé.e",
    label: "Divorcé.e",
  },
  {
    id: 5,
    value: "Veuf.ve",
    label: "Veuf.ve",
  },
  {
    id: 6,
    value: "Autre",
    label: "Autre",
  },
];
const titlesEnterprice = [
  {
    id: 2,
    value: "Association",
    label: "Association",
  },
  {
    id: 2,
    value: "Syndicat des copropriétaires",
    label: "Syndicat des copropriétaires",
  },
  {
    id: 2,
    value: "S.A.R.L",
    label: "S.A.R.L",
  },
  {
    id: 2,
    value: "S.C.I",
    label: "S.C.I",
  },
  {
    id: 2,
    value: "S.A",
    label: "S.A",
  },
  {
    id: 2,
    value: "S.A.S",
    label: "S.A.S",
  },
  {
    id: 2,
    value: "S.A.S.U",
    label: "S.A.S.U",
  },
  {
    id: 2,
    value: "S.C.P",
    label: "S.C.P",
  },
  {
    id: 2,
    value: "A.S.L",
    label: "A.S.L",
  },
  {
    id: 2,
    value: "Conseil Syndical",
    label: "Conseil Syndical",
  },
  {
    id: 2,
    value: "Syndic",
    label: "Syndic",
  },
  {
    id: 2,
    value: "Autre",
    label: "Autre",
  },
];

const status = [
  {
    id: 1,
    value: "Actif",
    label: "Actif",
  },
  {
    id: 2,
    value: "Inactif",
    label: "Inactif",
  },
];
const schema = yup.object().shape({
  type: yup.string().required("You must select a type"),
});

function ContactDialog(props) {
  const [allFields, setAllFields] = useState({
    type: "Client",
    legalStatus: "Enterprice",
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
    department: ""
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const contactDialog = useSelector(
    ({ contactsApp }) => contactsApp.contacts.contactDialog
  );

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  //const { isValid, dirtyFields } = formState;

  const initDialog = useCallback(() => {
    if (contactDialog.type === "edit" && contactDialog.data) {
      reset({ ...contactDialog.data });
    }
    if (contactDialog.type === "new") {
      reset({
        ...defaultValues,
        ...contactDialog.data,
        id: FuseUtils.generateGUID(),
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  useEffect(() => {
    if (allFields.type === 'Client' && allFields.legalStatus === 'Enterprice') {
      if (
        allFields.type &&
        allFields.title &&
        allFields.companyName &&
        allFields.name &&
        allFields.firstName &&
        allFields.email
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (allFields.type === 'Client' && allFields.legalStatus === 'Personne') {
      if (
        allFields.type &&
        allFields.title &&
        allFields.name &&
        allFields.firstName &&
        allFields.email
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (allFields.type !== 'Client' && allFields.legalStatus === 'Personne') {
      if (
        allFields.type &&
        allFields.title &&
        allFields.companyName &&
        allFields.name
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      if (
        allFields.type &&
        allFields.title &&
        allFields.companyName
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [allFields])

  function closeComposeDialog() {
    setAllFields({
      type: "Client",
      legalStatus: "Enterprice",
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
      department: ""
    })
    setErrors({})
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

  const types = [
    {
      id: 1,
      value: "Client",
      label: "Client",
    },
    {
      id: 2,
      value: "Adversaire",
      label: "Adversaire",
    },
    {
      id: 3,
      value: "Assistante juridique",
      label: "Assistante juridique",
    },
    {
      id: 4,
      value: "Avocat",
      label: "Avocat",
    },
    {
      id: 5,
      value: "Expert judiciaire",
      label: "Expert judiciaire",
    },
    {
      id: 6,
      value: "Expert technique",
      label: "Expert technique",
    },
    {
      id: 7,
      value: "Huissier",
      label: "Huissier",
    },
    {
      id: 8,
      value: "Journaliste",
      label: "Journaliste",
    },
    {
      id: 9,
      value: "Mandataire judiciaire",
      label: "Mandataire judiciaire",
    },
    {
      id: 10,
      value: "Notaire",
      label: "Notaire",
    },
    {
      id: 11,
      value: "Prospect",
      label: "Prospect",
    },
    {
      id: 12,
      value: "Protection juridique",
      label: "Protection juridique",
    },
    {
      id: 13,
      value: "Relation professionnelle",
      label: "Relation professionnelle",
    },
    {
      id: 14,
      value: "Autre",
      label: "Autre",
    },
  ];

  const registerUser = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(allFields));
  };

  const checkIsDisable = (name, value) => {
    if (name === "companyName") {
      if (value !== "") {
        setErrors({ ...errors, companyName: "" });
      } else {
        setErrors({ ...errors, companyName: "Must enter a Company name" });
      }
    }
    if (name === "name") {
      if (value !== "") {
        setErrors({ ...errors, name: "" });
      } else {
        setErrors({ ...errors, name: "Must enter a Name" });
      }
    }
    if (name === "firstName") {
      if (value !== "") {
        setErrors({ ...errors, firstName: "" });
      } else {
        setErrors({ ...errors, firstName: "Must enter a First name" });
      }
    }
    if (name === "email") {
      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (value !== "") {
        if (regex.test(value) === false) {
          setErrors({ ...errors, email: "Must enter a valid Email" });
        } else {
          setErrors({ ...errors, email: "" });
        }
      } else {
        setErrors({ ...errors, email: "Must enter an Email" });
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
            {contactDialog.type === "new" ? "Nouveau contact" : "Edit Contact"}
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
            <Controller
              control={control}
              render={({ field }) => (
                <FormControl className="flex w-full" variant="outlined">
                  <InputLabel>Type*</InputLabel>
                  <Select
                    id="type"
                    label="Type*"
                    name="Type"
                    value={allFields.type}
                    onChange={(e) => {
                      setAllFields({ ...allFields, type: e.target.value });
                      setErrors({})
                    }}
                  >
                    {types.map((category) => (
                      <MenuItem value={category.value} key={category.id}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <div className="flex items-center mb-16">
              <b className="min-w-48 pt-20">Forme juridique*:</b>
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      style={{ marginLeft: 20 }}
                      className="pt-20"
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={allFields.legalStatus}
                      name="radio-buttons-group"
                      onChange={(e) => {
                        setAllFields({
                          ...allFields,
                          legalStatus: e.target.value,
                        })
                      }
                      }
                    >
                      <FormControlLabel
                        value="Enterprice"
                        control={<Radio />}
                        label="Enterprice"
                      />
                      <FormControlLabel
                        value="Personne"
                        control={<Radio />}
                        label="Personne"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
            {allFields.legalStatus === "Enterprice" ? (
              <>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="flex w-full mb-12"
                      disablePortal
                      style={{ color: "#FFFFFF" }}
                      options={titlesEnterprice}
                      onChange={(e, newValue) => {
                        setAllFields({
                          ...allFields,
                          title: newValue.label,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Choisissez un titre*" />
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="companyName"
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Nom de la compagnie*"
                      variant="outlined"
                      fullWidth
                      error={errors?.companyName}
                      helperText={errors?.companyName}
                      onChange={(e) => {
                        setAllFields({
                          ...allFields,
                          companyName: e.target.value,
                        });
                        checkIsDisable("companyName", e.target.value);
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="flex w-full mb-12"
                      disablePortal
                      style={{ color: "#FFFFFF" }}
                      options={Countries}
                      onChange={(e, newValue) =>
                        setAllFields({
                          ...allFields,
                          country: newValue.label,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Pays" />
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Adresse"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          address: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Ville"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          city: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="CP"
                      type="number"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          postalCode: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-8 mb-16"
                      label="Capital social"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">€</InputAdornment>
                        ),
                      }}
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={allFields.capitalSocial}
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          capitalSocial: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mt-8 mb-16"
                      label="Immatriculé.e au RCS de"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          RCSCity: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mt-8 mb-16"
                      label="Numéro"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          number: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <div className="mb-12 text-center">
                      <b>Premier contact</b>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      name="Name"
                      label={allFields.type === 'Client' ? "Nom*" : "Nom"}
                      variant="outlined"
                      fullWidth
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
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label={allFields.type === 'Client' ? "Prénom*" : "Prénom"}
                      variant="outlined"
                      fullWidth
                      error={errors?.firstName}
                      helperText={errors?.firstName}
                      onChange={(e) => {
                        setAllFields({
                          ...allFields,
                          firstName: e.target.value,
                        });
                        checkIsDisable("firstName", e.target.value);
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      label={allFields.type === 'Client' ? "Email*" : "Email"}
                      className="mb-12"
                      variant="outlined"
                      fullWidth
                      error={errors?.email}
                      helperText={errors?.email}
                      onChange={(e) => {
                        setAllFields({
                          ...allFields,
                          email: e.target.value,
                        });
                        checkIsDisable("email", e.target.value);
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Mobile"
                      type="number"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          mobile1: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Fixe"
                      variant="outlined"
                      fullWidth
                      type="number"
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          mobile2: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Commentaire"
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          comments: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  name="categories"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Autocomplete
                      className="w-full mb-12"
                      multiple
                      freeSolo
                      value={allFields.tags}
                      onChange={(event, newValue) => {
                        setAllFields({
                          ...allFields,
                          tags: [
                            ...allFields.tags,
                            ...newValue.filter(
                              (option) =>
                                allFields.tags.indexOf(option) === -1
                            ),
                          ],
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
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="flex w-full mb-12"
                      variant="outlined"
                    >
                      <InputLabel>Statut*</InputLabel>
                      <Select
                        label="Statut*"
                        value={allFields.status}
                        onChange={(e) =>
                          setAllFields({
                            ...allFields,
                            status: e.target.value,
                          })
                        }
                      >
                        {status.map((category) => (
                          <MenuItem value={category.value} key={category.id}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </>
            ) : (
              <>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="flex w-full mb-12"
                      disablePortal
                      style={{ color: "#FFFFFF" }}
                      options={titlesEnterprice}
                      onChange={(e, newValue) => {
                        setAllFields({
                          ...allFields,
                          title: newValue.label,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Choisissez un titre*" />
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      name="Name"
                      label="Nom*"
                      variant="outlined"
                      fullWidth
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
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label={allFields.type === 'Client' ? "Prénom*" : "Prénom"}
                      variant="outlined"
                      fullWidth
                      error={errors?.firstName}
                      helperText={errors?.firstName}
                      onChange={(e) => {
                        setAllFields({
                          ...allFields,
                          firstName: e.target.value,
                        });
                        checkIsDisable("firstName", e.target.value);
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      label={allFields.type === 'Client' ? "Email*" : "Email"}
                      className="mb-12"
                      variant="outlined"
                      fullWidth
                      error={errors?.email}
                      helperText={errors?.email}
                      onChange={(e) => {
                        setAllFields({
                          ...allFields,
                          email: e.target.value,
                        });
                        checkIsDisable("email", e.target.value);
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Mobile"
                      type="number"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          mobile1: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Fixe"
                      variant="outlined"
                      type="number"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          mobile2: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Adresse"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          address: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Ville"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          city: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="CP"
                      type="number"
                      variant="outlined"
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          postalCode: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <div className="mb-12 text-center">
                      <b>Information complémentaire</b>
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Date de naissance"
                      value={allFields.dateValue}
                      onChange={(newValue) => {
                        setAllFields({ ...allFields, newValue })
                      }}
                      renderInput={(params) => (
                        <TextField className="w-full mb-12" {...params} />
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (<Autocomplete
                    className='flex w-full mb-12'
                    disablePortal
                    style={{ color: '#FFFFFF' }}
                    options={Nationalities}
                    renderInput={(params) =>
                      <TextField {...params} label="Nationalité" />
                    }
                  />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="flex w-full mb-12"
                      disablePortal
                      style={{ color: "#FFFFFF" }}
                      options={Countries}
                      onChange={(e, newValue) =>
                        setAllFields({
                          ...allFields,
                          country: newValue.label,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Pays" />
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Ville de naissance"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="flex w-full mb-12"
                      disablePortal
                      style={{ color: "#FFFFFF" }}
                      options={Departments}
                      onChange={(e, newValue) =>
                        setAllFields({
                          ...allFields,
                          department: newValue.label,
                        })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Département" />
                      )}
                    />
                    // <Autocomplete
                    //   className='flex w-full mb-12'
                    //   disablePortal
                    //   style={{ color: '#FFFFFF' }}
                    //   options={Departments}
                    //   renderInput={(params) =>
                    //     <TextField {...params} label="Département" />
                    //   }
                    // />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Profession"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <FormControl className="flex w-full mb-12" variant="outlined">
                      <InputLabel>Statut</InputLabel>
                      <Select
                        label="Statut"
                        value={allFields.status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        {status1.map((category) => (
                          <MenuItem value={category.value} key={category.id}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      // {...field}
                      className="mb-12"
                      label="Commentaire"
                      variant="outlined"
                      multiline
                      rows={5}
                      fullWidth
                      onChange={(e) =>
                        setAllFields({
                          ...allFields,
                          comments: e.target.value,
                        })
                      }
                    />
                  )}
                />
                <Controller
                  name="categories"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <Autocomplete
                      className="w-full mb-12"
                      multiple
                      freeSolo
                      value={allFields.tags}
                      onChange={(event, newValue) => {
                        setAllFields({
                          ...allFields,
                          tags: [
                            ...allFields.tags,
                            ...newValue.filter(
                              (option) =>
                                allFields.tags.indexOf(option) === -1
                            ),
                          ],
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
                  )}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="flex w-full mb-12"
                      variant="outlined"
                    >
                      <InputLabel>Statut*</InputLabel>
                      <Select
                        label="Statut*"
                        value={allFields.status}
                        onChange={(e) =>
                          setAllFields({
                            ...allFields,
                            status: e.target.value,
                          })
                        }
                      >
                        {status.map((category) => (
                          <MenuItem value={category.value} key={category.id}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
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
              disabled={_.isEmpty(errors) || !isValid || allFields.status === 'Inactif'}
            >
              Envoyer invitation
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ContactDialog;
