import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { indexOf } from "lodash";
import Picker from "emoji-picker-react";
import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { sendMessage } from "app/store/slices/dossiersSlice";
import {
  getWholeCaseName,
  getFormattedDateTime
} from "app/main/common/functions";

//material-ui
import {
  AppBar,
  Typography,
  Avatar,
  Paper,
  Icon,
  Input,
  Button,
  InputBase,
  IconButton
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
        marginLeft: 0
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
        marginRight: 0
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
    paddingTop: 15,
    marginTop: 15
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

function MessageTab(props) {
  const dispatch = useDispatch();
  const {
    editDossierData: { data },
    messages,
    groupId,
    caseId
  } = useSelector(({ dossiers }) => dossiers);
  const {
    data: { id, profile }
  } = useSelector(({ auth }) => auth.user);
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const chatRef = useRef(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return messages;
      }
      return FuseUtils.filterArrayByString(messages, _searchText);
    }

    if (messages) {
      setFilteredData(getFilteredArray(messages, searchText));
    }
  }, [messages, searchText]);

  function scrollToBottom() {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  const onSubmitMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      return;
    }
    dispatch(
      sendMessage({
        message,
        groupId,
        caseId
      })
    ).then(() => {
      setMessage("");
    });
  };

  const onEmojiClick = (event, emojiObject) => {
    if (indexOf(event.target.value != 0)) {
      setMessage(message + emojiObject.emoji);
    }
    setShowPicker(false);
  };

  function isFirstMessageOfGroup(item, i) {
    return (
      i === 0 ||
      (messages[i - 1] &&
        messages[i - 1].message_send_by.id !== item.message_send_by.id)
    );
  }

  function isLastMessageOfGroup(item, i) {
    return (
      i === messages.length - 1 ||
      (messages[i + 1] &&
        messages[i + 1].message_send_by.id !== item.message_send_by.id)
    );
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        className="rounded-t-lg ... p-4 flex justify-between message-tab-header items-center"
      >
        <div className="flex res-flex-direction justify-between w-full">
          <div className="flex items-center res-flex-direction">
            <Avatar className="w-40 h-40" alt="item photo" src={profile} />
            <Typography
              variant="subtitle1"
              color="inherit"
              className="messagesTab ml-12 mt-3 mt-md-0"
            >
              {getWholeCaseName(
                data?.case_name,
                data?.procedure.procedure_type,
                data?.created_date,
                data?.unique_code
              )}
            </Typography>
          </div>
          <div className="md:mr-24 mt-3 mt-md-0">
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 24, opacity: 1, transition: { delay: 0.2 } }}
              className="flex p-4 search-bar-msg h-48 ... shadow m-auto message-searchbar"
            >
              <Icon color="action">search</Icon>

              <Input
                placeholder="Recherche"
                className="flex flex-1 px-16"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search"
                }}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </Paper>
          </div>
        </div>
      </AppBar>
      <div className={clsx("flex flex-col msg-main-section", props.className)}>
        <FuseScrollbars
          ref={chatRef}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          {filteredData && filteredData.length > 0 ? (
            <div className="flex flex-col pt-16 px-16 rtl:pr-56 pb-40">
              {filteredData.map((item, i) => {
                return (
                  <>
                    <StyledMessageRow
                      key={item.time}
                      className={clsx(
                        "flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-2",
                        { me: id === item.message_send_by.id },
                        { contact: id !== item.message_send_by.id },
                        { "first-of-group": isFirstMessageOfGroup(item, i) },
                        { "last-of-group": isLastMessageOfGroup(item, i) },
                        i + 1 === messages.length && "pb-96"
                      )}
                    >
                      {isFirstMessageOfGroup(item, i) && (
                        <div
                          className={
                            id === item.message_send_by.id
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
                          {item.message}
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
              </div>
              <Typography
                className="px-16 pb-24 text-center"
                color="textSecondary"
              >
                Start a conversation by typing your message below.
              </Typography>
            </div>
          )}
        </FuseScrollbars>
        <form
          onSubmit={onSubmitMessage}
          className="relative bottom-0 right-0 left-0 py-16 px-8"
        >
          <Paper className="flex items-center rounded-24 shadow">
            {/* <Button
              onClick={() => setShowPicker((val) => !val)}
              className="msg-emoji-selction"
            >
              <Icon className="flex flex-1 px-36 smily-icon" color="action">
                sentiment_satisfied
              </Icon>
              {showPicker && (
                <emoji-picker
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmojiClick}
                />
              )}
            </Button>
            {showPicker && (
              <Picker
                pickerStyle={{ position: "absolute", bottom: "63px" }}
                onEmojiClick={onEmojiClick}
                onChange={(e) => e.target.value}
              />
            )} */}
            <InputBase
              autoFocus={false}
              id="message-input"
              autoComplete="off"
              className="flex-1 flex grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8"
              placeholder="Envoyer un message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <IconButton
              className="absolute msg-send-btn"
              type="submit"
              size="small"
            >
              <Icon
                className="text-24"
                color="action"
                onClick={onSubmitMessage}
              >
                send
              </Icon>
            </IconButton>
          </Paper>
        </form>
      </div>
    </>
  );
}

export default MessageTab;
