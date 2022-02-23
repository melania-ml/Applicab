import { useState } from "react";
import Icon from "@mui/material/Icon";
import { Button, Input, Paper, Menu, MenuItem } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import {
  setContactsSearchText,
  openNewContactDialog
} from "../store/contactsSlice";
import Filters from "./Filters";

function ContactsHeader(props) {
  const [moreMenuEl, setMoreMenuEl] = useState(null);
  const dispatch = useDispatch();
  const searchText = useSelector(
    ({ contactsApp }) => contactsApp.contacts.searchText
  );
  const mainTheme = useSelector(selectMainTheme);
  const contacts = useSelector(
    ({ contactsApp }) => contactsApp.contacts.contacts
  );

  const exportContacts = () => {
    let rows = [
      [
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
        "Name",
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
      ]
    ];
    for (let i = 0; i < contacts.length; i++) {
      let _tempRow = [];
      _tempRow.push(contacts[i].user_type);
      _tempRow.push(contacts[i].legal_status);
      _tempRow.push(contacts[i].title?.title);
      _tempRow.push(contacts[i].company_name);
      _tempRow.push(contacts[i].country);
      _tempRow.push(contacts[i].address);
      _tempRow.push(contacts[i].city);
      _tempRow.push(contacts[i].capital_social);
      _tempRow.push(contacts[i].RCS_city);
      _tempRow.push(contacts[i].number);
      _tempRow.push(contacts[i].name);
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
      rows.push(_tempRow);
    }
    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `contacts.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  const onFileUpload = (e) => {
    console.log("data", e.target.files[0]);
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
            <MenuItem
              onClick={() => {
                setMoreMenuEl(null);
                exportContacts();
              }}
            >
              <img
                className="mr-3"
                src="assets/icons/custom-svgs/export.svg"
                alt="export"
              />
              Exporter contacts
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
              dispatch(dispatch(openNewContactDialog()));
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
