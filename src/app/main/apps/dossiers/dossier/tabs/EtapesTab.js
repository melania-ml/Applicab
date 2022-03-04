import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import withRouter from "@fuse/core/withRouter";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Tooltip,
  styled,
  tooltipClasses,
  Typography,
  Select,
  TableRow,
  TableBody,
  TableCell
} from "@mui/material";
import _ from "@lodash";
import { Paper, Input, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import EtapesDialog from "./EtapesComponent/EtapesDialog";
import EtapesTable from "./EtapesComponent/EtapesTable";
import EtapesMultiSelectMenu from "./EtapesComponent/EtapesMultiSelectMenu";
import {
  openNewContactDialog,
  setDossiersSearchText
} from "../../store/dossiersSlice";

function EtapeTab() {
  const rows = [
    {
      icon: (
        <Icon
          style={{
            color: "#C4C4C4",
            fontSize: "large"
          }}
        >
          label
        </Icon>
      ),
      actionType: "A prévoir"
    },
    {
      icon: (
        <Icon
          style={{
            color: "#1BD7EF",
            fontSize: "large"
          }}
        >
          label
        </Icon>
      ),
      actionType: "A faire"
    },

    {
      icon: (
        <Icon
          style={{
            color: "#78C5A0",
            fontSize: "large"
          }}
        >
          label
        </Icon>
      ),
      actionType: "Fait"
    },
    {
      icon: (
        <Icon
          style={{
            color: "#E5E5E5",
            fontSize: "large"
          }}
        >
          label
        </Icon>
      ),
      actionType: "Archivé"
    }
  ];

  const dispatch = useDispatch();
  const etapes = useSelector(
    ({ dossiersApp }) => dossiersApp.dossiers.dossiers
  );

  const [openEtape, setOpenEtape] = useState(false);

  const searchText = useSelector(
    ({ dossiersApp }) => dossiersApp.dossiers.searchText
  );

  const [filteredData, setFilteredData] = useState(null);
  const mainTheme = useSelector(selectMainTheme);
  const [rowId, setRowId] = useState(null);

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

  const columns = useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

          return (
            selectedFlatRows.length > 0 && (
              <EtapesMultiSelectMenu selectedContactIds={selectedRowIds} />
            )
          );
        },
        accessor: "avatar",
        Cell: ({ row }) => {
          return null;
          // <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
        },
        className: "justify-center",
        width: 64,
        sortable: false
      },
      {
        Header: "Num",
        accessor: "company",
        sortable: true
      },
      {
        Header: "Étape",
        accessor: "lastName",
        sortable: true
      },
      {
        Header: "Date",
        accessor: "createddata",
        sortable: true
      },
      {
        Header: "Statut",
        accessor: "jobTitle",
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center dropSelect">
            <Icon style={{ color: "#1BD7EF", fontSize: "large" }}>label</Icon>A
            prévoir
          </div>
        )
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
                  dispatch(openNewContactDialog());
                }}
                variant="contained"
                color="secondary"
                className="w-full rounded"
              >
                Nouvelle étape
              </Button>
              <h1 className="py-16 text-base font-semibold">Statut</h1>
              <div
                style={{
                  background: "#C4C4C4",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  height: 34
                }}
              >
                <h1 className="text-base ml-10">Tous</h1>
              </div>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 }
                    }}
                  >
                    <TableRow>
                      <TableRow className="flex items-center truncate cursor-pointer">
                        {row.icon}{" "}
                        <TableCell style={{ borderBottom: "none" }} onClick>
                          {row.actionType}
                        </TableCell>
                      </TableRow>
                    </TableRow>
                  </TableRow>
                ))}
              </TableBody>
              <hr />
              <TableBody>
                <TableRow className="flex items-center truncate cursor-pointer">
                  <Icon
                    style={{
                      color: "#BABABF",
                      fontSize: "large"
                    }}
                  >
                    near_me
                  </Icon>
                  <TableCell style={{ borderBottom: "none" }}>
                    Message envoyé
                  </TableCell>
                </TableRow>
                <TableRow className="flex items-center truncate cursor-pointer">
                  <Icon
                    style={{
                      color: "#BABABF",
                      fontSize: "large"
                    }}
                  >
                    access_time
                  </Icon>
                  <TableCell style={{ borderBottom: "none" }}>
                    En attente
                  </TableCell>
                </TableRow>
                <TableRow className="flex items-center truncate cursor-pointer">
                  <Icon
                    style={{
                      color: "#BABABF",
                      fontSize: "large"
                    }}
                  >
                    text_snippet
                  </Icon>
                  <TableCell style={{ borderBottom: "none" }}>
                    Brouillon
                  </TableCell>
                </TableRow>
                <hr />
                <TableRow className="flex items-center truncate cursor-pointer">
                  <Icon
                    style={{
                      color: "#BABABF",
                      fontSize: "large"
                    }}
                  >
                    delete
                  </Icon>
                  <TableCell style={{ borderBottom: "none" }}>
                    Corbeille
                  </TableCell>
                </TableRow>
              </TableBody>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={9}>
            {filteredData.length ? (
              <EtapesTable
                columns={columns}
                data={filteredData}
                onRowClick={(ev, row) => {
                  if (row) {
                    dispatch(openNewContactDialog(row.original));
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
