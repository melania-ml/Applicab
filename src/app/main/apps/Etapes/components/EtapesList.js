import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import withRouter from "@fuse/core/withRouter";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import {
  Tooltip,
  styled,
  tooltipClasses,
  Typography,
  Select
} from "@mui/material";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EtapesMultiSelectMenu from "./EtapesMultiSelectMenu";
import EtapesTable from "./EtapesTable";

import { selectContacts } from "../store/etapesSlice";
import { openEditContactDialog } from "app/main/store/dossiersSlice";

function EtapesList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(
    ({ contactsApp }) => contactsApp.contacts.searchText
  );

  const [filteredData, setFilteredData] = useState(null);

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
        Header: "Dossier",
        accessor: "name",
        className: "font-medium",
        sortable: true
      },
      {
        Header: "Etape",
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
            <CustomTooltip placement="top-end" title="Custom tooltip">
              <Fab
                variant="extended"
                sx={{
                  boxShadow: 0,
                  backgroundColor: "#22d3ee",
                  height: "30px",
                  padding: "0px 0px 0px 30px",
                  margin: "-50px",
                  "&:hover": { backgroundColor: "#89c2cb" }
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
            </CustomTooltip>
          </div>
        )
      },
      {
        Header: "Notifie",
        className: "font-medium",
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <CustomTooltip placement="top-end" title="add your tooltip text">
              <Icon
                style={{ color: "#00dd00", fontSize: "large", margin: "10px" }}
              >
                checkmark
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

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no Etapes!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <EtapesTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditContactDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default withRouter(EtapesList);
