import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "app/store/slices/contactsSlice";
import Status from "app/main/constants/Status";

//material-ui
import { FormControl, TextField, Autocomplete } from "@mui/material";

export default function Filters() {
  const dispatch = useDispatch();
  const { titles, types } = useSelector(({ contacts }) => contacts);

  const [allFields, setAllFields] = useState({
    type: "",
    title: "",
    status: "",
    tags: ""
  });
  return (
    <div className="bgm-10 for-full-screen">
      <div className="row items-center">
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={types}
            getOptionLabel={(option) => {
              return option.client_type;
            }}
            onChange={(event, newValue) => {
              const typeObj = types.find(
                (type) => type.client_type === newValue?.client_type
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
              dispatch(getContacts({ ...allFields, type: typeObj?.id || "" }));
            }}
            renderInput={(params) => <TextField {...params} label="Type" />}
          />
        </div>
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={titles}
            getOptionLabel={(option) => {
              return option.title;
            }}
            onChange={(event, newValue) => {
              const titleObj = titles.find(
                (type) => type.title === newValue?.title
              );
              if (typeof newValue === "string") {
                setAllFields({ ...allFields, title: newValue });
              } else if (newValue && newValue.inputValue) {
                setAllFields({
                  ...allFields,
                  title: newValue.inputValue
                });
              } else if (!newValue) {
                setAllFields({
                  ...allFields,
                  title: ""
                });
              } else {
                setAllFields({
                  ...allFields,
                  title: titleObj?.id
                });
              }
              dispatch(
                getContacts({ ...allFields, title: titleObj?.id || "" })
              );
            }}
            renderInput={(params) => <TextField {...params} label="Titre" />}
          />
        </div>
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <Autocomplete
            className="autocomplete"
            options={Status}
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
                getContacts({ ...allFields, status: newValue?.value || "" })
              );
            }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </div>
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <TextField
              value={allFields.tags}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              style={{ color: "#FFFFFF" }}
              label="Tags"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setAllFields({
                  ...allFields,
                  tags: e.target.value ? [e.target.value] : ""
                });
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
