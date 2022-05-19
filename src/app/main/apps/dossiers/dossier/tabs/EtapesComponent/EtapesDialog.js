import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Statut from "app/main/constants/Statut";
import {
  getFormattedDateTime,
  getUniqueTags,
  getNumericValidation
} from "app/main/common/functions";
import {
  closeNewEtapeDialog,
  closeEditEtapeDialog,
  updateEtapes,
  addEtapes,
  uploadDocument,
  getDocuments
} from "app/store/slices/dossiersSlice";

//material-ui
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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/lab";

function EtapesDialog() {
  const [allFields, setAllFields] = useState({
    position: "",
    case_name: "",
    name: "",
    sub_name: "",
    status: "A prévoir",
    notification_date: null,
    client_id: [],
    subject: "",
    message: `<p><b>Chère Madame, Cher Monsieur,</b></br>
    Je vous confirme bien volontiers notre rendez-vous du ........... prochain à .. heures.</br></br>
    <b>Je vous invite à me confirmer le numéro de téléphone sur lequel je pourrai vous joindre
    Voici le lien pour participer à notre visioconférence.</br>
    Je vous recevrai au (adresse du cabinet)</b></br></br>
    Dans l'intervalle,</br>
    Je vous prie de croire, <b>Chère Madame, Cher Monsieur,</b> à l'assurance de mes salutations
    distinguées.</p>`
  });
  const [files, setFiles] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [isInvite, setIsInvite] = useState(false);
  const [isAddNotification, setIsAddNotification] = useState(false);
  const [isDateAdded, setIsDateAdded] = useState(false);
  const dispatch = useDispatch();
  const {
    etapeDialog: { data, props, type },
    editDossierData,
    caseId
  } = useSelector(({ dossiers }) => dossiers);

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      let arr = [];
      data?.client_id.map((a) => arr.push(a.id));
      setAllFields({
        ...allFields,
        case_name: editDossierData?.data?.case_name,
        name: data.name,
        status: data.status || "A prévoir",
        sub_name: data.sub_name,
        subject: data.subject,
        notification_date:
          data.notification_date &&
          getFormattedDateTime({
            date: data.notification_date
          }),
        client_id: editDossierData?.data?.client_id?.filter((clientId) =>
          arr.includes(clientId.id)
        ),
        message: data.message,
        position: data.position
      });
      setNotifications(data.lawyer_notification?.map((e) => ({ count: e })));
    }
    if (type === "new") {
      setAllFields({
        ...allFields,
        case_name: editDossierData?.data?.case_name,
        position: "",
        name: "",
        sub_name: "",
        status: "A prévoir",
        notification_date: null,
        client_id: [],
        subject: "",
        message: ""
      });
      setNotifications([]);
    }
  }, [data, type]);

  const onFileUpload = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    if (allFields.position && allFields.name) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (
      (allFields.status === "A faire" || allFields.status === "Fait") &&
      allFields.client_id.length &&
      allFields.position &&
      allFields.message
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

  const sendMessage = () => {
    if (type === "edit") {
      dispatch(
        updateEtapes({
          ...allFields,
          message: allFields.message,
          id: data.id,
          case_management_id: editDossierData.data.id,
          send_notification: true,
          lawyer_notification: notifications.map(
            (notification) => notification.count
          )
        })
      );
    } else {
      dispatch(
        addEtapes({
          ...allFields,
          case_management_id: editDossierData.data.id,
          send_notification: true
        })
      );
    }
    if (files?.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("case_document", files[i]);
      }
      formData.append("case_management_id", editDossierData.data.id);
      formData.append("case_task_id", data.id);
      dispatch(uploadDocument(formData));
      setFiles(null);
    }
    setTimeout(() => {
      dispatch(getDocuments(caseId));
    }, 2000);
    closeComposeDialog();
  };

  const handleRemoveItem = (e, index) => {
    const _tempNotification = [...notifications];
    _tempNotification.splice(index, 1);
    setNotifications([..._tempNotification]);
  };

  useEffect(() => {
    if (notifications.length < 5) {
      setIsAddNotification(false);
    } else {
      setIsAddNotification(true);
    }
  }, [notifications.length]);

  const addNotification = (param) => {
    if (!isDateAdded || param === "fromButton") {
      setCount(count + 1);
      if (notifications.length < 5) {
        const obj = {};
        obj.id = count;
        obj.count = notifications.length === 0 ? 15 : null;
        const newArr = [...notifications];
        newArr.push(obj);
        setNotifications(newArr);
      }
    }
    setIsDateAdded(true);
  };
  const onSubmit = () => {
    if (type === "edit") {
      dispatch(
        updateEtapes({
          ...allFields,
          id: data?.id,
          case_management_id: editDossierData?.data?.id,
          send_notification: false,
          lawyer_notification: notifications?.map(
            (notification) => notification.count
          )
        })
      );
    } else {
      dispatch(
        addEtapes({
          ...allFields,
          case_management_id: editDossierData.data.id,
          send_notification: false,
          lawyer_notification: notifications.map(
            (notification) => notification.count
          )
        })
      );
      setAllFields({
        ...allFields,
        position: "",
        case_name: "",
        name: "",
        sub_name: "",
        status: "A prévoir",
        notification_date: null,
        client_id: [],
        subject: "",
        message: ""
      });
    }
    if (files?.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("case_document", files[i]);
      }
      formData.append("case_management_id", editDossierData.data.id);
      formData.append("case_task_id", data.id);
      dispatch(uploadDocument(formData));
      setFiles(null);
    }
    setTimeout(() => {
      dispatch(getDocuments(caseId));
    }, 2000);
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
            name="Position"
            label="Position"
            variant="outlined"
            autoComplete="off"
            required
            fullWidth
            type="text"
            onKeyDown={getNumericValidation}
            value={allFields.position}
            onChange={(e) => {
              if (e.target.value.length < 4) {
                setAllFields({
                  ...allFields,
                  position: e.target.value > 0 ? e.target.value : ""
                });
              }
            }}
          />
          <TextField
            className="mb-12"
            name="Dossier"
            label="Dossier"
            autoComplete="off"
            variant="outlined"
            fullWidth
            required
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
            autoComplete="off"
            required
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 100 }}
            disabled={type !== "new"}
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
              autoComplete="off"
              fullWidth
              inputProps={{ maxLength: 100 }}
              value={allFields.sub_name}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  sub_name: e.target.value
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
          <div
            className="flex w-full mb-12"
            onKeyDownCapture={(e) => e.preventDefault()}
          >
            <FormControl className="w-full for-date" variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDateTimePicker
                  label="Date"
                  value={allFields.notification_date}
                  onChange={(newValue) => {
                    setAllFields({
                      ...allFields,
                      notification_date: newValue
                    });
                  }}
                  ampm={false}
                  ampmInClock={false}
                  renderInput={(params) => (
                    <TextField
                      autoComplete="off"
                      className="w-full mb-12"
                      {...params}
                    />
                  )}
                />
                {allFields.notification_date && (
                  <Icon
                    style={{
                      fontSize: "large",
                      position: "absolute",
                      right: 35,
                      top: 16,
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      setAllFields({ ...allFields, notification_date: null })
                    }
                  >
                    clear
                  </Icon>
                )}
              </LocalizationProvider>
            </FormControl>
          </div>
          {notifications.length > 0 &&
            notifications?.map((notification, index) => (
              <div className="flex w-full mb-12 relative">
                <TextField
                  className="xs=4 daycount"
                  hiddenLabel
                  placeholder=""
                  type="number"
                  variant="filled"
                  autoComplete="off"
                  value={notification.count ?? 0}
                  onChange={(e) => {
                    notifications.map((n) => {
                      setNotifications((prev) =>
                        prev.map((newObject, id) => {
                          if (index === id)
                            return {
                              ...newObject,
                              count:
                                parseInt(e.target.value) > 0
                                  ? e.target.value
                                  : ""
                            };
                          return newObject;
                        })
                      );
                    });
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
                  <Icon
                    style={{
                      fontSize: "xx-large",
                      position: "absolute",
                      right: "-40px",
                      top: "10px",
                      color: "#BABABF",
                      cursor: "pointer"
                    }}
                    onClick={(e) => handleRemoveItem(e, index)}
                  >
                    clear
                  </Icon>
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
              onClick={() => addNotification("fromButton")}
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
                return `${`${option.first_name} ${option.last_name}`} `;
              }
              const val = editDossierData?.data?.client_id?.filter(
                (contact) => contact.id === option
              );
              return `${`${val[0]?.first_name} ${val[0]?.last_name}`} `;
            }}
            value={allFields.client_id}
            onChange={(event, newValue) => {
              const array = newValue.map((val) => val.id ?? val);
              setAllFields({
                ...allFields,
                client_id: getUniqueTags(array)
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choisissez un ou plusieurs clients*"
                inputProps={{ ...params.inputProps, maxLength: 100 }}
              />
            )}
          />
          <TextField
            className="mb-12"
            name="Object"
            label="Object"
            variant="outlined"
            autoComplete="off"
            fullWidth
            inputProps={{ maxLength: 100 }}
            value={allFields.subject}
            onChange={(e) => {
              setAllFields({
                ...allFields,
                subject: e.target.value
              });
            }}
          />
          <div className="flex mb-14 w-full">
            <CKEditor
              className="ckeditor"
              editor={ClassicEditor}
              data={data?.message || allFields.message}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  // "bulletedList",
                  // "numberedList",
                  "blockQuote",
                  "|",
                  "undo",
                  "redo"
                ]
              }}
              onChange={(event, editor) => {
                setAllFields({
                  ...allFields,
                  message: editor.getData()
                });
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
        {data?.case_documents &&
          data.case_documents.length > 0 &&
          data.case_documents.map((doc) => {
            return <p>{doc.file_name}</p>;
          })}
      </DialogContent>
      <DialogActions className="justify-between p-4 pb-16">
        <div className="px-16">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{ borderRadius: 0 }}
            disabled={!isValid}
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
            onClick={sendMessage}
          >
            Envoyer message
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default EtapesDialog;
