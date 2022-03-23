import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField
} from "@mui/material";

const status = [
  {
    id: 1,
    value: "A prévoir",
    label: "A prévoir"
  },
  {
    id: 2,
    value: "A faire",
    label: "A faire"
  },
  {
    id: 3,
    value: "Fait",
    label: "Fait"
  },
  {
    id: 4,
    value: "Archivé",
    label: "Archivé"
  }
];

const folders = [
  {
    id: 1,
    value: "Tous",
    label: "Tous"
  },
  {
    id: 2,
    value: "Adhoc",
    label: "Adhoc"
  },
  {
    id: 2,
    value: "COHEN shirly",
    label: "COHEN shirly"
  }
];
export default function Filters() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  return (
    <div className="bgm-10 flex items-center">
      <Autocomplete
        className="w-full sm:w-320 mx-16"
        disablePortal
        style={{ color: "#FFFFFF" }}
        options={folders}
        renderInput={(params) => (
          <TextField
            style={{ color: "#FFFFFF" }}
            {...params}
            label="Dossiers"
            InputLabelProps={{ style: { color: "#FFFFFF" } }}
          />
        )}
      />
      <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
        <InputLabel style={{ color: "#FFFFFF" }}>Status</InputLabel>
        <Select
          label="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {status.map((category) => (
            <MenuItem value={category.value} key={category.id}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
