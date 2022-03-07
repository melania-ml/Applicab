import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete
} from "@mui/material";
import { useSelector } from "react-redux";
import DatePicker from "@mui/lab/DatePicker";

import Natures from "app/main/constants/Natures";
import Types from "app/main/constants/Types";
import Procedures from "app/main/constants/Procedures";

const status = [
  {
    id: 1,
    value: "A ouvrir",
    label: "A ouvrir"
  },
  {
    id: 2,
    value: "Ouvert",
    label: "Ouvert"
  },
  {
    id: 3,
    value: "Clôturé",
    label: "Clôturé"
  }
];

export default function Filters() {
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
  return (
    <div className="bgm-10 for-res-flex-direction for-full-screen">
      <div className="row items-center">
        <div className="col-md-4 col-lg-4 col-12 col-xl-2 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={procedures}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.procedure_type;
            }}
            onChange={(event, newValue) => {
              const typeObj = procedures.find(
                (type) => type.value === newValue?.value
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
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.value;
            }}
            onChange={(event, newValue) => {
              const typeObj = Types.find(
                (type) => type.value === newValue?.value
              );
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
                  type: typeObj?.id
                });
              }
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
            options={status}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.value;
            }}
            onChange={(event, newValue) => {
              const typeObj = status.find(
                (type) => type.value === newValue?.value
              );
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
                  status: typeObj?.id
                });
              }
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
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.nature_title;
            }}
            onChange={(event, newValue) => {
              const typeObj = natures.find(
                (type) => type.value === newValue?.value
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
                  nature: typeObj?.id
                });
              }
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
            <DatePicker
              label="Date de création"
              value={allFields.dateOfCreation}
              onChange={(newValue) => {
                setAllFields({ ...allFields, dateOfCreation: newValue });
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
              onChange={(e) =>
                setAllFields({ ...allFields, tags: e.target.value })
              }
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
