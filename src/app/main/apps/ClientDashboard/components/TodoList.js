import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getFormattedDateTime } from "app/main/common/functions";

//material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@mui/material";

export default function TodoList() {
  const { todos } = useSelector(({ clientDashboard }) => clientDashboard);
  return (
    <motion.div
      className="mb-5 mb-md-0 box-shadow-dash for-width-todo dashBoardCard h-full"
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
    >
      <h1 style={{ padding: 8, color: "#272E41" }}>
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
                <TableRow key={item?.id} hover className="h-34 todo">
                  <TableCell className="font-medium">
                    {item.notification_date
                      ? getFormattedDateTime({
                          date: item.notification_date,
                          format: "DD/MM/YYYY HH:mm"
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="sm:table-cell">
                    {item.status || "-"}
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
