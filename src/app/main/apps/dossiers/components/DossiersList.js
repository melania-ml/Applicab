import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { ListItemIcon, ListItemText, Tooltip, styled, tooltipClasses, Typography } from '@mui/material';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DossiersMultiSelectMenu from './DossiersMultiSelectMenu';
import DossiersTable from './DossiersTable';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import {
  openEditContactDialog,
  removeContact,
  toggleStarredContact,
  selectContacts,
} from '../store/dossiersSlice';

function DossiersList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const [rowId, setRowId] = useState(null);

  const CusstomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#252E3E',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#252E3E',
    },
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
        accessor: 'avatar',
        Cell: ({ row }) => {
          return null;
          // <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
        },
        className: 'justify-center',
        width: 64,
        sortable: false,
      },
      {
        Header: 'Nom',
        accessor: 'company',
        sortable: true,
      },
      {
        Header: 'Procédure',
        accessor: 'nickname',
        sortable: true,
      },
      {
        Header: 'Type',
        accessor: 'name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Nature',
        accessor: 'lastName',
        sortable: true,
      },
      {
        Header: 'Date de création',
        accessor: 'createddata',
        sortable: true,
      },
      {
        Header: 'Statut',
        accessor: 'jobTitle',
        sortable: true,
      },
      {
        Header: 'Msg',
        className: 'font-medium',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <CusstomTooltip placement="top-end" title="Non lus et non envoyé">
              <Fab variant="circular" disableRipple={true} size="small" sx={{ boxShadow: 0, backgroundColor: "#22d3ee", "&:hover": { backgroundColor: "#22d3ee" } }} aria-label="add">
                <Typography variant="bold">1</Typography>
              </Fab>
            </CusstomTooltip>
          </div>
        ),
      },
      {
        id: 'action',
        Header: 'Action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <CusstomTooltip placement="top-end" title="Liste des étapes">
              <IconButton
                onClick={(ev) => {
                  ev.stopPropagation();
                  setRowId(row.original.id);
                }}
                size="large"
              >
                <Icon>call_made</Icon>
              </IconButton>
            </CusstomTooltip>
          </div>
        ),
      },
    ],
    [dispatch, user.starred]
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
          There are no contacts!
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
            dispatch(openEditContactDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default DossiersList;
