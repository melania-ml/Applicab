import { motion } from "framer-motion";
import { getWholeCaseName } from "app/main/common/functions";
import Picker from "emoji-picker-react";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useEffect, itemef, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputBase from "@mui/material/InputBase";
//material-ui
import {
  Box,
  Card,
  CardContent,
  AppBar,
  Typography,
  Avatar,
  Paper,
  Icon,
  Input,
  Button,
} from "@mui/material";
import { indexOf } from "lodash";

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
        marginLeft: 0,
      },
    },
    "&.first-of-group": {
      "& .bubble": {
        borderTopLeftRadius: 20,
      },
    },
    "&.last-of-group": {
      "& .bubble": {
        borderBottomLeftRadius: 20,
      },
    },
  },
  "&.me": {
    paddingLeft: 40,

    "& .avatar": {
      order: 2,
      margin: "0 0 0 16px",
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
        marginRight: 0,
      },
    },
    "&.first-of-group": {
      "& .bubble": {
        borderTopRightRadius: 20,
      },
    },

    "&.last-of-group": {
      "& .bubble": {
        borderBottomRightRadius: 20,
      },
    },
  },
  "&.contact + .me, &.me + .contact": {
    paddingTop: 20,
    marginTop: 20,
  },
  "&.first-of-group": {
    "& .bubble": {
      borderTopLeftRadius: 20,
      paddingTop: 13,
    },
  },
  "&.last-of-group": {
    "& .bubble": {
      borderBottomLeftRadius: 20,
      paddingBottom: 13,
      "& .time": {
        display: "flex",
      },
    },
  },
}));

function MessageTab(props) {
  const dispatch = useDispatch();
  const {
    editDossierData: { data },
  } = useSelector(({ dossiers }) => dossiers);
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const chatRef = useRef(null);

  const [allFields, setAllFields] = useState([
    {
      image: "",
      profile: "",
      name: "",
      allFieldsMessage: "hey..! you are Welcome",
      date: new Date(),
    },
  ]);

  useEffect(() => {
    if (message) {
      scrollToBottom();
    }
  }, [message]);

  function scrollToBottom() {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setAllFields((prev) => [...prev, { allFieldsMessage: message }]);
      setMessage("");
    }
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
    setAllFields((prev) => [...prev, { allFieldsMessage: message }]);
    setMessage("");
  };

  const onEmojiClick = (event, emojiObject) => {
    if (indexOf(event.target.value != 0)) {
      setMessage(message + emojiObject.emoji);
    }
    setShowPicker(false);
  };

  function isFirstMessageOfGroup(item, i) {
    return message;
  }

  function isLastMessageOfGroup(item, i) {
    return message;
  }
  function shouldShowContactAvatar(item, i) {
    return message;
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        className="rounded-t-lg ... p-4 flex justify-between message-tab-header"
      >
        <div className="flex res-flex-direction">
          <Avatar
            className="w-40 h-40 md:ml-40"
            alt="item photo"
            src={
              (allFields.image && URL.createObjectURL(allFields.image)) ||
              allFields.profile
            }
          />
          <Typography
            variant="subtitle1"
            color="inherit"
            className="messagesTab md:ml-24"
          >
            {getWholeCaseName(
              data?.case_name,
              data?.procedure.procedure_type,
              data?.created_date,
              data?.unique_code
            )}
          </Typography>
          <div className="md:mr-24 mt-3 mt-md-0">
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 24, opacity: 1, transition: { delay: 0.2 } }}
              className="flex p-4 search-bar-contact h-48 ... shadow m-auto message-searchbar"
            >
              <Icon color="action">search</Icon>

              <Input
                placeholder="Recherche"
                className="flex flex-1 px-16"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </Paper>
          </div>
        </div>
      </AppBar>
      <div className={clsx("flex flex-col", props.className)}>
        <FuseScrollbars
          ref={chatRef}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          {allFields && allFields.length > 0 ? (
            <div className="flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40">
              {allFields
                .filter((filteredData) => {
                  if (searchText === "") {
                    return filteredData;
                  } else if (
                    filteredData.allFieldsMessage
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  ) {
                    return filteredData;
                  }
                })
                .map((e, item, i) => {
                  const contact =
                    item.who === item.id
                      ? item
                      : filteredData.find(
                          (_contact) => _contact.id === item.who
                        );

                  return (
                    <>
                      <StyledMessageRow
                        key={item.time}
                        className={clsx(
                          "flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-4",
                          { me: item.who === item.id },
                          { contact: item.who !== item.id },
                          { "first-of-group": isFirstMessageOfGroup(item, i) },
                          { "last-of-group": isLastMessageOfGroup(item, i) },
                          i + 1 === allFields.length && "pb-96"
                        )}
                      >
                        <Avatar className="h-20 w-20" src={contact.avatar} />
                        <Typography
                          variant="subtitle1"
                          color="#192A3E"
                          className="senderName ml-2"
                        >
                          Avocat - Melania Munoz
                        </Typography>
                        <div className="bubble flex relative items-center justify-center p-12 max-w-full shadow">
                          <div className="leading-tight whitespace-pre-wrap">
                            {e.allFieldsMessage}
                          </div>
                        </div>
                      </StyledMessageRow>
                      <Typography
                        className="time absolute w-full text-11 mt-4 -mb-16 bottom-0 whitespace-nowrap"
                        color="textSecondary"
                      >
                        {formatDistanceToNow(new Date(), {
                          addSuffix: true,
                        })}
                      </Typography>
                    </>
                  );
                })}
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 items-center justify-center">
                <Icon className="text-128" color="disabled">
                  allFields
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
        {allFields && (
          <form
            onSubmit={onSubmitMessage}
            className="absolute bottom-0 right-0 left-0 py-16 px-8"
          >
            <Paper className="flex items-center relative rounded-24 shadow">
              <Button onClick={() => setShowPicker((val) => !val)}>
                <Icon className="flex flex-1 px-36" color="action">
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
                  pickerStyle={{ width: "100%" }}
                  onEmojiClick={onEmojiClick}
                  onChange={(e) => e.target.value}
                />
              )}
              <InputBase
                autoFocus={false}
                id="message-input"
                className="flex-1 flex grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8"
                placeholder="Envoyer un message..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <IconButton
                className="absolute ltr:right-0 rtl:left-0 top-0"
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
        )}
      </div>
    </>
  );
}

export default MessageTab;
