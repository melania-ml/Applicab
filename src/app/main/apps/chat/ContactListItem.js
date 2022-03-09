import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import format from "date-fns/format";
import { Box } from "@mui/system";
import StatusIcon from "./StatusIcon";

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  ...(active && {
    backgroundColor: theme.palette.background.paper,
  }),
}));

const chattingData = [
  {
    chatId: 1,
    name: "Rony",
    avatar: "/material-ui-static/images/avatar/1.jpg",
    msg: "don't need to make changes just finish it.",
    lastMessageTime: "Il y a 2 jours",
    status: "online",
    unread: 1,
  },
  {
    chatId: 2,
    name: "Lucky",
    avatar: "/material-ui-static/images/avatar/2.jpg",
    msg: "make commit & just push it.",
    lastMessageTime: "Il y a 3 jours",
    status: "away",
    unread: 3,
  },
  {
    chatId: 3,
    name: "Alexa",
    avatar: "/material-ui-static/images/avatar/3.jpg",
    lastMessageTime: "Il y a 2 jours",
    msg: "you have to work on that.",
    status: "do-not-disturb",
    unread: 2,
  },
  {
    chatId: 4,
    name: "Jimmy",
    avatar: "/material-ui-static/images/avatar/4.jpg",
    lastMessageTime: "Il y a 3 jours",
    msg: "that is still in progress.",
    status: "online",
    unread: 5,
  },
  {
    chatId: 5,
    name: "Alex",
    avatar: "/material-ui-static/images/avatar/5.jpg",
    lastMessageTime: "Il y a 2 jours",
    msg: "wow you just got it.",
    status: "offline",
    unread: 6,
  },
  {
    chatId: 6,
    name: "Roman",
    avatar: "/material-ui-static/images/avatar/6.jpg",
    lastMessageTime: "Il y a 3 jours",
    msg: "Hurry up it's gonna end up today.",
    status: "online",
    unread: 11,
  },
];
function ContactListItem(props) {
  return chattingData.map((chatData) => (
    <StyledListItem
      button
      className="px-16 py-12 min-h-92"
      active={props.selectedContactId === props.contact.id ? 1 : 0}
      onClick={() => props.onContactClick(props.contact.id)}
    >
      <div className="relative">
        <div className="absolute right-0 bottom-0 -m-4 z-10">
          <StatusIcon status={chatData.status} />
        </div>

        <Avatar src={chatData.avatar} alt={props.contact.name}>
          {!props.contact.avatar || props.contact.avatar === ""
            ? props.contact.name
            : ""}
        </Avatar>
      </div>

      <ListItemText
        classes={{
          root: "min-w-px px-16",
          primary: "font-medium text-14",
          secondary: "truncate",
        }}
        primary={chatData.name}
        secondary={chatData.msg}
      />
      {/* {chatData.chatId && ( */}
      <div className="flex flex-col justify-center items-end">
        {/* {chatData.lastMessageTime && ( */}
        <Typography
          className="whitespace-nowrap mb-8 font-medium text-12"
          color="textSecondary"
        >
          {chatData.lastMessageTime}
          {/* {format(new Date(chatData.lastMessageTime), "PP")} */}
        </Typography>
        {/* )} */}
        {chatData.unread && (
          <Box
            sx={{
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
            }}
            className="flex items-center justify-center min-w-24 h-24 rounded-full font-medium text-12 text-center"
          >
            {chatData.unread}
          </Box>
        )}
      </div>
    </StyledListItem>
  ));
}

export default ContactListItem;
