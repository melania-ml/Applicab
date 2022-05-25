import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import withRouter from "@fuse/core/withRouter";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import EtapesDialog from "./EtapesComponent/EtapesDialog";
import EtapesTable from "./EtapesComponent/EtapesTable";
import EtapesMultiSelectMenu from "./EtapesComponent/EtapesMultiSelectMenu";
import {
  openNewEtapeDialog,
  openEditEtapeDialog,
  setEtapesSearchText,
  getEtapes,
  getDeletedEtapes,
  setSelectedList,
  setListObj
} from "app/store/slices/dossiersSlice";
import { getFormattedDateTime } from "app/main/common/functions";
import { CustomTooltip } from "app/main/common/components";

//material-ui
import {
  Typography,
  Icon,
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Input,
  Button
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function EtapeTab() {
  const dispatch = useDispatch();
  const {
    etapes,
    editDossierData: { data, type },
    selectedList,
    caseId,
    searchTextEtape
  } = useSelector(({ dossiers }) => dossiers);

  const [openEtape, setOpenEtape] = useState(false);

  const [filteredData, setFilteredData] = useState(null);
  const mainTheme = useSelector(selectMainTheme);

  const listClick = (name) => {
    const newObj = {};
    newObj["case_management_id"] = caseId;
    if (name === "Message envoyé") {
      newObj["send_notification"] = true;
    } else if (name === "Brouillon") {
      newObj["send_notification"] = false;
    } else {
      newObj["status"] = name;
    }
    dispatch(setSelectedList(name));
    dispatch(
      setListObj(name === "Tous" ? { case_management_id: caseId } : newObj)
    );
    dispatch(
      getEtapes(name === "Tous" ? { case_management_id: caseId } : newObj)
    );
  };

  const deleteEtapes = () => {
    dispatch(setSelectedList("Corbeille"));
    dispatch(getDeletedEtapes(caseId));
  };

  const drawer = (
    <div>
      <List>
        <ListItem
          style={{ background: selectedList === "Tous" && "#C4C4C4" }}
          button
          onClick={() => listClick("Tous")}
        >
          <ListItemIcon className="min-w-[20%]"></ListItemIcon>
          <ListItemText primary="Tous" />
        </ListItem>
        <ListItem
          button
          style={{ background: selectedList === "A prévoir" && "#C4C4C4" }}
          onClick={() => listClick("A prévoir")}
        >
          <ListItemIcon className="min-w-[20%]">
            <Icon
              style={{
                color: "#C4C4C4",
                fontSize: "large"
              }}
            >
              label
            </Icon>
          </ListItemIcon>
          <ListItemText primary="A prévoir" />
        </ListItem>
        <ListItem
          button
          style={{ background: selectedList === "A faire" && "#C4C4C4" }}
          onClick={() => listClick("A faire")}
        >
          <ListItemIcon className="min-w-[20%]">
            <Icon
              style={{
                color: "#1BD7EF",
                fontSize: "large"
              }}
            >
              label
            </Icon>
          </ListItemIcon>
          <ListItemText primary="A faire" />
        </ListItem>
        <ListItem
          button
          style={{ background: selectedList === "Fait" && "#C4C4C4" }}
          onClick={() => listClick("Fait")}
        >
          <ListItemIcon className="min-w-[20%]">
            <Icon
              style={{
                color: "#78C5A0",
                fontSize: "large"
              }}
            >
              label
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Fait" />
        </ListItem>
        <ListItem
          button
          style={{ background: selectedList === "Archivé" && "#C4C4C4" }}
          onClick={() => listClick("Archivé")}
        >
          <ListItemIcon className="min-w-[20%]">
            <Icon
              style={{
                color: "#E5E5E5",
                fontSize: "large"
              }}
            >
              label
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Archivé" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          style={{ background: selectedList === "Message envoyé" && "#C4C4C4" }}
          onClick={() => listClick("Message envoyé")}
        >
          <ListItemIcon className="min-w-[20%]">
            <Icon
              style={{
                color: "#BABABF",
                fontSize: "large"
              }}
            >
              near_me
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Message envoyé" />
        </ListItem>
        <ListItem
          button
          style={{ background: selectedList === "Brouillon" && "#C4C4C4" }}
          onClick={() => listClick("Brouillon")}
        >
          <ListItemIcon className="min-w-[20%]">
            <Icon
              style={{
                color: "#BABABF",
                fontSize: "large"
              }}
            >
              insert_drive_file
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Brouillon" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          style={{ background: selectedList === "Corbeille" && "#C4C4C4" }}
          onClick={deleteEtapes}
        >
          <ListItemIcon className="min-w-[20%]">
            <Icon
              style={{
                color: "#BABABF",
                fontSize: "large"
              }}
            >
              delete
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Corbeille" />
        </ListItem>
      </List>
    </div>
  );

  const columns = useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map(
            (row) => row?.original?.id
          );

          return (
            selectedFlatRows.length > 0 && (
              <EtapesMultiSelectMenu
                selectedList={selectedList}
                selectedEtapes={selectedRowIds}
              />
            )
          );
        },
        accessor: "avatar",
        Cell: () => {
          return null;
        },
        className: "justify-center",
        width: 64,
        sortable: false
      },
      {
        Header: "Position",
        accessor: "position",
        Cell: ({ row }) => {
          const value = row.original.status;
          return value === "Fait" ? (
            <i>
              <span className="position-txt">{row.original.position}</span>
            </i>
          ) : (
            <span className="position-txt">{row.original.position || "-"}</span>
          );
        },
        sortable: true
      },
      {
        Header: "Étape",
        accessor: "name",
        Cell: ({ row }) => {
          const value = row.original.status;
          return value === "Fait" ? (
            <CustomTooltip
              placement="top-start"
              title={row.original?.sub_name || row.original?.name}
            >
              <i>
                <span className="etape-txt">
                  {row.original?.sub_name || row.original?.name}
                </span>
              </i>
            </CustomTooltip>
          ) : (
            <CustomTooltip
              placement="top-start"
              title={row.original?.sub_name || row.original?.name}
            >
              <span
                className="etape-txt"
                style={{
                  color: value === "Archivé" ? "#C4C4C4" : ""
                }}
              >
                {row.original?.sub_name || row.original?.name}
              </span>
            </CustomTooltip>
          );
        },
        sortable: true
      },
      {
        Header: "Date",
        accessor: "notification_date",
        Cell: ({ row }) => {
          if (!row.original.notification_date) {
            return "A RENSEIGNER";
          }
          const value = row.original.status;
          return value === "Fait" ? (
            <i>
              {getFormattedDateTime({
                date: row.original.notification_date,
                format: "DD-MM-YYYY HH:mm:ss"
              })}
            </i>
          ) : (
            <span style={{ color: value === "Archivé" ? "#C4C4C4" : "" }}>
              {getFormattedDateTime({
                date: row.original.notification_date,
                format: "DD-MM-YYYY HH:mm:ss"
              })}
            </span>
          );
        },
        sortable: true
      },
      {
        Header: "Statut",
        accessor: "type",
        sortable: true,
        Cell: ({ row }) => {
          const value = row.original.status;
          return value ? (
            <div className="flex items-center dropSelect">
              <Icon
                style={{
                  color:
                    value === "Fait"
                      ? "#78C5A0"
                      : value === "A faire"
                      ? "#1BD7EF"
                      : value === "A prévoir"
                      ? "#C4C4C4"
                      : "#E5E5E5",
                  fontSize: "large"
                }}
              >
                label
              </Icon>
              {value === "Fait" ? (
                <i className="ml-3">{value}</i>
              ) : (
                <span
                  style={{ color: value === "Archivé" ? "#C4C4C4" : "" }}
                  className="ml-3"
                >
                  {value}
                </span>
              )}
            </div>
          ) : (
            "-"
          );
        }
      },
      {
        Header: "Notifié",
        className: "font-medium",
        sortable: true,
        Cell: ({ row }) => {
          return row.original.send_notification ? (
            <Icon style={{ color: "#BABABF", fontSize: "large" }}>near_me</Icon>
          ) : (
            <Icon
              style={{
                color: "#BABABF",
                fontSize: "large"
              }}
            >
              insert_drive_file
            </Icon>
          );
        }
      }
    ],
    [dispatch]
  );

  useEffect(() => {
    if (type === "edit" && data) {
      dispatch(getEtapes({ case_management_id: caseId }));
    }
  }, [data, type]);

  useEffect(() => {
    dispatch(setEtapesSearchText(""));
  }, []);

  useEffect(() => {
    dispatch(setSelectedList("Tous"));
    dispatch(setListObj({ case_management_id: caseId }));
  }, []);

  useEffect(() => {
    if (type === "new" && caseId) {
      dispatch(getEtapes({ case_management_id: caseId }));
    } else {
    }
  }, [caseId, type]);

  useEffect(() => {
    function getFilteredArray(entities, _searchTextEtape) {
      if (_searchTextEtape?.length === 0) {
        return etapes;
      }
      return FuseUtils.filterArrayByString(etapes, _searchTextEtape);
    }

    if (etapes) {
      setFilteredData(getFilteredArray(etapes, searchTextEtape));
    }
  }, [etapes, searchTextEtape]);

  if (!filteredData) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="mb-5 mb-md-0 box-shadow-dash h-full"
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2.5}>
            <motion.div
              className="mb-5 mb-md-0 box-shadow-dash "
              initial={{ y: 50, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              style={{ background: "#F8F8F8", padding: 15, borderRadius: 10 }}
            >
              <ThemeProvider theme={mainTheme}>
                <Paper
                  component={motion.div}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                  className="flex p-4 items-center max-w-300 h-48 px-16 py-8 shadow search-bar-dossier"
                >
                  <Icon color="action">search</Icon>

                  <Input
                    placeholder="Recherche"
                    className="flex flex-1 px-16"
                    disableUnderline
                    fullWidth
                    value={searchTextEtape}
                    inputProps={{
                      "aria-label": "Search"
                    }}
                    onChange={(ev) => dispatch(setEtapesSearchText(ev))}
                  />
                </Paper>
              </ThemeProvider>
              <Button
                onClick={() => {
                  dispatch(openNewEtapeDialog());
                }}
                variant="contained"
                color="secondary"
                className="w-full rounded linkButton"
              >
                Nouvelle étape
              </Button>
              <h1 className="py-16 text-base font-semibold">Statut</h1>
              {drawer}
            </motion.div>
          </Grid>
          <Grid item xs={12} md={9.5}>
            {filteredData.length ? (
              <EtapesTable
                columns={columns}
                data={filteredData}
                onRowClick={(ev, row) => {
                  if (row) {
                    if (selectedList !== "Corbeille") {
                      dispatch(openEditEtapeDialog(row.original));
                    }
                  }
                }}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                  Pas des étapes!
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
      <EtapesDialog isOpen={openEtape} onCloseDialog={setOpenEtape} />
    </motion.div>
  );
}

export default withRouter(EtapeTab);
