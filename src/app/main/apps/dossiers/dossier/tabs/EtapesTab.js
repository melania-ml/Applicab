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
  setDossiersSearchText,
  getEtapes,
  setEtapeObj,
  getDeletedEtapes,
  setSelectedList
} from "app/store/slices/dossiersSlice";
import {
  getFormattedDateTime,
  getProcedureCode
} from "app/main/common/functions";

//material-ui
import {
  tooltipClasses,
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
  Button,
  Tooltip
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";

function EtapeTab(props) {
  const dispatch = useDispatch();
  const {
    etapes,
    etapeObj,
    editDossierData: { data, type },
    procedures,
    selectedList
  } = useSelector(({ dossiers }) => dossiers);

  const [openEtape, setOpenEtape] = useState(false);

  const searchText = useSelector(({ dossiers }) => dossiers.searchText);

  const [filteredData, setFilteredData] = useState(null);
  const mainTheme = useSelector(selectMainTheme);

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#252E3E"
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#252E3E"
    }
  }));

  const listClick = (name) => {
    const newObj = {};
    newObj["case_management_id"] = etapeObj.case_management_id;
    if (name === "Message envoyé") {
      newObj["send_notification"] = true;
    } else if (name === "Brouillon") {
      newObj["send_notification"] = false;
    } else {
      newObj["status"] = name;
    }
    dispatch(setSelectedList(name));
    dispatch(getEtapes(name === "Tous" ? etapeObj : newObj));
  };

  const deleteEtapes = () => {
    dispatch(setSelectedList("Corbeille"));
    dispatch(getDeletedEtapes(etapeObj.case_management_id));
  };

  const drawer = (
    <div>
      <List>
        <ListItem
          style={{ background: selectedList === "Tous" && "#C4C4C4" }}
          button
          onClick={() => listClick("Tous")}
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Tous" />
        </ListItem>
        <ListItem
          button
          style={{ background: selectedList === "A prévoir" && "#C4C4C4" }}
          onClick={() => listClick("A prévoir")}
        >
          <ListItemIcon>
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
          <ListItemIcon>
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
          <ListItemIcon>
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
          <ListItemIcon>
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
          <ListItemIcon>
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
          <ListItemIcon>
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
          <ListItemIcon>
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
          const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

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
          return row.original.position || "-";
        }
      },
      {
        Header: "Étape",
        accessor: "name",
        Cell: ({ row }) => {
          const value = row.original.status;
          return value === "Fait" ? (
            <CustomTooltip
              placement="top-end"
              title={row.original.sub_name || row.original.name}
            >
              <i
                style={{
                  width: 200,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "inline-block"
                }}
              >
                {row.original.sub_name || row.original.name}
              </i>
            </CustomTooltip>
          ) : (
            <CustomTooltip
              placement="top-end"
              title={row.original.sub_name || row.original.name}
            >
              <span
                className="etape-txt"
                style={{
                  color: value === "Archivé" ? "#C4C4C4" : ""
                }}
              >
                {row.original.sub_name || row.original.name}
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
        Cell: ({ row }) => (
          <div className="flex items-center">
            <CustomTooltip placement="top-end" title="add your tooltip text">
              <Icon style={{ color: "#BABABF", fontSize: "large" }}>
                near_me
              </Icon>
            </CustomTooltip>
          </div>
        )
      }
    ],

    [dispatch]
  );

  useEffect(() => {
    const objWhileUpdate = {};
    if (type === "edit" && data) {
      const proc = procedures.filter((fil) => fil.id === data.procedure.id)[0]
        .procedure_type;
      const key = getProcedureCode(proc);
      objWhileUpdate["type"] = data.type;
      objWhileUpdate["case_management_id"] = data.id;
      objWhileUpdate[key] = true;
      dispatch(setEtapeObj(objWhileUpdate));
      dispatch(getEtapes(objWhileUpdate));
    }
  }, [data, type]);

  useEffect(() => {
    dispatch(setSelectedList("Tous"));
  }, []);

  useEffect(() => {
    if (type === "new" && etapeObj.case_management_id) {
      dispatch(getEtapes(etapeObj));
    } else {
    }
  }, [etapeObj, type]);

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return etapes;
      }
      return FuseUtils.filterArrayByString(etapes, _searchText);
    }

    if (etapes) {
      setFilteredData(getFilteredArray(etapes, searchText));
    }
  }, [etapes, searchText]);

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
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
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
                    value={searchText}
                    inputProps={{
                      "aria-label": "Search"
                    }}
                    onChange={(ev) => dispatch(setDossiersSearchText(ev))}
                  />
                </Paper>
              </ThemeProvider>
              <Button
                onClick={() => {
                  dispatch(openNewEtapeDialog());
                }}
                variant="contained"
                color="secondary"
                className="w-full rounded"
              >
                Nouvelle étape
              </Button>
              <h1 className="py-16 text-base font-semibold">Statut</h1>
              {drawer}
            </motion.div>
          </Grid>
          <Grid item xs={12} md={9}>
            {filteredData.length ? (
              <EtapesTable
                columns={columns}
                data={filteredData}
                onRowClick={(ev, row) => {
                  if (row) {
                    dispatch(openEditEtapeDialog(row.original));
                  }
                }}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                  There are no etapes!
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
