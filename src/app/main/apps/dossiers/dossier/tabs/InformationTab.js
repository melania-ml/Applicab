import { useEffect, useState } from "react";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Button,
} from "@mui/material";
import Natures from "../../../../constants/Natures";
import Statut from "../../../../constants/Statut";
import Procedures from "../../../../constants/Procedures";
import Types from "../../../../constants/Types";
import { useSelector } from "react-redux";

const tags = [];
function InformationTab(props) {
  const { userData } = useSelector(({ userMenu }) => userMenu.userMenu);
  console.log("userData: ", userData);
  const [allFields, setAllFields] = useState({
    name: "",
    nature: "",
    statut: "",
    type: "",
    tags: [],
    internalComments: "",
    sharedWithClientComments: "",
  });
  useEffect(() => {
    setAllFields({
      ...allFields,
      name: userData.name,
      nature: userData.nature,
      statut: userData.statut,
      type: userData.type,
      tags: userData.tags,
      internalComments: userData.internalComments,
      sharedWithClientComments: userData.sharedWithClientComments,
    });
  }, [userData]);

  return (
    <div>
      <TextField
        className="mt-8 mb-16"
        value={allFields.name}
        onChange={(e) => {
          setAllFields({
            ...allFields,
            name: e.target.value,
          });
        }}
        label="Nom"
        autoFocus
        variant="outlined"
        fullWidth
      />
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Nature</InputLabel>
        <Select
          label="Nature"
          value={allFields.nature}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              nature: e.target.value,
            });
          }}
        >
          {Natures.map((nature) => (
            <MenuItem value={nature.value} key={nature.id}>
              {nature.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Statut</InputLabel>
        <Select
          label="Statut"
          value={userData.statut}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              statut: e.target.value,
            });
          }}
        >
          {Statut.map((statut) => (
            <MenuItem value={statut.value} key={statut.id}>
              {statut.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          value={allFields.type}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              type: e.target.value,
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
        <InputLabel>Procédure</InputLabel>
        <Select
          label="Procédure"
          value={allFields.procedure}
          onChange={(e) => {
            setAllFields({
              ...allFields,
              procedure: e.target.value,
            });
          }}
        >
          {Procedures.map((procedure) => (
            <MenuItem value={procedure.value} key={procedure.id}>
              {procedure.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="mt-8 mb-16"
        label="Lieu"
        autoFocus
        variant="outlined"
        fullWidth
      />
      <Autocomplete
        className="w-full mb-12"
        multiple
        freeSolo
        onChange={(e, newValue) => {
          setAllFields({
            ...allFields,
            ...tags,
            tags: e.target.value,
            ...newValue.filter((option) => tags.indexOf(option) === -1),
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
        value={allFields.internalComments}
        onChange={(e) => {
          setAllFields({
            ...allFields,
            internalComments: e.target.value,
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
        value={allFields.sharedWithClientComments}
        onChange={(e) => {
          setAllFields({
            ...allFields,
            sharedWithClientComments: e.target.value,
          });
        }}
      />
      <div className="mb-10">
        <b>Ajouter un client au dossier</b>
      </div>
      <Autocomplete
        className="w-full mb-12"
        multiple
        freeSolo
        onChange={(e, newValue) => {
          setAllFields({
            ...allFields,
            ...tags,
            tags: e.target.value,
            ...newValue.filter((option) => tags.indexOf(option) === -1),
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
          <TextField {...params} label="Choisissez un client" />
        )}
      />
      <div className="mb-10">
        <b>Ajouter un contact client au dossier</b>
      </div>
      <Autocomplete
        className="w-full mb-12"
        multiple
        freeSolo
        onChange={(e, newValue) => {
          setAllFields({
            ...allFields,
            ...tags,
            tags: e.target.value,
            ...newValue.filter((option) => tags.indexOf(option) === -1),
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
          <TextField {...params} label="Choisissez un contact" />
        )}
      />
      <div className="mb-10">
        <b>Ajouter un contact adverse au dossier</b>
      </div>
      <Autocomplete
        className="w-full mb-10"
        multiple
        freeSolo
        onChange={(e, newValue) => {
          setAllFields({
            ...allFields,
            ...tags,
            tags: e.target.value,
            ...newValue.filter((option) => tags.indexOf(option) === -1),
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
          <TextField {...params} label="Choisissez un contact" />
        )}
      />
      <br />
      <Button
        className="whitespace-nowrap mx-1"
        variant="contained"
        color="secondary"
        style={{ borderRadius: 2 }}
        // disabled={_.isEmpty(dirtyFields) || !isValid}
        // onClick={handleSaveProduct}
      >
        Ajouter un nouveau contact
      </Button>
      <br />
      <b />
      <br />
      <br />
    </div>
  );
}

export default InformationTab;
