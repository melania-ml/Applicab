import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import DeleteConfirmationDialog from "app/main/common/components/DeleteConfirmationDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import {
//   setContactsUnstarred,
//   setContactsStarred,
//   removeContacts
// } from "../store/dossiersSlice";

function EtapesMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedContactIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  function openSelectedContactMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedContactsMenu() {
    setAnchorEl(null);
  }

  function handleClose() {
    setDeleteConfirmation(false);
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? "selectedContactsMenu" : null}
        aria-haspopup="true"
        onClick={openSelectedContactMenu}
        size="large"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Menu
        id="selectedContactsMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeSelectedContactsMenu}
      >
        <MenuList>
          <MenuItem
            className="etapesListItem"
            style={{
              flexDirection: "column",
            }}
            onClick={() => {
              // dispatch(removeContacts(selectedContactIds));
              closeSelectedContactsMenu();
              setDeleteConfirmation(true);
            }}
          >
            <div className="flex items-center w-full mb-3">
              <ListItemIcon className="min-w-40">
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText primary="Supprimer" />
            </div>
            <div className="flex items-center w-full mb-3">
              <ListItemIcon className="min-w-40">
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText primary="Dupliquer" />
            </div>
            <div className="flex items-center w-full mb-3 ml-2">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#C4C4C4",
                    fontSize: "large",
                  }}
                >
                  label
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Marquer comme à prévoir" />
            </div>
            <div className="flex items-center w-full mb-3 ml-2">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#1BD7EF",
                    fontSize: "large",
                  }}
                >
                  label
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Marquer comme a faire" />
            </div>
            <div className="flex items-center w-full mb-3 ml-2">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#78C5A0",
                    fontSize: "large",
                  }}
                >
                  label
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Marquer comme fait" />
            </div>
            <div className="flex items-center w-full mb-3 ml-2">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#E5E5E5",
                    fontSize: "large",
                  }}
                >
                  label
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Marquer comme archivé" />
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteConfirmationDialog
        open={deleteConfirmation}
        onClose={handleClose}
        title={"Voulez-vous vraiment supprimer ce dossier ?"}
        subTitle={
          "TOUTES LES ÉTAPES, MESSAGES, DOCUMENTS ET NOTIFICATIONS SERONT EFFACÉS."
        }
      />
    </>
  );
}

export default EtapesMultiSelectMenu;
