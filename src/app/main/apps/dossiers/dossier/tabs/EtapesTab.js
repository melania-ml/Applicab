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
  TableCell,
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
  selectContacts,
  setContactsSearchText,
} from "./EtapesComponent/etapesSlice";

function EtapeTab() {
  function createData(icon, actionType) {
    return { icon, actionType };
  }

  const rows = [
    createData(<h5 style={{ margin: "0px 50px", fontSize: "small" }}>Tous</h5>),
    createData(
      <Icon
        style={{
          color: "#C4C4C4",
          fontSize: "large",
          margin: "10px",
        }}
      >
        label
      </Icon>,
      "A prévoir"
    ),
    createData(
      <Icon
        style={{
          color: "#1BD7EF",
          fontSize: "large",
          margin: "10px",
        }}
      >
        label
      </Icon>,
      "A faire"
    ),
    createData(
      <Icon
        style={{
          color: "#78C5A0",
          fontSize: "large",
          margin: "10px",
        }}
      >
        label
      </Icon>,
      "Fait"
    ),
    createData(
      <Icon
        style={{
          color: "#E5E5E5",
          fontSize: "large",
          margin: "10px",
        }}
      >
        label
      </Icon>,
      "Archivé"
    ),
  ];

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [openEtape, setOpenEtape] = useState(false);

  const searchText = useSelector(
    ({ contactsApp }) => contactsApp.contacts.searchText
  );

  const [filteredData, setFilteredData] = useState(null);
  const mainTheme = useSelector(selectMainTheme);
  const [rowId, setRowId] = useState(null);

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#252E3E",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#252E3E",
    },
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
        sortable: false,
      },
      {
        Header: "Num",
        accessor: "company",
        sortable: true,
      },
      {
        Header: "Étape",
        accessor: "lastName",
        sortable: true,
      },
      {
        Header: "Date",
        accessor: "createddata",
        sortable: true,
      },
      {
        Header: "Statut",
        accessor: "jobTitle",
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center dropSelect">
            <Icon
              style={{ color: "#1BD7EF", fontSize: "large", margin: "10px" }}
            >
              label
            </Icon>
            A prévoir
            {/* <CustomTooltip placement="top-end" title="Custom tooltip">
              <Fab
                variant="extended"
                sx={{
                  boxShadow: 0,
                  backgroundColor: "#22d3ee",
                  height: '30px',
                  padding: "0px 0px 0px 30px",
                  margin: "-50px",
                  "&:hover": { backgroundColor: "#89c2cb" },
                }}
              >
                default text
                <Select>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </Select>
              </Fab>
            </CustomTooltip> */}
          </div>
        ),
      },
      {
        Header: "Notifié",
        className: "font-medium",
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <CustomTooltip placement="top-end" title="add your tooltip text">
              <Icon
                style={{ color: "#BABABF", fontSize: "large", margin: "10px" }}
              >
                near_me
              </Icon>
            </CustomTooltip>
          </div>
        ),
      },
    ],

    [dispatch]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

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
                      "aria-label": "Search",
                    }}
                    onChange={(ev) => dispatch(setContactsSearchText(ev))}
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
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
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
              <TableRow className="flex items-center truncate cursor-pointer">
                <Icon
                  style={{
                    color: "#BABABF",
                    fontSize: "large",
                    // margin: "10px",
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
                    fontSize: "large",
                    // margin: "10px",
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
                    fontSize: "large",
                    // margin: "10px",
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
                    fontSize: "large",
                    // margin: "10px",
                  }}
                >
                  delete
                </Icon>
                <TableCell style={{ borderBottom: "none" }}>
                  Corbeille
                </TableCell>
              </TableRow>
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
                  There are no contacts!
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
