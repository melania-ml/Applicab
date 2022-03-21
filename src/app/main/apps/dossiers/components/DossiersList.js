import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import withRouter from "@fuse/core/withRouter";
import Fab from "@mui/material/Fab";
import Icon from "@mui/material/Icon";
import FuseLoading from "@fuse/core/FuseLoading";
import IconButton from "@mui/material/IconButton";
import { Tooltip, styled, tooltipClasses, Typography } from "@mui/material";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DossiersMultiSelectMenu from "./DossiersMultiSelectMenu";
import DossiersTable from "./DossiersTable";
import {
  getFormattedDateTime,
  getProcedureCode
} from "app/main/common/functions";

import {
  selectDossiers,
  setEditDossierData,
  setEtapeTabFromAction
} from "app/store/slices/dossiersSlice";

function DossiersList(props) {
  const dispatch = useDispatch();
  const dossiers = useSelector(selectDossiers);
  const searchText = useSelector(({ dossiers }) => dossiers.searchText);
  const isLoading = useSelector(({ dossiers }) => dossiers.isLoading);

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
              <DossiersMultiSelectMenu selectedContactIds={selectedRowIds} />
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
        Header: "Nom",
        accessor: "case_name",
        sortable: true
      },
      {
        Header: "Procédure",
        accessor: "procedure",
        Cell: ({ row }) => {
          const procedure = row.original.procedure?.procedure_type;
          return <span>{getProcedureCode(procedure)}</span>;
        },
        sortable: true
      },
      {
        Header: "Type",
        accessor: "type",
        className: "font-medium",
        sortable: true
      },
      {
        Header: "Nature",
        accessor: "nature",
        Cell: ({ row }) => {
          return <span>{row.original.nature?.nature_title}</span>;
        },
        sortable: true
      },
      {
        Header: "Date de création",
        accessor: "created_date",
        Cell: ({ row }) => {
          return (
            <span>
              {getFormattedDateTime({
                date: row.original.created_date,
                format: "DD-MM-YYYY HH:mm:ss"
              })}
            </span>
          );
        },
        sortable: true
      },
      {
        Header: "Statut",
        accessor: "status",
        sortable: true
      },
      {
        Header: "Msg",
        className: "font-medium",
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <CustomTooltip placement="top-end" title="Non lus et non envoyé">
              <Fab
                variant="circular"
                disableRipple={true}
                size="small"
                sx={{
                  boxShadow: 0,
                  backgroundColor: "#22d3ee",
                  "&:hover": { backgroundColor: "#22d3ee" }
                }}
                aria-label="add"
              >
                <Typography variant="bold">1</Typography>
              </Fab>
            </CustomTooltip>
          </div>
        )
      },
      {
        id: "action",
        Header: "Actions",
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <CustomTooltip placement="top-end" title="Liste des étapes">
              <IconButton
                onClick={(ev) => {
                  ev.stopPropagation();
                  dispatch(setEtapeTabFromAction(true));
                  props.navigate(`/apps/dossiers/${row.original.id}`);
                  dispatch(setEditDossierData(row.original));
                }}
                size="large"
              >
                <Icon>view_agenda</Icon>
              </IconButton>
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
        return dossiers;
      }
      return FuseUtils.filterArrayByString(dossiers, _searchText);
    }

    if (dossiers) {
      setFilteredData(getFilteredArray(dossiers, searchText));
    }
  }, [dossiers, searchText]);

  if (!filteredData) {
    return null;
  }
  if (isLoading) {
    return <FuseLoading />;
  }
  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no dossiers!
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
      <DossiersTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            props.navigate(`/apps/dossiers/${row.original.id}`);
            dispatch(setEtapeTabFromAction(false));
            dispatch(setEditDossierData(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default withRouter(DossiersList);
