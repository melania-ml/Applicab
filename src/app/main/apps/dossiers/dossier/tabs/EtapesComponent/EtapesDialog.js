import React, { useEffect } from "react";
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
  Icon,
} from "@mui/material";
import Statut from "app/main/constants/Statut";
import {
  closeNewContactDialog,
  closeEditContactDialog,
} from "app/store/slices/dossiersSlice";

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
    editorText: "",
    selectedDocument: [],
  });
  const { contacts } = useSelector(({ dossiers }) => dossiers);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ dossiers }) => dossiers.contactDialog);
  const dateArray = [
    { name: "ItemOne", id: 1, type: "Jours" },
    { name: "ItemTwo", id: 2, type: "les heures" },
    { name: "ItemThree", id: 3, type: "minute" },
  ];
  const [list, updateList] = useState(dateArray);

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name");
    setAllFields(list.filter((item) => item.name !== name));
  };
  const onSelectDocument = (event) => {
    const file = event.target.files[0];
  };

  useEffect(() => {
    if (
      allFields.position &&
      allFields.dossier &&
      allFields.step &&
      allFields.name &&
      allFields.dossier &&
      allFields.clientStatus &&
      // allFields.dateValue &&
      allFields.chooseCustomer &&
      allFields.object &&
      allFields.editorText &&
      allFields.selectedDocument
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [allFields]);

  function closeComposeDialog() {
    return contactDialog.type === "edit"
      ? dispatch(closeEditContactDialog())
      : dispatch(closeNewContactDialog());
  }

  const registerUser = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(allFields));
    setAllFields("");
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
        // onSubmit={handleSubmit(onSubmit)}
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
                  <Select label="Time">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {dateArray.map((data) => (
                      <MenuItem value={data.name} key={data.id}>
                        {data.type}
                      </MenuItem>
                    ))}
                  </Select>

                  <span name={allFields.dateValue} onClick={handleRemoveItem}>
                    <Icon
                      className="ml-12"
                      style={{
                        fontSize: "xx-large",
                        margin: "-44px 310px 37px",
                        color: "#BABABF",
                      }}
                    >
                      clear
                    </Icon>
                  </span>
                </FormControl>
              </>
            ) : (
              ""
            )}

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
                  object: e.target.value,
                });
              }}
            />
          </div>
          <CKEditor
            className="mx-8"
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
                "redo",
              ],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setAllFields({
                ...allFields,
                editorText: data,
              });
              // console.log({ data });
            }}

            // onInit={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log("Editor is ready to use!", editor);
            //   console.log(
            //     "toolbar: ",
            //     Array.from(editor.ui.componentFactory.names())
            //   );
            //   console.log(
            //     "plugins: ",
            //     ClassicEditor.builtinPlugins.map((plugin) => plugin.pluginName)
            //   );
            // }}
            // onBlur={(editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(editor) => {
            //   console.log("Focus.", editor);
            // }}
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
                onChange={onSelectDocument}
                className="filetype"
              />
            </Button>
          </div>
        </DialogContent>
        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              style={{ borderRadius: 0 }}
              disabled={!isValid}
              onClick={closeComposeDialog}
              // onClick={(() => registerUser())}
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
              disabled={!isValid}
              onClick={(() => registerUser(), closeComposeDialog)}
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
