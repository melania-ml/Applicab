import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getDocuments } from "app/store/slices/dossiersSlice";
import { getFormattedDateTime } from "app/main/common/functions";

// material-ui
import {
  Icon,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

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

  if (documents.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no documents!
        </Typography>
      </div>
    );
  }

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
                  key={row?.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                >
                  <TableCell align="left">{row.file_name}</TableCell>
                  <TableCell align="left">
                    {row.case_task_id?.sub_name || row.case_task_id?.name}
                  </TableCell>
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
        </TableContainer>
      </motion.div>
    </div>
  );
}

export default DocumentsTab;
