import parse from "html-react-parser";
import { getWholeCaseName } from "app/main/common/functions";

//material-ui
import { Avatar, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  ...(active && {
    backgroundColor: theme.palette.background.paper
  })
}));

function ContactListItem(props) {
  const chatData = props.contact;
  return (
    <StyledListItem
      button
      className="px-16 py-12 min-h-92"
      onClick={() => props.onContactClick(chatData?.case_management_id?.id)}
      style={{ background: props.contactId === chatData.id && "#C4C4C4" }}
    >
      <div className="relative">
        <Avatar
          src={
            chatData.case_management_id.lawyer_id.profile ||
            "assets/images/logos/profile.jpg"
          }
          alt={chatData.name}
        ></Avatar>
      </div>
      <ListItemText
        classes={{
          root: "min-w-px px-16",
          primary: "font-medium text-14",
          secondary: "text-message h-20 w-auto"
        }}
        primary={getWholeCaseName(
          chatData.case_management_id.case_name,
          chatData.case_management_id.procedure?.procedure_type,
          chatData.case_management_id.created_date,
          chatData.case_management_id.unique_code
        )}
        secondary={parse(chatData.group_message.message)}
      />
      {chatData.un_read_count && (
        <div className="flex flex-col justify-center items-end">
          <Box
            sx={{
              backgroundColor: "secondary.main",
              color: "secondary.contrastText"
            }}
            className="flex items-center justify-center min-w-24 h-24 rounded-full font-medium text-12 text-center"
          >
            {chatData.un_read_count}
          </Box>
        </div>
      )}
    </StyledListItem>
  );
}

export default ContactListItem;
