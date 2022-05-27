import FuseScrollbars from "@fuse/core/FuseScrollbars";
import clsx from "clsx";
import parse from "html-react-parser";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFormattedDateTime,
  getWholeCaseName
} from "app/main/common/functions";
import FuseLoading from "@fuse/core/FuseLoading";
import { sendMessage } from "app/store/slices/messagesSlice";

//material-ui
import {
  Avatar,
  Typography,
  InputBase,
  AppBar,
  Icon,
  IconButton,
  Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledMessageRow = styled("div")(({ theme }) => ({
  "&.contact": {
    "& .bubble": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      "& .time": {
        marginLeft: 12
      }
    },
    "&.first-of-group": {
      "& .bubble": {
        borderTopLeftRadius: 20
      }
    },
    "&.last-of-group": {
      "& .bubble": {
        borderBottomLeftRadius: 20
      }
    }
  },
  "&.me": {
    paddingLeft: 40,

    "& .avatar": {
      order: 2,
      margin: "0 0 0 16px"
    },
    "& .bubble": {
      marginLeft: "auto",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      "& .time": {
        justifyContent: "flex-end",
        right: 0,
        marginRight: 12
      }
    },
    "&.first-of-group": {
      "& .bubble": {
        borderTopRightRadius: 20
      }
    },

    "&.last-of-group": {
      "& .bubble": {
        borderBottomRightRadius: 20
      }
    }
  },
  "&.contact + .me, &.me + .contact": {
    paddingTop: 20,
    marginTop: 20
  },
  "&.first-of-group": {
    "& .bubble": {
      borderTopLeftRadius: 20,
      paddingTop: 13
    }
  },
  "&.last-of-group": {
    "& .bubble": {
      borderBottomLeftRadius: 20,
      paddingBottom: 13,
      "& .time": {
        display: "flex"
      }
    }
  }
}));

function Message({ className, messages, callGetMessages }) {
  const dispatch = useDispatch();
  const {
    data: { id }
  } = useSelector(({ auth }) => auth.user);
  const { caseNameObj, isLoading, groupId, caseId } = useSelector(
    ({ messages }) => messages
  );
  const chatRef = useRef(null);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    scrollToBottom();
  });

  function scrollToBottom() {
    if (chatRef.current && messages.length > 0) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }

  function isFirstMessageOfGroup(item, i) {
    return (
      i === 0 ||
      (messages[i - 1] &&
        messages[i - 1].message_send_by?.id !== item.message_send_by?.id)
    );
  }

  function isLastMessageOfGroup(item, i) {
    return (
      i === messages.length - 1 ||
      (messages[i + 1] &&
        messages[i + 1].message_send_by?.id !== item.message_send_by?.id)
    );
  }

  function onInputChange(ev) {
    setMessageText(ev.target.value);
  }

  const onSubmitMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() === "") {
      return;
    }
    setMessageText("");
    await dispatch(
      sendMessage({
        message: messageText,
        groupId,
        caseId
      })
    );
    await callGetMessages({ caseId, groupId, fromChat: true });
  };
  if (isLoading) {
    return <FuseLoading />;
  }
  return (
    <div className={clsx("flex flex-col relative", className)}>
      {messages && messages.length > 0 && (
        <AppBar
          position="static"
          elevation={0}
          className="rounded-t-lg h-96 justify-center px-16"
        >
          <Typography color="inherit" className="text-18 font-semibold px-4">
            {getWholeCaseName(
              caseNameObj.case_name,
              caseNameObj.procedure?.procedure_type,
              caseNameObj.created_date,
              caseNameObj.unique_code
            )}
          </Typography>
        </AppBar>
      )}
      <FuseScrollbars className="flex flex-1 flex-col overflow-y-auto">
        {messages && messages.length > 0 ? (
          <div
            ref={chatRef}
            className="flex flex-col pt-16 px-16 rtl:pr-56 pb-40 msg-tab-wrapper"
          >
            {messages.map((item, i) => {
              return (
                <>
                  <StyledMessageRow
                    key={item.time}
                    className={clsx(
                      "flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-2",
                      { me: id === item.message_send_by?.id },
                      { contact: id !== item.message_send_by?.id },
                      { "first-of-group": isFirstMessageOfGroup(item, i) },
                      { "last-of-group": isLastMessageOfGroup(item, i) },
                      i + 1 === messages.length && "pb-96"
                    )}
                  >
                    {isFirstMessageOfGroup(item, i) && (
                      <div
                        className={
                          id === item.message_send_by?.id
                            ? "flex items-center w-full justify-end mb-1"
                            : "flex items-center w-full mb-1"
                        }
                      >
                        <Avatar
                          className="h-20 w-20"
                          src={
                            item.message_send_by.profile ||
                            "assets/images/logos/profile.jpg"
                          }
                        />
                        <Typography
                          variant="span"
                          color="#192A3E"
                          className="senderName ml-2"
                        >
                          {item.message_send_by.first_name +
                            " " +
                            item.message_send_by.last_name}
                        </Typography>
                      </div>
                    )}
                    <div className="bubble flex relative items-center justify-center p-12 max-w-full shadow">
                      <div className="leading-tight whitespace-pre-wrap">
                        {item.subject && (
                          <>
                            <b>Objet : {item.subject}</b>
                            <br />
                          </>
                        )}
                        {item.notification_date && (
                          <b>
                            Date :{" "}
                            {getFormattedDateTime({
                              date: item.notification_date,
                              format: "DD/MM/YYYY HH:mm:ss"
                            })}
                          </b>
                        )}
                        {(item.subject || item.notification_date) && (
                          <>
                            <hr />
                            <br />
                          </>
                        )}
                        {parse(item.message)}
                      </div>
                      <Typography
                        className="time absolute w-full hidden text-11 mt-8 -mb-24 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap"
                        color="textSecondary"
                      >
                        {formatDistanceToNow(
                          new Date(
                            getFormattedDateTime({ date: item.created_date })
                          ),
                          {
                            addSuffix: true
                          }
                        )}
                      </Typography>
                    </div>
                  </StyledMessageRow>
                </>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            <div className="flex flex-col flex-1 items-center justify-center">
              <Icon className="text-128" color="disabled">
                chat
              </Icon>
              <Typography
                className="px-16 pb-24 text-center"
                color="textSecondary"
              >
                Aucun message
              </Typography>
            </div>
          </div>
        )}
      </FuseScrollbars>
      <form
        onSubmit={onSubmitMessage}
        className="absolute bottom-0 right-0 left-0 py-16 px-8"
        style={{ marginRight: 80 }}
      >
        <Paper className="flex items-center relative rounded-24 shadow">
          <InputBase
            autoFocus={false}
            id="message-input"
            className="flex-1 flex grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8"
            placeholder="Type your message"
            autoComplete="off"
            onChange={onInputChange}
            value={messageText}
          />
          <IconButton
            className="absolute ltr:right-0 rtl:left-0 top-0"
            type="submit"
            size="large"
          >
            <Icon className="text-24" color="action">
              send
            </Icon>
          </IconButton>
        </Paper>
      </form>
    </div>
  );
}

export default Message;
