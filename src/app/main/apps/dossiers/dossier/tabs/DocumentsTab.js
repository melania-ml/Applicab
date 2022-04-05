import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import { Icon, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "app/store/slices/dossiersSlice";
import { getFormattedDateTime } from "app/main/common/functions";

function createData(nom, Propriétaire, Date_de_partage, Telecharger) {
  return { nom, Propriétaire, Date_de_partage, Telecharger };
}

const rows = [
  createData("lettre-de-mission.pdf", "moi", "18 janv. 2022", 24),
  createData("tcom-paris.pdf", "Melania Munoz", "22 oct. 2022", 37),
  createData("hgbbh-detro-lesar", "Alex", "8 nov. 2022", 6.0),
  createData("lettre-de-mission.pdf", "Roman", "28 dec. 2022", 67),
  createData(" tcom-paris.pdf", "Jimmy", "11 janv. 2022", 49)
];

function DocumentsTab() {
  const dispatch = useDispatch();
  const {
    editDossierData: { data },
    documents
  } = useSelector(({ dossiers }) => dossiers);

  useEffect(() => {
    if (data?.id) {
      dispatch(getDocuments(data.id));
    }
  }, [data]);

  const onDownload = (documentLink) => {
    window.location.href = documentLink;
  };

  return (
    <div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="flex flex-auto w-full max-h-full"
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nom</TableCell>
                <TableCell align="left">Étape</TableCell>
                <TableCell align="left">Date de partage</TableCell>
                <TableCell align="center">Télécharger</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                >
                  <TableCell align="left">{row.file_name}</TableCell>
                  <TableCell align="left">{row.case_task_id.name}</TableCell>
                  <TableCell align="left">
                    {getFormattedDateTime({
                      date: row.created_date,
                      format: "DD MMM. YYYY"
                    })}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => onDownload(row.case_document)}
                      color="inherit"
                      size="large"
                    >
                      <Icon>arrow_downward</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </motion.div>
    </div>
  );
}

export default DocumentsTab;
