import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import {
  setContactsSearchText,
  openNewContactDialog,
  importContacts,
  selectContacts
} from "app/store/slices/contactsSlice";
import Filters from "./Filters";
import { CSVLink } from "react-csv";

//material-ui
import { Icon, Button, Input, Paper, Menu, MenuItem } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function ContactsHeader() {
  const [moreMenuEl, setMoreMenuEl] = useState(null);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const { searchText } = useSelector(({ contacts }) => contacts);
  const mainTheme = useSelector(selectMainTheme);
  let csvData = [];
  for (let i = 0; i < contacts?.length; i++) {
    let obj = {};
    obj.client_type = contacts[i].client_type.client_type;
    obj.legal_status = contacts[i].legal_status;
    obj.title = contacts[i].title?.title;
    obj.company_name = contacts[i].company_name;
    obj.country = contacts[i].country;
    obj.address = contacts[i].address;
    obj.city = contacts[i].city;
    obj.capital_social = contacts[i].capital_social;
    obj.RCS_city = contacts[i].RCS_city;
    obj.number = contacts[i].number;
    obj.last_name = contacts[i].last_name;
    obj.first_name = contacts[i].first_name;
    obj.email = contacts[i].email;
    obj.phone_number = contacts[i].phone_number;
    obj.fixe = contacts[i].fixe;
    obj.comments = contacts[i].comments;
    obj.date_of_birth = contacts[i].date_of_birth;
    obj.nationality = contacts[i].nationality;
    obj.native_city = contacts[i].native_city;
    obj.department = contacts[i].department;
    obj.profession = contacts[i].profession;
    obj.civil_status = contacts[i].civil_status;
    csvData.push(obj);
  }
  const headers = [
    { label: "Type", key: "client_type" },
    { label: "Legal Status", key: "legal_status" },
    { label: "Title", key: "title" },
    { label: "Dénomination", key: "company_name" },
    { label: "Country", key: "country" },
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "Capital Social", key: "capital_social" },
    { label: "RCS City", key: "RCS_city" },
    { label: "Number", key: "number" },
    { label: "Last Name", key: "last_name" },
    { label: "First Name", key: "first_name" },
    { label: "Email", key: "email" },
    { label: "Mobile", key: "phone_number" },
    { label: "Fixe", key: "fixe" },
    { label: "Comments", key: "comments" },
    { label: "DOB", key: "date_of_birth" },
    { label: "Nationality", key: "nationality" },
    { label: "Native City", key: "native_city" },
    { label: "Department", key: "department" },
    { label: "Profession", key: "profession" },
    { label: "Civil Status", key: "civil_status" }
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
            className="w-full rounded linkButton"
          >
            Nouveau contact
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactsHeader;
