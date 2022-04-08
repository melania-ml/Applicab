import { useState } from "react";
import Statut from "app/main/constants/Statut";

//material-ui
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Button
} from "@mui/material";

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
    <div className="bgm-10 flex items-center justify-between w-full">
      <div className="flex">
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
            {Statut.map((category) => (
              <MenuItem value={category.value} key={category.id}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* <div className="flex items-center mr-16">
        <Button
          variant="contained"
          color="secondary"
          className="w-full rounded"
        >
          To do's
        </Button>
      </div> */}
    </div>
  );
}
