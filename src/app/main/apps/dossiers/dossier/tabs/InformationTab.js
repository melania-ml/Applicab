import { useEffect, useState } from "react";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Button
} from "@mui/material";
import Statut from "app/main/constants/Statut";
import Types from "app/main/constants/Types";
import { useDispatch, useSelector } from "react-redux";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { openNewContactDialog } from "app/store/slices/contactsSlice";
import { addCase } from "app/store/slices/dossiersSlice";
import ContactDialog from "app/main/apps/contacts/components/ContactDialog/ContactDialog";

const tags = [];
function InformationTab() {
  const dispatch = useDispatch();
  const { natures, procedures, contacts } = useSelector(
    ({ dossiers }) => dossiers
  );
  const filter = createFilterOptions();
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [allFields, setAllFields] = useState({
    case_name: "",
    nature: "",
    status: "A ouvrir",
    type: "",
    procedure: "",
    location: "",
    tags: [],
    internal_comment: "",
    shared_comment: "",
    client_id: [],
    customer_contact_id: [],
    opposing_contact_id: []
  });

  useEffect(() => {
    const isEmpty = Object.values(errors).every((x) => x === null || x === "");
    if (
      allFields.case_name &&
      allFields.nature &&
      allFields.status &&
      allFields.type &&
      allFields.procedure &&
      allFields.client_id?.length &&
      isEmpty
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [allFields]);

  const checkIsDisable = (name, val) => {
    const value = typeof val === "string" ? val.trim() : val;
    if (name === "case_name") {
      if (value) {
        setErrors({ ...errors, case_name: "" });
      } else {
        setErrors({ ...errors, case_name: "Must enter a Proper Case name" });
      }
    }
  };

  function onSubmit(param) {
    dispatch(addCase({ ...allFields }));
  }

  return (
    <div>
      <TextField
        className="mt-8 mb-16"
        value={allFields.case_name}
        error={errors?.case_name}
        helperText={errors?.case_name}
        onChange={(e) => {
          setAllFields({
            ...allFields,
            case_name: e.target.value
          });
          checkIsDisable("case_name", e.target.value);
        }}
        label="Nom*"
        autoFocus
        variant="outlined"
        fullWidth
      />
      <Autocomplete
        className="flex w-full mb-12"
        value={allFields.nature}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setAllFields({ ...allFields, nature: newValue });
          } else if (newValue && newValue.inputValue) {
            setAllFields({
              ...allFields,
              nature: newValue.inputValue
            });
          } else {
            setAllFields({
              ...allFields,
              nature: newValue?.nature_title
            });
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.nature_title
          );
          if (inputValue.trim() !== "" && !isExisting) {
            filtered.push({
              inputValue: inputValue.trim(),
              nature_title: `Ajouter "${inputValue.trim()}"`
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={natures}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.nature_title;
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.nature_title}</li>
        )}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Nature*" />}
      />
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Statut*</InputLabel>
        <Select
          label="Statut*"
          value={allFields.status}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              status: e.target.value
            });
          }}
        >
          {Statut.map((status) => (
            <MenuItem value={status.value} key={status.id}>
              {status.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Type*</InputLabel>
        <Select
          label="Type*"
          value={allFields.type}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              type: e.target.value
            });
          }}
        >
          {Types.map((type) => (
            <MenuItem value={type.value} key={type.id}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Procédure*</InputLabel>
        <Select
          label="Procédure*"
          value={allFields.procedure}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              procedure: e.target.value
            });
          }}
        >
          {procedures.map((procedure) => (
            <MenuItem value={procedure.id} key={procedure.id}>
              {procedure.procedure_type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="mt-8 mb-16"
        label="Lieu"
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setAllFields({
            ...allFields,
            location: e.target.value
          });
        }}
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
          <TextField {...params} label="Tags" placeholder="Add your tags" />
        )}
      />
      <TextField
        className="mb-12"
        label="Commentaire interne"
        variant="outlined"
        multiline
        rows={5}
        fullWidth
        value={allFields.internal_comment}
        onChange={(e) => {
          setAllFields({
            ...allFields,
            internal_comment: e.target.value
          });
        }}
      />
      <TextField
        className="mb-12"
        label="Commentaire partagé avec le client"
        variant="outlined"
        multiline
        rows={5}
        fullWidth
        value={allFields.shared_comment}
        onChange={(e) => {
          setAllFields({
            ...allFields,
            shared_comment: e.target.value
          });
        }}
      />
      <div className="mb-10">
        <b>Ajouter un client au dossier</b>
      </div>
      <Autocomplete
        multiple
        className="flex w-full mb-12"
        options={contacts}
        getOptionLabel={(option) => {
          return `${option.first_name + " " + option.last_name} `;
        }}
        onChange={(event, newValue) => {
          const array = newValue.map((val) => val.id);
          setAllFields({
            ...allFields,
            client_id: array
          });
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choisissez un client*" />
        )}
      />
      <div className="mb-10">
        <b>Ajouter un contact client au dossier</b>
      </div>
      <Autocomplete
        multiple
        className="flex w-full mb-12"
        options={contacts}
        getOptionLabel={(option) => {
          return `${option.first_name + " " + option.last_name} `;
        }}
        onChange={(event, newValue) => {
          const array = newValue.map((val) => val.id);
          setAllFields({
            ...allFields,
            customer_contact_id: array
          });
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choisissez un contact" />
        )}
      />
      <div className="mb-10">
        <b>Ajouter un contact adverse au dossier</b>
      </div>
      <Autocomplete
        multiple
        className="flex w-full mb-12"
        options={contacts}
        getOptionLabel={(option) => {
          return `${option.first_name + " " + option.last_name} `;
        }}
        onChange={(event, newValue) => {
          const array = newValue.map((val) => val.id);
          setAllFields({
            ...allFields,
            opposing_contact_id: array
          });
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choisissez un contact" />
        )}
      />
      <br />
      <div className="flex justify-between">
        <Button
          variant="contained"
          color="secondary"
          style={{ borderRadius: 0 }}
          disabled={!isValid}
          onClick={() => onSubmit("submit")}
        >
          Enregistrer
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ borderRadius: 2 }}
          onClick={() => {
            dispatch(openNewContactDialog());
          }}
        >
          Ajouter un nouveau contact
        </Button>
      </div>
      <ContactDialog />
    </div>
  );
}

export default InformationTab;
