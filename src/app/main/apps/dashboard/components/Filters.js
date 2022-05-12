import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Statut from "app/main/constants/Statut";
import { getDossiers } from "app/store/slices/dossiersSlice";
import { getCalendarData } from "app/store/slices/dashboardSlice";

//material-ui
import { Autocomplete, TextField } from "@mui/material";

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
          onChange={(event, newValue) => {
            const caseObj = dossiers.find((type) => type?.id === newValue?.id);
            if (typeof newValue === "string") {
              setDossier(newValue);
            } else if (newValue && newValue.inputValue) {
              setDossier(newValue.inputValue);
            } else if (!newValue) {
              setDossier("");
            } else {
              setDossier(caseObj?.id);
            }
            dispatch(
              getCalendarData({
                case_management_id: caseObj?.id,
                status: status
              })
            );
          }}
          renderInput={(params) => <TextField {...params} label="Dossiers" />}
        />
        <Autocomplete
          className="w-full sm:w-320 mx-16 autocomplete"
          options={Statut}
          getOptionLabel={(option) => {
            return option.value;
          }}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setStatus(newValue);
            } else if (newValue && newValue.inputValue) {
              setStatus(newValue.inputValue);
            } else if (!newValue) {
              setStatus("");
            } else {
              setStatus(newValue.value);
            }
            dispatch(
              getCalendarData({
                case_management_id: dossier,
                status: newValue?.value
              })
            );
          }}
          renderInput={(params) => <TextField {...params} label="Status" />}
        />
      </div>
    </div>
  );
}
