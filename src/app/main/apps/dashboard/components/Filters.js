import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Statut from "app/main/constants/Statut";
import { getDossiers } from "app/store/slices/dossiersSlice";

//material-ui
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField
} from "@mui/material";

export default function Filters() {
  const [status, setStatus] = useState("");
  const [dossier, setDossier] = useState("");
  const { dossiers } = useSelector(({ dossiers }) => dossiers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDossiers());
  }, []);

  return (
    <div className="bgm-10 flex items-center justify-between w-full">
      <div className="flex">
        <Autocomplete
          className="w-full sm:w-320 mx-16 autocomplete"
          options={dossiers}
          getOptionLabel={(option) => {
            return option.case_name;
          }}
          inputValue={dossier}
          onInputChange={(event, newInputValue) => {
            setDossier(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Dossiers" />}
        />
        <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
          <InputLabel style={{ color: "#FFFFFF" }}>Status</InputLabel>
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {Statut.map((category) => (
              <MenuItem value={category.value} key={category.id}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
