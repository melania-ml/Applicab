import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import {
  setContactsSearchText,
  openNewContactDialog,
  importContacts
} from "app/store/slices/contactsSlice";
import Filters from "./Filters";
import { CSVLink } from "react-csv";

//material-ui
import { Icon, Button, Input, Paper, Menu, MenuItem } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function ContactsHeader() {
  const [moreMenuEl, setMoreMenuEl] = useState(null);
  const dispatch = useDispatch();
  const { searchText, contacts } = useSelector(({ contacts }) => contacts);
  const mainTheme = useSelector(selectMainTheme);
  let csvData = [];
  for (let i = 0; i < contacts.length; i++) {
    let _tempRow = [];
    _tempRow.push(contacts[i].client_type.client_type);
    _tempRow.push(contacts[i].legal_status);
    _tempRow.push(contacts[i].title?.title);
    _tempRow.push(contacts[i].company_name);
    _tempRow.push(contacts[i].country);
    _tempRow.push(contacts[i].address);
    _tempRow.push(contacts[i].city);
    _tempRow.push(contacts[i].capital_social);
    _tempRow.push(contacts[i].RCS_city);
    _tempRow.push(contacts[i].number);
    _tempRow.push(contacts[i].last_name);
    _tempRow.push(contacts[i].first_name);
    _tempRow.push(contacts[i].email);
    _tempRow.push(contacts[i].phone_number);
    _tempRow.push(contacts[i].fixe);
    _tempRow.push(contacts[i].comments);
    _tempRow.push(contacts[i].date_of_birth);
    _tempRow.push(contacts[i].nationality);
    _tempRow.push(contacts[i].native_city);
    _tempRow.push(contacts[i].department);
    _tempRow.push(contacts[i].profession);
    _tempRow.push(contacts[i].civil_status);
    csvData.push(_tempRow);
  }
  const headers = [
    "Type",
    "Legal Status",
    "Title",
    "Company Name",
    "Country",
    "Address",
    "City",
    "Capital Social",
    "RCS City",
    "Number",
    "Last Name",
    "First Name",
    "Email",
    "Mobile",
    "Fixe",
    "Comments",
    "DOB",
    "Nationality",
    "Native City",
    "Department",
    "Profession",
    "Civil Status"
  ];

  const onFileUpload = (e) => {
    const formData = new FormData();
    formData.append("csv", e.target.files[0]);
    dispatch(importContacts(formData));
  };

  return (
    <div className="flex-1 items-center justify-between p-4 for-full-scren-flex">
      <Filters />
      <div className="flex for-res-flex-direction full-screen-secondwidth">
        <div className="flex flex-1 items-center mb-3 mb-xl-0 full-screen-justify-end">
          <ThemeProvider theme={mainTheme}>
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex p-4 items-center search-bar-contact h-48 px-16 py-4 shadow"
            >
              <Icon color="action">search</Icon>

              <Input
                placeholder="Recherche"
                className="flex flex-1 px-16"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search"
                }}
                onChange={(ev) => dispatch(setContactsSearchText(ev))}
              />
            </Paper>
          </ThemeProvider>
        </div>
        <div className="mr-md-5 mr-0 mb-3 mb-md-0 flex items-center">
          <Button
            onClick={(e) => setMoreMenuEl(e.currentTarget)}
            variant="outlined"
            style={{ borderRadius: 0 }}
            color="secondary"
            className="w-full"
          >
            Plus d'actions
          </Button>
          <Menu
            id="chats-more-menu"
            anchorEl={moreMenuEl}
            open={Boolean(moreMenuEl)}
            onClose={() => setMoreMenuEl(null)}
          >
            <label htmlFor="raised-button-file">
              <MenuItem onClick={() => setMoreMenuEl(null)}>
                <img
                  className="mr-3"
                  src="assets/icons/custom-svgs/import.svg"
                  alt="import"
                />
                Importer contacts
              </MenuItem>
            </label>
            <MenuItem>
              <CSVLink
                data={csvData}
                style={{ color: "#fff", display: "contents" }}
                headers={headers}
                filename="contacts.csv"
              >
                <img
                  className="mr-3"
                  src="assets/icons/custom-svgs/export.svg"
                  alt="export"
                />
                Exporter contacts
              </CSVLink>
            </MenuItem>
          </Menu>
          <input
            accept=".xlsx, .xls, .csv"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={onFileUpload}
          />
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              dispatch(openNewContactDialog());
            }}
            variant="contained"
            color="secondary"
            className="w-full rounded"
          >
            Nouveau contact
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactsHeader;
