import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Icon
} from "@mui/material";

const todos = [
  {
    id: 1,
    Étapes: "Rendez-vous-de travail",
    client: "Adhoc",
    status: "A faire",
    date: "06/01/2022 12:54"
  },
  {
    id: 2,
    Étapes: "Take a look",
    client: "Adhoc",
    status: "A faire",
    date: "07/01/2022 06:10"
  }
];

export default function TodoList() {
  return (
    <motion.div
      className="mb-5 mb-md-0 ml-lg-5 ml-0 box-shadow-dash for-width-todo"
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
              <TableCell className="sm:table-cell">Client</TableCell>
              <TableCell className="sm:table-cell">Statut</TableCell>
              <TableCell className="sm:table-cell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((item) => {
              return (
                <TableRow key={item?.id} hover className="h-64">
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell className="font-medium">{item.Étapes}</TableCell>
                  <TableCell className="sm:table-cell">{item.client}</TableCell>
                  <TableCell className="sm:table-cell">{item.status}</TableCell>
                  <TableCell className="sm:table-cell">
                    <Icon>arrow_right_alt</Icon>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
