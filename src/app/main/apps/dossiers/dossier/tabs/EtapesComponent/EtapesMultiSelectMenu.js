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
import {
  updateStatus,
  duplicateEtape,
  removeEtapes
} from "app/store/slices/dossiersSlice";

function EtapesMultiSelectMenu(props) {
  const dispatch = useDispatch();

  const { selectedEtapes } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  function openSelectedContactMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedEtapesMenu() {
    setAnchorEl(null);
  }

  function handleClose() {
    setDeleteConfirmation(false);
  }

  const handleDeleteEtape = () => {
    dispatch(removeEtapes(selectedEtapes));
  };

  const updateBulkStatus = (status) => {
    dispatch(updateStatus({ selectedEtapes, status }));
    closeSelectedEtapesMenu();
  };

  const duplicateBulkEtape = () => {
    dispatch(duplicateEtape(selectedEtapes));
    closeSelectedEtapesMenu();
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
        onClose={closeSelectedEtapesMenu}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              closeSelectedEtapesMenu();
              setDeleteConfirmation(true);
            }}
          >
            <div className="flex items-center w-full">
              <ListItemIcon className="min-w-40">
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText primary="Supprimer" />
            </div>
          </MenuItem>
          <MenuItem onClick={duplicateBulkEtape}>
            <div className="flex items-center w-full">
              <ListItemIcon className="min-w-40">
                <Icon style={{ fontSize: "large" }}>content_copy</Icon>
              </ListItemIcon>
              <ListItemText primary="Dupliquer" />
            </div>
          </MenuItem>
          <MenuItem onClick={() => updateBulkStatus("A prévoir")}>
            <div className="flex items-center w-full">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#C4C4C4",
                    fontSize: "large"
                  }}
                >
                  label
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Marquer comme à prévoir" />
            </div>
          </MenuItem>
          <MenuItem onClick={() => updateBulkStatus("A faire")}>
            <div className="flex items-center w-full">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#1BD7EF",
                    fontSize: "large"
                  }}
                >
                  label
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Marquer comme a faire" />
            </div>
          </MenuItem>
          <MenuItem onClick={() => updateBulkStatus("Fait")}>
            <div className="flex items-center w-full">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#78C5A0",
                    fontSize: "large"
                  }}
                >
                  label
                </Icon>
              </ListItemIcon>
              <ListItemText primary="Marquer comme fait" />
            </div>
          </MenuItem>
          <MenuItem onClick={() => updateBulkStatus("Archivé")}>
            <div className="flex items-center w-full">
              <ListItemIcon className="min-w-40">
                <Icon
                  style={{
                    color: "#E5E5E5",
                    fontSize: "large"
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
        onDelete={handleDeleteEtape}
        subTitle={"Voulez-vous vraiment supprimer cette étape du dossier ?"}
      />
    </>
  );
}

export default EtapesMultiSelectMenu;
