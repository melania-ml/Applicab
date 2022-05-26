import { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import Message from "./components/Message";
import MessageSidebar from "./components/MessageSidebar";
import {
  getDossierListForMessage,
  getMessages
} from "app/store/slices/messagesSlice";

//material-ui
import {
  Button,
  Hidden,
  Icon,
  Paper,
  SwipeableDrawer,
  Typography
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const drawerWidth = 400;

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  minHeight: "100%",
  position: "relative",
  flex: "1 1 auto",
  height: "auto",
  backgroundColor: theme.palette.background.default,

  "& .ChatApp-contentCard": {
    display: "flex",
    position: "relative",
    flex: "1 1 100%",
    flexDirection: "row",
    backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
    backgroundColor: theme.palette.background.paper,
    minHeight: 0,
    overflow: "hidden"
  },

  "& .ChatApp-contentWrapper": {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
    zIndex: 10,
    background: `linear-gradient(to bottom, ${alpha(
      theme.palette.background.paper,
      0.8
    )} 0,${alpha(theme.palette.background.paper, 0.6)} 20%,${alpha(
      theme.palette.background.paper,
      0.8
    )})`
  },

  "& .ChatApp-content": {
    display: "flex",
    flex: "1 1 100%",
    minHeight: 0
  }
}));

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    maxWidth: "100%",
    overflow: "hidden",
    // height: '100%',
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  }
}));

function MessageApp(props) {
  const [dossierList, setDossierList] = useState([]);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const callGetMessages = (obj) => {
    dispatch(getMessages(obj))
      .unwrap()
      .then((data) => {
        setMessages(data?.group_message);
      });
  };

  useEffect(() => {
    dispatch(getDossierListForMessage())
      .unwrap()
      .then((data) => {
        setDossierList(data.data);
      });
    callGetMessages();
  }, [dispatch]);

  const mobileChatsSidebarOpen = useSelector(
    ({ chatApp }) => chatApp?.sidebars.mobileChatsSidebarOpen
  );

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          "#fuse-main": {
            height: "100vh"
          }
        })}
      />
      <Root>
        <Hidden mdUp>
          <StyledSwipeableDrawer
            className="h-full absolute z-20"
            variant="temporary"
            anchor="left"
            open={mobileChatsSidebarOpen}
            onOpen={(ev) => {}}
            onClose={() => dispatch(closeMobileChatsSidebar())}
            disableSwipeToOpen
            classes={{
              paper: "absolute ltr:left-0 rtl:right-0"
            }}
            style={{ position: "absolute" }}
            ModalProps={{
              keepMounted: true,
              disablePortal: true,
              BackdropProps: {
                classes: {
                  root: "absolute"
                }
              }
            }}
          >
            <MessageSidebar
              dossierList={dossierList}
              callGetMessages={callGetMessages}
            />
          </StyledSwipeableDrawer>
        </Hidden>
        <Hidden mdDown>
          <StyledSwipeableDrawer
            className="h-full z-20"
            variant="permanent"
            open
            onOpen={(ev) => {}}
            onClose={(ev) => {}}
          >
            <MessageSidebar
              dossierList={dossierList}
              callGetMessages={callGetMessages}
            />
          </StyledSwipeableDrawer>
        </Hidden>
        <main className={clsx("ChatApp-contentWrapper", "z-10")}>
          {messages?.length < 0 ? (
            <div className="flex flex-col flex-1 items-center justify-center p-24">
              <Paper className="rounded-full p-48 md:p-64 shadow-xl">
                <Icon className="block text-32 md:text-64" color="secondary">
                  chat
                </Icon>
              </Paper>
              <Typography variant="h6" className="mt-24 mb-12 text-32 font-700">
                Chat App
              </Typography>
              <Typography
                className="hidden md:flex px-16 pb-24 text-16 text-center"
                color="textSecondary"
              >
                start a conversation!..
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                className="flex md:hidden"
                onClick={() => dispatch(openMobileChatsSidebar())}
              >
                start a conversation!..
              </Button>
            </div>
          ) : (
            <div className="ChatApp-content">
              <Message
                className="flex flex-1 z-10"
                messages={messages}
                callGetMessages={callGetMessages}
              />
            </div>
          )}
        </main>
      </Root>
    </>
  );
}

export default MessageApp;
