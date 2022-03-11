import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Types from "app/main/constants/Types";
import Statut from "app/main/constants/Statut";
import { getDossiers } from "app/store/slices/dossiersSlice";

//material-ui
import { FormControl, TextField, Autocomplete } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { DesktopDatePicker, MobileDatePicker } from "@mui/lab";

export default function Filters() {
  const dispatch = useDispatch();
  const { natures, procedures } = useSelector(({ dossiers }) => dossiers);
  const [allFields, setAllFields] = useState({
    procedure: "",
    inputProcedure: "",
    type: "",
    inputType: "",
    status: "",
    inputStatus: "",
    nature: "",
    inputNature: "",
    dateOfCreation: null,
    tags: "",
  });
  return (
    <div className="bgm-10 for-res-flex-direction for-full-screen">
      <div className="row items-center">
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={procedures}
            getOptionLabel={(option) => {
              return option.procedure_type;
            }}
            onChange={(event, newValue) => {
              const typeObj = procedures.find(
                (type) => type.id === newValue?.id
              );
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, procedure: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  procedure: newValue.inputValue,
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  procedure: "",
                });
              } else {
                setAllFields({
                  ...allFields,
                  procedure: typeObj?.id,
                });
              }
              dispatch(
                getDossiers({ ...allFields, procedure: typeObj?.id || "" })
              );
            }}
            inputValue={allFields.inputProcedure}
            onInputChange={(event, newInputValue) => {
              setAllFields({ ...allFields, inputProcedure: newInputValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Procédure" />
            )}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={Types}
            getOptionLabel={(option) => {
              return option.value;
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, type: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  type: newValue.inputValue,
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  type: "",
                });
              } else {
                setAllFields({
                  ...allFields,
                  type: newValue?.value,
                });
              }
              dispatch(
                getDossiers({ ...allFields, type: newValue?.value || "" })
              );
            }}
            inputValue={allFields.inputType}
            onInputChange={(event, newInputValue) => {
              setAllFields({ ...allFields, inputType: newInputValue });
            }}
            renderInput={(params) => <TextField {...params} label="Type" />}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={Statut}
            getOptionLabel={(option) => {
              return option.value;
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, status: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  status: newValue.inputValue,
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  status: "",
                });
              } else {
                setAllFields({
                  ...allFields,
                  status: newValue.value,
                });
              }
              dispatch(
                getDossiers({ ...allFields, status: newValue?.value || "" })
              );
            }}
            inputValue={allFields.inputStatus}
            onInputChange={(event, newInputValue) => {
              setAllFields({ ...allFields, inputStatus: newInputValue });
            }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={natures}
            getOptionLabel={(option) => {
              return option.nature_title;
            }}
            onChange={(event, newValue) => {
              const natureObj = natures.find(
                (type) => type.id === newValue?.id
              );
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, nature: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  nature: newValue.inputValue,
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  nature: "",
                });
              } else {
                setAllFields({
                  ...allFields,
                  nature: natureObj?.id,
                });
              }
              dispatch(
                getDossiers({ ...allFields, nature: natureObj?.id || "" })
              );
            }}
            inputValue={allFields.inputNature}
            onInputChange={(event, newInputValue) => {
              setAllFields({ ...allFields, inputNature: newInputValue });
            }}
            renderInput={(params) => <TextField {...params} label="Nature" />}
          />
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full for-date" variant="outlined">
            <MobileDatePicker
              label="Date de création"
              showToolbar={false}
              clearable={true}
              value={allFields.dateOfCreation}
              onChange={(newValue) => {
                setAllFields({ ...allFields, dateOfCreation: newValue });
                dispatch(
                  getDossiers({ ...allFields, dateOfCreation: newValue })
                );
              }}
              renderInput={(params) => (
                <TextField
                  InputLabelProps={{ style: { color: "#FFFFFF" } }}
                  className="w-full"
                  {...params}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <TextField
              value={allFields.tags}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  tags: e.target.value ? [e.target.value] : "",
                });
                dispatch(
                  getDossiers({
                    ...allFields,
                    tags: e.target.value ? [e.target.value] : "",
                  })
                );
              }}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              style={{ color: "#FFFFFF" }}
              className=""
              label="Tags"
              variant="outlined"
              fullWidth
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
