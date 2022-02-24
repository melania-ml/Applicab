import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import { Icon } from "@mui/material";

function createData(
  type,
  nom,
  Propriétaire,
  Date_de_partage,
  taille,
  Telecharger
) {
  return { type, nom, Propriétaire, Date_de_partage, taille, Telecharger };
}

const rows = [
  createData(
    "PDF",
    "lettre-de-mission.pdf",
    "moi",
    "18 janv. 2022",
    "320.91 KB",
    24
  ),
  createData(
    "PDF ",
    "tcom-paris.pdf",
    "Melania Munoz",
    "22 oct. 2022",
    "20.91 KB",
    37
  ),
  createData(
    "PDF",
    "hgbbh-detro-lesar",
    "Alex",
    "8 nov. 2022",
    "191 KB 24",
    6.0
  ),
  createData(
    "PD",
    "lettre-de-mission.pdf",
    "Roman",
    "28 dec. 2022",
    "520.91 KB",
    67
  ),
  createData(
    "PDF",
    " tcom-paris.pdf",
    "Jimmy",
    "11 janv. 2022",
    "820.91 KB",
    49
  ),
];

function DocumentsTab() {
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
                <TableCell>Type</TableCell>
                <TableCell align="left">Nom</TableCell>
                <TableCell align="left">Propriétaire</TableCell>
                <TableCell align="left">Date de partage</TableCell>
                <TableCell align="left">Taille</TableCell>
                <TableCell align="center">Télécharger</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{row.nom}</TableCell>
                  <TableCell align="left">{row.Propriétaire}</TableCell>
                  <TableCell align="left">{row.Date_de_partage}</TableCell>
                  <TableCell align="left">{row.taille}</TableCell>
                  <TableCell align="center">
                    <Icon
                      style={{
                        color: "white",
                        fontSize: "xx-large",
                        margin: "10px",
                        borderRadius: "25px",
                        backgroundColor: "#1BD7EF",
                      }}
                    >
                      arrow_downward
                    </Icon>
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
