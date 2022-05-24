import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fr } from "date-fns/locale";
import Types from "app/main/constants/Types";
import CaseStatus from "app/main/constants/CaseStatus";
import { getDossiers } from "app/store/slices/dossiersSlice";

//material-ui
import { FormControl, TextField, Autocomplete, Icon } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DesktopDatePicker } from "@mui/lab";

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
    tags: ""
  });

  const handleRemoveDate = () => {
    setAllFields({ ...allFields, dateOfCreation: null });
    dispatch(getDossiers({ ...allFields, dateOfCreation: null }));
  };

  return (
    <div className="bgm-10 for-res-flex-direction for-full-screen">
      <div className="row items-center">
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={procedures}
            getOptionLabel={(option) => {
              return option?.procedure_type;
            }}
            onChange={(event, newValue) => {
              const typeObj = procedures.find(
                (type) => type?.id === newValue?.id
              );
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, procedure: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  procedure: newValue.inputValue
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  procedure: ""
                });
              } else {
                setAllFields({
                  ...allFields,
                  procedure: typeObj?.id
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
                  type: newValue.inputValue
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  type: ""
                });
              } else {
                setAllFields({
                  ...allFields,
                  type: newValue?.value
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
            options={CaseStatus}
            getOptionLabel={(option) => {
              return option.value;
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, status: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  status: newValue.inputValue
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  status: ""
                });
              } else {
                setAllFields({
                  ...allFields,
                  status: newValue.value
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
            renderInput={(params) => <TextField {...params} label="Statut" />}
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
                (type) => type?.id === newValue?.id
              );
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, nature: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  nature: newValue.inputValue
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  nature: ""
                });
              } else {
                setAllFields({
                  ...allFields,
                  nature: natureObj?.id
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
        <div
          className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0"
          onKeyDownCapture={(e) => e.preventDefault()}
        >
          <FormControl className="w-full for-date" variant="outlined">
            <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date de création"
                value={allFields.dateOfCreation}
                inputFormat={"dd/MM/yyyy"}
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
              {allFields.dateOfCreation && (
                <Icon
                  style={{
                    fontSize: "large",
                    position: "absolute",
                    right: 35,
                    top: 16,
                    color: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={handleRemoveDate}
                >
                  clear
                </Icon>
              )}
            </LocalizationProvider>
          </FormControl>
        </div>
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <TextField
              value={allFields.tags}
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  tags: e.target.value ? [e.target.value] : ""
                });
                dispatch(
                  getDossiers({
                    ...allFields,
                    tags: e.target.value ? [e.target.value] : ""
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
