import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";

const todos = [
  {
    id: 1,
    Étapes: "Rendez-vous-de travail",
    client: "Adhoc",
    status: "A faire",
    date: "06/01/2022 12:54",
  },
  {
    id: 2,
    Étapes: "Take a look",
    client: "Adhoc",
    status: "A faire",
    date: "07/01/2022 06:10",
  },
];

export default function TodoList() {
  return (
    <motion.div
      className="mb-5 mb-md-0 ml-lg-5 ml-0 box-shadow-dash for-width-todo dashBoardCard"
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
    >
      <h1 style={{ padding: 8 }}>
        <b>To do</b>
      </h1>
      <div className="table-responsive">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Étapes</TableCell>
              <TableCell className="sm:table-cell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((item) => {
              return (
                <TableRow key={item.id} hover className="h-34 todo">
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell className="font-medium">{item.Étapes}</TableCell>
                  <TableCell className="sm:table-cell">{item.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// export default function VariableWidthGrid() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={3}>
//         <Grid item xs="auto">
//           <Item>variable width content</Item>
//         </Grid>
//         <Grid item xs={6}>
//           <Item>xs=6</Item>
//         </Grid>
//         <Grid item xs>
//           <Item>xs</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );