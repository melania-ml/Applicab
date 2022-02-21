import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setContactsUnstarred, setContactsStarred, removeContacts } from '../store/etapesSlice';
import DeleteConfirmation from './DeleteConfirmation'

function EtapesMultiSelectMenu(props) {
  const dispatch = useDispatch();
  const { selectedContactIds } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  function openSelectedContactMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeSelectedContactsMenu() {
    setAnchorEl(null);
  }

  function handleClose() {
    setDeleteConfirmation(false)
  }

  return (
    <>
      <IconButton
        className="p-0"
        aria-owns={anchorEl ? 'selectedContactsMenu' : null}
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
              //dispatch(removeContacts(selectedContactIds));
              closeSelectedContactsMenu();
              setDeleteConfirmation(true)
            }}
          >
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Supprimer" />
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteConfirmation open={deleteConfirmation} onClose={handleClose} />
    </>
  );
}

export default EtapesMultiSelectMenu;
