import { useState } from "react";
import Types from "../../../constants/Types";
import Titles from "../../../constants/Titles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material";

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
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  return (
    <div className="bgm-10">
      <div className="row">
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <InputLabel style={{ color: "#FFFFFF" }}>Type</InputLabel>
            <Select
              label="Type"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
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
              {Titles.map((title) => (
                <MenuItem value={title.value} key={title.id}>
                  {title.label}
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
        <div className="col-md-3 col-lg-3 col-12 col-xl-3 mb-3 mb-xl-0">
          <FormControl className="w-full" variant="outlined">
            <TextField
              // {...field}
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              style={{ color: "#FFFFFF" }}
              className="mb-12"
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
