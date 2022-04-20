import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "app/store";
import { logoutUser } from "app/auth/store/userSlice";
import { getProfileData } from "app/store/slices/userMenuSlice";
import EditProfileDialog from "./EditProfileDialog";

//material-ui
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover
} from "@mui/material";

function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const [userMenu, setUserMenu] = useState(null);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const handleClose = () => {
    setIsEditProfile(false);
  };

  const handleEditProfile = async () => {
    await dispatch(getProfileData(user.data.id));
    setIsEditProfile(true);
    userMenuClose();
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        {user.data.profile && (
          <Avatar
            className="md:mx-4"
            alt="user photo"
            src={user.data.profile}
          />
        )}
      </Button>
      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: "py-8"
        }}
      >
        <MenuItem onClick={handleEditProfile} role="button">
          <ListItemIcon className="min-w-40">
            <Icon>edit</Icon>
          </ListItemIcon>
          <ListItemText primary="Mon compte" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logoutUser());
            userMenuClose();
          }}
          role="button"
        >
          <ListItemIcon className="min-w-40">
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </MenuItem>
      </Popover>
      <EditProfileDialog open={isEditProfile} onClose={handleClose} />
    </>
  );
}

export default withReducer("userMenu", reducer)(UserMenu);
