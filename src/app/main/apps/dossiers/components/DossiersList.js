import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import DossiersMultiSelectMenu from "./DossiersMultiSelectMenu";
import DossiersTable from "./DossiersTable";
import {
  getFormattedDateTime,
  getProcedureCode
} from "app/main/common/functions";
import {
  selectDossiers,
  setEditDossierData,
  setEtapeTabFromAction,
  setMessageTabFromAction,
  setGroupId,
  setCaseId,
  getMessages
} from "app/store/slices/dossiersSlice";
import { CustomTooltip } from "app/main/common/components/CustomTooltip";

//material-ui
import { Typography, IconButton, Fab, Icon } from "@mui/material";

function DossiersList(props) {
  const dispatch = useDispatch();
  const dossiers = useSelector(selectDossiers);
  const { searchText, isLoading, groupId } = useSelector(
    ({ dossiers }) => dossiers
  );

  const [filteredData, setFilteredData] = useState(null);

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
                onClick={(ev) => {
                  ev.stopPropagation();
                  dispatch(setCaseId(row.original.id));
                  dispatch(setGroupId(row.original.case_group.id));
                  dispatch(setEtapeTabFromAction(false));
                  dispatch(setMessageTabFromAction(true));
                  props.navigate(`/apps/dossiers/${row.original.id}`);
                  dispatch(setEditDossierData(row.original));
                  dispatch(getMessages(row.original.id, groupId));
                }}
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
                <Typography variant="bold">
                  {row.original.case_group.un_read_count}
                </Typography>
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
                  dispatch(setCaseId(row.original.id));
                  dispatch(setGroupId(row.original.case_group.id));
                  dispatch(setMessageTabFromAction(false));
                  dispatch(setEtapeTabFromAction(true));
                  props.navigate(`/apps/dossiers/${row.original.id}`);
                  dispatch(setEditDossierData(row.original));
                  dispatch(getMessages(row.original.id, groupId));
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
      className="flex w-full"
    >
      <DossiersTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            props.navigate(`/apps/dossiers/${row.original.id}`);
            dispatch(setCaseId(row.original.id));
            dispatch(setGroupId(row.original.case_group.id));
            dispatch(setMessageTabFromAction(false));
            dispatch(setEtapeTabFromAction(false));
            dispatch(setEditDossierData(row.original));
            dispatch(getMessages(row.original.id, groupId));
          }
        }}
      />
    </motion.div>
  );
}

export default withRouter(DossiersList);
