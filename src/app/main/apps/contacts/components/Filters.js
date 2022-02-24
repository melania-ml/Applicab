import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Icon,
  InputAdornment,
  TextField,
  Autocomplete
} from "@mui/material";
import { getContacts } from "../store/contactsSlice";

const status = [
  {
    id: 1,
    value: "Actif",
    label: "Actif"
  },
  {
    id: 2,
    value: "Inactif",
    label: "Inactif"
  }
];

export default function Filters() {
  const dispatch = useDispatch();
  const titles = useSelector(({ contactsApp }) => contactsApp.contacts.titles);
  const types = useSelector(({ contactsApp }) => contactsApp.contacts.types);
  const [allFields, setAllFields] = useState({
    type: "",
    inputType: "",
    title: "",
    status: "",
    tags: ""
  });
  return (
    <div className="bgm-10 for-full-screen">
      <div className="row items-center">
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <Autocomplete
            style={{ color: "#FFFFFF" }}
            options={types}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.client_type;
            }}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, client_type: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  client_type: newValue.inputValue
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  client_type: ""
                });
              } else {
                setAllFields({
                  ...allFields,
                  client_type: newValue.client_type
                });
              }
              const typeObj = types.find(
                (type) => type.client_type === newValue?.client_type
              );
              dispatch(getContacts({ ...allFields, type: typeObj?.id || "" }));
            }}
            inputValue={allFields.inputType}
            onInputChange={(event, newInputValue) => {
              setAllFields({ ...allFields, inputType: newInputValue });
            }}
            renderInput={(params) => (
              <TextField
                style={{ color: "#FFFFFF" }}
                {...params}
                label="Type"
              />
            )}
          />
          {/* <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Type</InputLabel>
            <Select
              label="Type"
              onChange={(e) => {
                const typeObj = types.find(
                  (type) => type.client_type === e.target.value
                );
                setAllFields({ ...allFields, type: typeObj.id });
                dispatch(getContacts({ ...allFields, type: typeObj.id }));
              }}
              endAdornment={
                allFields.type && (
                  <InputAdornment position="end">
                    <Icon
                      className="mr-10"
                      style={{ color: "white", cursor: "pointer" }}
                      size={20}
                      onClick={() => {
                        setAllFields({ ...allFields, type: "" });
                        dispatch(getContacts({ ...allFields, type: "" }));
                      }}
                    >
                      close
                    </Icon>
                  </InputAdornment>
                )
              }
              MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            >
              {types.map((type) => (
                <MenuItem value={type.client_type} key={type.id}>
                  {type.client_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </div>
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Titre</InputLabel>
            <Select
              label="Titre"
              //value={allFields.title}
              onChange={(e) => {
                const titleObj = titles.find(
                  (title) => title.title === e.target.value
                );
                setAllFields({ ...allFields, title: titleObj.id });
                dispatch(getContacts({ ...allFields, title: titleObj.id }));
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            >
              {titles.map((title) => (
                <MenuItem value={title.title} key={title.id}>
                  {title.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Status</InputLabel>
            <Select
              label="Status"
              value={allFields.status}
              onChange={(e) => {
                setAllFields({ ...allFields, status: e.target.value });
                dispatch(getContacts({ ...allFields, status: e.target.value }));
              }}
            >
              {status.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <TextField
              value={allFields.tags}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              style={{ color: "#FFFFFF" }}
              className=""
              label="Tags"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setAllFields({ ...allFields, tags: [e.target.value] });
                dispatch(
                  getContacts({
                    ...allFields,
                    tags: e.target.value ? [e.target.value] : ""
                  })
                );
              }}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
}
