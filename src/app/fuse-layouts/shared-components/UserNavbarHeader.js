import { useSelector } from "react-redux";
import { getFormattedDateTime } from "app/main/common/functions/getFormattedDateTime";

//material-ui
import { AppBar, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  "& .username, & .email": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    })
  },

  "& .avatar": {
    background: theme.palette.background.default,
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    }),
    bottom: 0,
    "& > img": {
      borderRadius: "50%"
    }
  }
}));

function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <StyledAppBar
      position="static"
      color="primary"
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
    >
      <Typography
        className="username text-18 whitespace-nowrap font-semibold mb-4"
        color="inherit"
      >
        {user.data?.first_name + " " + user.data?.last_name}
      </Typography>
      <Typography
        className="email text-13 opacity-50 whitespace-nowrap font-medium text-center"
        color="inherit"
      >
        Dernière connexion : <br />
        {getFormattedDateTime({
          date: user.data.last_login,
          format: "DD-MM-YYYY HH:mm:ss"
        })}
      </Typography>
      <div className="flex items-center justify-center absolute bottom-0 -mb-44">
        <Avatar
          className="avatar w-72 h-72 p-8 box-content"
          alt="user photo"
          src={user.data.profile}
        />
      </div>
    </StyledAppBar>
  );
}

export default UserNavbarHeader;
