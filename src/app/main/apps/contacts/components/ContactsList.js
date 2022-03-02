import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import { Typography, Badge } from "@mui/material";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactsMultiSelectMenu from "./ContactsMultiSelectMenu";
import ContactsTable from "./ContactsTable";
import { openEditContactDialog, selectContacts } from "../store/contactsSlice";

function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(
    ({ contactsApp }) => contactsApp.contacts.searchText
  );
  const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: ({ selectedFlatRows }) => {
          const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

          return (
            selectedFlatRows.length > 0 && (
              <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
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
        Header: "Type",
        accessor: "client_type",
        Cell: ({ row }) => {
          return <span>{row.original.client_type?.client_type}</span>;
        },
        className: "font-medium",
        sortable: true
      },
      {
        Header: "Titre",
        accessor: "title",
        Cell: ({ row }) => {
          return <span>{row.original.title?.title}</span>;
        },
        className: "font-medium",
        sortable: true
      },
      {
        Header: "Nom",
        accessor: "last_name",
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.first_name} {row.original.last_name}
            </span>
          );
        },
        sortable: true
      },
      {
        Header: "Téléphone",
        accessor: "phone_number",
        sortable: true
      },
      {
        Header: "Email",
        accessor: "email",
        sortable: true
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return (
            <div className="flex items-center">
              <Badge
                className="mr-3"
                color="success"
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor:
                      row.original.status === "Actif" ? "#78C5A0" : "#C4C4C4"
                  }
                }}
              />
              <p>{row.original.status}</p>
            </div>
          );
        },
        sortable: true
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
      <ContactsTable
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

export default ContactsList;
