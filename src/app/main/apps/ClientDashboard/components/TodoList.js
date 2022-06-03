import { motion } from "framer-motion";
import { getFormattedDateTime } from "app/main/common/functions";
import { CustomTooltip } from "app/main/common/components";

//material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function TodoList({ etapes }) {
  const theme = useTheme();
  return (
    <motion.div
      className="mb-5 mb-md-0 box-shadow-dash for-width-todo dashBoardCard h-full commonBoxShadow"
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
    >
      <h1 style={{ padding: 8, color: theme.palette.primary.main }}>
        <b>Etapes</b>
      </h1>
      <div className="table-responsive-todo">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Étapes</TableCell>
              <TableCell className="sm:table-cell">Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {etapes &&
              etapes.length > 0 &&
              etapes.map((item) => {
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
                    <TableCell className="font-medium etapeTextWidthLimit">
                      {item.sub_name || item.name}
                    </TableCell>
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
