import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  closeNewEtapeDialog,
  closeEditEtapeDialog
} from "app/store/slices/dossiersSlice";

const tags = [];

function EtapesDialog() {
  const [allFields, setAllFields] = useState({
    indexNum: "",
    case_name: "",
    name: "",
    new_name: "",
    status: "A prévoir",
    dateValue: null,
    chooseCustomer: [],
    object: "",
    editorText: "",
    selectedDocument: []
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const {
    etapeDialog: { data, props, type },
    editDossierData,
    contacts
  } = useSelector(({ dossiers }) => dossiers);

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      debugger;
      setAllFields({
        ...allFields,
        indexNum: data.indexNum,
        case_name: editDossierData.data.case_name,
        name: data.name,
        status: data.status
      });
    }
  }, [data, type]);

  const dateArray = [
    { name: "ItemOne", id: 1, type: "Jours" },
    { name: "ItemTwo", id: 2, type: "les heures" },
    { name: "ItemThree", id: 3, type: "minute" }
  ];
  const [list, updateList] = useState(dateArray);

  const onImageChange = (event) => {
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
    return type === "edit"
      ? dispatch(closeEditEtapeDialog())
      : dispatch(closeNewEtapeDialog());
  }

  const registerUser = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(allFields));
    setAllFields("");
  };

  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      {...props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="sm"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {type === "new"
              ? "Ajouter une nouvelle étape"
              : "Modifier l’étape : Codes d'accès AppliCab envoi au(x) client(s)"}
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
              value={allFields.indexNum}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  indexNum: e.target.value
                });
              }}
            />
            <TextField
              className="mb-12"
              name="Dossier"
              label="Dossier"
              variant="outlined"
              fullWidth
              disabled
              value={allFields.case_name}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  case_name: e.target.value
                });
              }}
            />
            <TextField
              className="mb-12"
              name="Étape"
              label="Étape"
              variant="outlined"
              fullWidth
              disabled
              value={allFields.name}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  name: e.target.value
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
              value={allFields.new_name}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  new_name: e.target.value
                });
              }}
            />
            <FormControl className="flex w-full mb-12" variant="outlined">
              <InputLabel>Statut</InputLabel>
              <Select
                label="Statut"
                value={allFields.status}
                onChange={(e) =>
                  setAllFields({
                    ...allFields,
                    status: e.target.value
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

                  <span
                    name={allFields.dateValue}
                    //onClick={handleRemoveItem}
                  >
                    <Icon
                      className="ml-12"
                      style={{
                        fontSize: "xx-large",
                        margin: "-44px 310px 37px",
                        color: "#BABABF"
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
                    margin: "10px"
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
                className="ckeditor"
                editor={ClassicEditor}
                data="<p>Chère Madame, Cher Monsieur,</br>
                Je vous confirme bien volontiers notre rendez-vous du ........... prochain à .. heures.</br></br>
                Je vous invite à me confirmer le numéro de téléphone sur lequel je pourrai vous joindre
                Voici le lien pour participer à notre visioconférence.</br>
                Je vous recevrai au (adresse du cabinet)</br></br>
                Dans l'intervalle,</br>
                Je vous prie de croire, Chère Madame, Cher Monsieur, à l'assurance de mes salutations
                distinguées.</p>"
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
                //onChange={onSelectDocument}
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
