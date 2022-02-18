import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Types from "../../../constants/Types";
import Titles from "../../../constants/Titles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
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
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  return (
    <div className="bgm-10 for-full-screen">
      <div className="row items-center">
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Type</InputLabel>
            <Select
              label="Type"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                dispatch(
                  getContacts({ type: e.target.value, status: selectedStatus })
                );
              }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            >
              {Types.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Titre</InputLabel>
            <Select
              label="Titre"
              value={selectedTitle}
              onChange={(e) => {
                setSelectedTitle(e.target.value);
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
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                dispatch(
                  getContacts({ type: selectedType, status: e.target.value })
                );
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
              // {...field}
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
