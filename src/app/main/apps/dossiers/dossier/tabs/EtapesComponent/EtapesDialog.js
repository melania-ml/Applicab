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
  Icon,
  Autocomplete
} from "@mui/material";
import Statut from "app/main/constants/Statut";
import {
  closeNewEtapeDialog,
  closeEditEtapeDialog,
  updateEtapes
} from "app/store/slices/dossiersSlice";

function EtapesDialog() {
  const [allFields, setAllFields] = useState({
    case_name: "",
    name: "",
    new_name: "",
    status: "A prévoir",
    dateValue: null,
    client_id: [],
    object: "",
    editorText: "",
    files: []
  });
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [isInvite, setIsInvite] = useState(false);
  const [isAddNotification, setIsAddNotification] = useState(false);
  const dispatch = useDispatch();
  const {
    etapeDialog: { data, props, type },
    editDossierData
  } = useSelector(({ dossiers }) => dossiers);

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      setAllFields({
        ...allFields,
        case_name: editDossierData.data.case_name,
        name: data.name,
        status: data.status || "A prévoir"
      });
    } else {
      setAllFields({
        ...allFields,
        case_name: editDossierData?.data?.case_name,
        name: ""
      });
    }
  }, [data, type]);
  let fileObj = [];
  let fileArray = [];
  const onFileUpload = (e) => {
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setAllFields({ ...allFields, file: fileArray });
  };

  useEffect(() => {
    if (
      (allFields.status === "A faire" || allFields.status === "Fait") &&
      allFields.client_id.length
    ) {
      setIsInvite(false);
    } else {
      setIsInvite(true);
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

  const handleRemoveItem = (e, value) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== value)
    );
  };

  useEffect(() => {
    if (notifications.length < 5) {
      setIsAddNotification(false);
    } else {
      setIsAddNotification(true);
    }
  }, [notifications.length]);

  const addNotification = () => {
    setCount(count + 1);
    if (notifications.length < 5) {
      let obj = {};
      obj["id"] = count;
      obj["count"] = notifications.length === 0 ? 15 : "";
      obj["format"] = "Day";
      const newArr = [...notifications];
      newArr.push(obj);
      setNotifications(newArr);
    }
  };
  const onSubmit = () => {
    debugger;
    if (type === "edit") {
      dispatch(
        updateEtapes({
          ...allFields,
          id: data.id,
          case_management_id: editDossierData.data.id
        })
      );
    }
    closeComposeDialog();
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
      <DialogContent classes={{ root: "p-24" }}>
        <div className="row">
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
            disabled={type === "new" ? false : true}
            value={allFields.name}
            onChange={(e) => {
              setAllFields({
                ...allFields,
                name: e.target.value
              });
            }}
          />
          {type === "edit" && (
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
          )}
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
            ampm={false}
            ampmInClock={false}
            maxDate={new Date()}
            onChange={(newValue) => {
              setAllFields({ ...allFields, dateValue: newValue });
            }}
            onClose={() => addNotification()}
            renderInput={(params) => (
              <TextField className="w-full mb-12" {...params} />
            )}
          />
          {notifications.length > 0 &&
            notifications?.map((notification) => (
              <div className="flex w-full mb-12 relative">
                <TextField
                  className="xs=4 daycount"
                  hiddenLabel
                  placeholder="Day Count"
                  type="number"
                  variant="filled"
                  value={notification.count}
                  onChange={(e) => {
                    notifications.map((n) => {
                      if (n.id === notification.id) {
                        n.count = e.target.value;
                      }
                    });
                    setNotifications([...notifications]);
                  }}
                />
                <FormControl
                  className="ml-12 hourscount"
                  hiddenLabel
                  variant="filled"
                >
                  <Select placeholder="Jours" defaultValue="Jours">
                    <MenuItem value="Jours" key="Jours">
                      Jours
                    </MenuItem>
                  </Select>
                  {notification.id !== 0 && (
                    <Icon
                      style={{
                        fontSize: "xx-large",
                        position: "absolute",
                        right: "-40px",
                        top: "10px",
                        color: "#BABABF",
                        cursor: "pointer"
                      }}
                      onClick={(e) => handleRemoveItem(e, notification.id)}
                    >
                      clear
                    </Icon>
                  )}
                </FormControl>
              </div>
            ))}

          <div className="px-18">
            <Button
              className="mb-12"
              variant="outlined"
              style={{ borderRadius: 5 }}
              color="secondary"
              disabled={isAddNotification}
              onClick={addNotification}
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
            <div className="flex mb-14 w-full">
              <b>Message</b>
            </div>
          </div>
          <Autocomplete
            multiple
            className="flex w-full mb-12"
            options={editDossierData?.data?.client_id}
            getOptionLabel={(option) => {
              if (typeof option === "object") {
                return `${option.first_name + " " + option.last_name} `;
              } else {
                const val = editDossierData?.data?.client_id.filter(
                  (contact) => contact.id === option
                );
                return `${val[0]?.first_name + " " + val[0]?.last_name} `;
              }
            }}
            value={allFields.client_id}
            onChange={(event, newValue) => {
              const array = newValue.map((val) => val.id ?? val);
              setAllFields({
                ...allFields,
                client_id: array
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choisissez un ou plusieurs clients*"
              />
            )}
          />
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
              multiple
              id="icon-button-file"
              onChange={onFileUpload}
              className="filetype"
            />
          </Button>
        </div>
      </DialogContent>
      <DialogActions className="justify-between p-4 pb-16">
        <div className="px-16">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{ borderRadius: 0 }}
            onClick={onSubmit}
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
            disabled={isInvite}
            onClick={(() => registerUser(), closeComposeDialog)}
          >
            Envoyer message
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default EtapesDialog;
