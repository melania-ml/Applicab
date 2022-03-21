import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import _ from "@lodash";
import DateTimePicker from "@mui/lab/DateTimePicker";
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
import Statut from "app/main/constants/Statut";
import Clients from "app/main/constants/Clients";
import {
  closeNewContactDialog,
  closeEditContactDialog,
} from "app/store/slices/dossiersSlice";

const tags = [];
const dateArray = [
  {
    id: 1,
    type: "Jours",
    value: 24,
  },
  {
    id: 2,
    type: "hr",
    value: 1,
  },
  {
    id: 3,
    type: "min",
    value: 0,
  },
];

function EtapesDialog(props) {
  const [allFields, setAllFields] = useState({
    position: "",
    dossier: "dossier that are fixed Value",
    step: "Etapes that are fixed Value",
    name: "",
    clientStatus: "Case",
    dateValue: null,
    chooseCustomer: [],
    object: "",
    editorText: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ dossiers }) => dossiers.contactDialog);

  const onImageChange = (event) => {
    const file = event.target.files[0];
  };

  function closeComposeDialog() {
    return contactDialog.type === "edit"
      ? dispatch(closeEditContactDialog())
      : dispatch(closeNewContactDialog());
  }

  const registerUser = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(allFields));
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
              ? "Ajouter une nouvelle étape"
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
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  position: e.target.value,
                });
              }}
            />
            <TextField
              className="mb-12"
              name="Dossier"
              label="Dossier"
              disabled
              variant="outlined"
              fullWidth
              value={allFields.dossier}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  dossier: e.target.value,
                });
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
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  step: e.target.value,
                });
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
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  name: e.target.value,
                });
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
            <DateTimePicker
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
            {allFields.dateValue ? (
              <>
                <TextField
                  className="mb-12 xs=4"
                  label=""
                  type="number"
                  variant="outlined"
                />

                <FormControl className=" mb-12 ml-12 w-6/12" variant="outlined">
                  <InputLabel>Jours</InputLabel>
                  <Select label="Age">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={24}>Jours</MenuItem>
                    <MenuItem value={1}>les heures</MenuItem>
                    <MenuItem value={0}>minute</MenuItem>
                  </Select>
                </FormControl>
                <Icon
                  className="ml-12"
                  style={{
                    fontSize: "xx-large",
                    margin: "10px 19px",
                    color: "#BABABF",
                  }}
                >
                  clear
                </Icon>
              </>
            ) : (
              ""
            )}
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
                value={allFields.chooseCustomer}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    chooseCustomer: e.target.value,
                  })
                }
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
              value={allFields.object}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  object: e.target.value,
                });
              }}
            />
          </div>
          <Editor
            // editorState={editor}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            placeholder="Message"
            name="editorText"
            value={allFields.editorText}
            onChange={(e) => {
              setAllFields({
                editorText: e.target.value,
              });
            }}
          />
          <div className="px-18">
            <br />
            <h2>
              <b>Documents</b>
            </h2>
            <br />
            <Button
              variant="outlined"
              component="span"
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
              <label htmlFor="icon-button-file">Ajouter un document</label>
              <input
                name="Ajouter un document"
                color="blue"
                type="file"
                multiple="multiple"
                id="icon-button-file"
                onChange={onImageChange}
                className="filetype"
              />
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
              // disabled={_.isEmpty(errors) || !isValid}
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
              // disabled={
              //   _.isEmpty(errors) ||
              //   !isValid ||
              //   allFields.status === "Inactif" ||
              //   allFields.type !== "Client"
              // }
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
