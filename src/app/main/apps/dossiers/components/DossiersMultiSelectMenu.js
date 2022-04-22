import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCase } from "app/store/slices/dossiersSlice";
import { DeleteConfirmationDialog } from "app/main/common/components";

//material-ui
import {
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList
} from "@mui/material";

function DossiersMultiSelectMenu(props) {
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

  const deleteDossier = () => {
    dispatch(deleteCase(selectedContactIds));
  };

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
            onClick={() => {
              closeSelectedContactsMenu();
              setDeleteConfirmation(true);
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Supprimer" />
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteConfirmationDialog
        open={deleteConfirmation}
        onClose={handleClose}
        onDelete={deleteDossier}
        title={"Voulez-vous vraiment supprimer ce dossier ?"}
        subTitle={
          "TOUTES LES ÉTAPES, MESSAGES, DOCUMENTS ET NOTIFICATIONS SERONT EFFACÉS."
        }
      />
    </>
  );
}

export default DossiersMultiSelectMenu;
