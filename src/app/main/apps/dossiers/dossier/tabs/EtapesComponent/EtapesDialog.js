import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import _ from "@lodash";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  Icon
} from "@mui/material";
import Statut from "app/main/constants/Statut";
import Clients from "app/main/constants/Clients";
import {
  closeNewContactDialog,
  closeEditContactDialog
} from "app/store/slices/dossiersSlice";

const tags = [];

function EtapesDialog(props) {
  const [allFields, setAllFields] = useState({
    position: "",
    dossier: "",
    step: "",
    name: "",
    clientStatus: "Case",
    dateValue: null,
    chooseCustomer: [],
    object: "",
    editorText: ""
  });
  const { contacts } = useSelector(({ dossiers }) => dossiers);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ dossiers }) => dossiers.contactDialog);
  const dateArray = [
    { name: "ItemOne", id: 1, type: "Jours" },
    { name: "ItemTwo", id: 2, type: "les heures" },
    { name: "ItemThree", id: 3, type: "minute" }
  ];
  const [list, updateList] = useState(dateArray);

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    updateList(list.filter((item) => item.name !== name));
  };
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
                  position: e.target.value
                });
              }}
            />
            <TextField
              className="mb-12"
              name="Dossier"
              label="Dossier"
              variant="outlined"
              fullWidth
              value={allFields.dossier}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  dossier: e.target.value
                });
              }}
            />
            <TextField
              className="mb-12"
              name="Étape"
              label="Étape"
              variant="outlined"
              fullWidth
              value={allFields.step}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  step: e.target.value
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
                  name: e.target.value
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
                    clientStatus: e.target.value
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
                  <Select label="Time">
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
                    color: "#BABABF"
                  }}
                >
                  clear
                </Icon>
              </>
            ) : (
              ""
            )}

            <div className="px-18 mb-14">
              <Button
                variant="outlined"
                style={{ borderRadius: 5 }}
                color="secondary"
              >
                <Icon
                  style={{
                    color: "secondary",
                    fontSize: "large",
                    margin: "10px"
                  }}
                >
                  notifications
                </Icon>
                Ajouter une notification
              </Button>
            </div>
            <div className="flex mb-14 w-full">
              <b>Message</b>
            </div>
            <FormControl className="flex w-full mb-12" variant="outlined">
              <InputLabel>Choisissez un ou plusieurs clients</InputLabel>
              <Select
                label="Choisissez un ou plusieurs clients"
                value={allFields.chooseCustomer}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    chooseCustomer: e.target.value
                  })
                }
              >
                {contacts.map((data) => (
                  <MenuItem
                    value={data.first_name + " " + data.last_name}
                    key={data.first_name}
                  >
                    {data.first_name + " " + data.last_name}
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
                  object: e.target.value
                });
              }}
            />
            <div className="flex mb-14 w-full">
              <CKEditor
                //className="mx-8"
                editor={ClassicEditor}
                data=""
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "ckfinder",
                    "|",
                    "imageTextAlternative",
                    "imageUpload",
                    "imageStyle:full",
                    "imageStyle:side",
                    "|",
                    "mediaEmbed",
                    "insertTable",
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "|",
                    "undo",
                    "redo"
                  ]
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ data });
                }}
              />
            </div>
            <div className="flex mb-14 w-full">
              <b>Documents</b>
            </div>
            <div className="px-18">
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
                    margin: "10px"
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
          </div>
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
