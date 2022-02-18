import { useState } from "react";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Button,
  IconButton,
  Icon
} from "@mui/material";
import Natures from "../../../../constants/Natures";
import CaseStatus from "../../../../constants/CaseStatus";
import Procedures from "../../../../constants/Procedures";
import Types from "../../../../constants/Types";
import Clients from "../../../../constants/Clients";

function InformationTab(props) {
  const [name, setName] = useState("");
  const [nature, setNature] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [type, setType] = useState("");
  const [procedure, setProcedure] = useState("");
  const [tags, setTags] = useState([]);
  const [internalComments, setInternalComments] = useState("");
  const [sharedWithClientComments, setSharedWithClientComments] = useState("");
  const [client, setClient] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactQuality, setContactQuality] = useState("");
  const [oppositeContactName, setOppositeContactName] = useState("");
  const [oppositeContactQuality, setOppositeContactQuality] = useState("");
  const tagsArr = [];
  return (
    <div>
      <TextField
        className="mt-8 mb-16"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Nom"
        autoFocus
        variant="outlined"
        fullWidth
      />
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Nature</InputLabel>
        <Select
          label="Nature"
          value={nature}
          onChange={(e) => setNature(e.target.value)}
        >
          {Natures.map((nature) => (
            <MenuItem value={nature.value} key={nature.id}>
              {nature.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton>
          <Icon>add_box</Icon>
        </IconButton>
      </FormControl>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Statut</InputLabel>
        <Select
          label="Statut"
          value={caseStatus}
          onChange={(e) => setCaseStatus(e.target.value)}
        >
          {CaseStatus.map((status) => (
            <MenuItem value={status.value} key={status.id}>
              {status.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <div style={{ height: 300, maxHeight: 300 }}>
            {Types.map((type) => (
              <MenuItem value={type.value} key={type.id}>
                {type.label}
              </MenuItem>
            ))}
          </div>
        </Select>
      </FormControl>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Procédure</InputLabel>
        <Select
          label="Procédure"
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
        >
          {Procedures.map((procedure) => (
            <MenuItem value={procedure.value} key={procedure.id}>
              {procedure.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton>
          <Icon>add_box</Icon>
        </IconButton>
      </FormControl>
      <Autocomplete
        className="w-full mb-12"
        multiple
        freeSolo
        onChange={(event, newValue) => {
          setTags([
            ...tags,
            ...newValue.filter((option) => tags.indexOf(option) === -1)
          ]);
        }}
        options={tagsArr}
        getOptionLabel={(option) => option.title}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              disabled={tagsArr.indexOf(option) !== -1}
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
        value={internalComments}
        onChange={(e) => setInternalComments(e.target.value)}
      />
      <TextField
        className="mb-12"
        label="Commentaire partagé avec le client"
        variant="outlined"
        multiline
        rows={5}
        fullWidth
        value={sharedWithClientComments}
        onChange={(e) => setSharedWithClientComments(e.target.value)}
      />
      <div className="mb-10">
        <b>Ajouter un client au dossier</b>
      </div>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Choisissez un client</InputLabel>
        <Select
          label="Choisissez un client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        >
          {Clients.map((client) => (
            <MenuItem value={client.value} key={client.id}>
              {client.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton>
          <Icon>add_box</Icon>
        </IconButton>
      </FormControl>
      <div className="mb-10">
        <b>Ajouter un contact client au dossier</b>
      </div>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Choisissez un contact</InputLabel>
        <Select
          label="Choisissez un contact"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        >
          {Clients.map((client) => (
            <MenuItem value={client.value} key={client.id}>
              {client.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton>
          <Icon>add_box</Icon>
        </IconButton>
      </FormControl>
      {/* <FormControl className="flex w-full mb-12" variant="outlined">
                <InputLabel>Choisissez une qualité</InputLabel>
                <Select
                    label="Choisissez une qualité"
                    value={contactQuality}
                    onChange={(e) => setContactQuality(e.target.value)}
                >
                    {Clients.map((client) => (
                        <MenuItem value={client.value} key={client.id}>
                            {client.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
      <div className="mb-10">
        <b>Ajouter un contact adverse au dossier</b>
      </div>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Choisissez un contact</InputLabel>
        <Select
          label="Choisissez un contact"
          value={oppositeContactName}
          onChange={(e) => setOppositeContactName(e.target.value)}
        >
          {Clients.map((client) => (
            <MenuItem value={client.value} key={client.id}>
              {client.label}
            </MenuItem>
          ))}
        </Select>
        <IconButton>
          <Icon>add_box</Icon>
        </IconButton>
      </FormControl>
      <Button
        className="whitespace-nowrap mx-4"
        variant="contained"
        color="secondary"
        style={{ borderRadius: 0 }}
        // disabled={_.isEmpty(dirtyFields) || !isValid}
        //onClick={handleSaveProduct}
      >
        Ajouter un nouveau contact
      </Button>
      <FormControl className="flex w-full mb-12" variant="outlined">
        <InputLabel>Choisissez une qualité</InputLabel>
        <Select
          label="Choisissez une qualité"
          value={oppositeContactQuality}
          onChange={(e) => setOppositeContactQuality(e.target.value)}
        >
          {Clients.map((client) => (
            <MenuItem value={client.value} key={client.id}>
              {client.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <Button
        className="whitespace-nowrap mx-4"
        variant="contained"
        color="secondary"
        style={{ borderRadius: 2 }}
        // disabled={_.isEmpty(dirtyFields) || !isValid}
        //onClick={handleSaveProduct}
      >
        Ajouter un nouveau contact
      </Button>
      <br />
      <b />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default InformationTab;
