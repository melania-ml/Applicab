import * as React from "react";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseUtils from "@fuse/utils";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactListItem from "./ContactListItem";
import {
  getMessages,
  setCaseNameObj,
  setCaseId,
  setGroupId
} from "app/store/slices/messagesSlice";

//material-ui
import { AppBar, Icon, Input, List, Paper, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function MessageSidebar(props) {
  const { dossierList } = useSelector(({ messages }) => messages);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [searchText, setSearchText] = useState("");

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" elevation={0} className="rounded-t-lg h-96">
        {useMemo(
          () => (
            <Toolbar className="px-16">
              <Paper className="flex p-4 items-center w-full px-8 py-4 m-24 shadow">
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Recherche"
                  className="flex flex-1 px-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    "aria-label": "Search"
                  }}
                  onChange={handleSearchText}
                />
              </Paper>
            </Toolbar>
          ),
          [searchText]
        )}
      </AppBar>

      <FuseScrollbars className="overflow-y-auto flex-1">
        <List className="w-full">
          {useMemo(() => {
            function getFilteredArray(arr, _searchText) {
              if (_searchText.length === 0) {
                return arr;
              }
              return FuseUtils.filterArrayByString(arr, _searchText);
            }
            const filteredDossiers = getFilteredArray(
              [...dossierList],
              searchText
            );
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            };

            return (
              <motion.div
                className="flex flex-col shrink-0"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredDossiers.map((contact) => (
                  <motion.div variants={item} key={contact?.id}>
                    <ContactListItem
                      contact={contact}
                      onContactClick={(id) => {
                        dispatch(setCaseNameObj(contact.case_management_id));
                        dispatch(setCaseId(id));
                        dispatch(setGroupId(contact?.id));
                        dispatch(
                          getMessages({
                            caseId: id,
                            groupId: contact?.id,
                            isMobile
                          })
                        );
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            );
          }, [dossierList, searchText, dispatch, isMobile])}
        </List>
      </FuseScrollbars>
    </div>
  );
}

export default MessageSidebar;
