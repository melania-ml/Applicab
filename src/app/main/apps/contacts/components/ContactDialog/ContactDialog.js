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
} from "@mui/material";

import EnterpriceFields from "./EnterpriceFields";
import PersonalFields from './PersonalFields';
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
};

const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

function ContactDialog(props) {
  const [selectedType, setSelectedType] = useState("");

  const [legalStatus, setLegalStatus] = useState("enterprice");
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

  const { isValid, dirtyFields } = formState;

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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: "p-24" }}>
          <div className="row">
            <Controller
              control={control}
              render={({ field }) => (
                <FormControl className="flex w-full" variant="outlined">
                  <InputLabel>Type</InputLabel>
                  <Select
                    label="Type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
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
              <b className="min-w-48 pt-20">Forme juridique:</b>
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
                      defaultValue={legalStatus}
                      name="radio-buttons-group"
                      onChange={(e) => setLegalStatus(e.target.value)}
                    >
                      <FormControlLabel
                        value="enterprice"
                        control={<Radio />}
                        label="Enterprice"
                      />
                      <FormControlLabel
                        value="personne"
                        control={<Radio />}
                        label="Personne"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
            {legalStatus === "enterprice" ? <EnterpriceFields /> : <PersonalFields />}
          </div>
        </DialogContent>

        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              style={{ borderRadius: 0 }}
              disabled={_.isEmpty(dirtyFields) || !isValid}
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
              disabled={_.isEmpty(dirtyFields) || !isValid}
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
