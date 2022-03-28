import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Icon,
  Card,
} from "@mui/material";

const docValues = [
  {
    id: 1,
    docType: "PDF lettre-de-mission.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
  {
    id: 2,
    docType: "PDF tcom-paris.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
  {
    id: 2,
    docType: "PDF tcom-paris.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
  {
    id: 2,
    docType: "PDF tcom-paris.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
  {
    id: 2,
    docType: "PDF tcom-paris.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
  {
    id: 2,
    docType: "PDF tcom-paris.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
  {
    id: 2,
    docType: "PDF tcom-paris.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
  {
    id: 2,
    docType: "PDF tcom-paris.pdf",
    docIcon: (
      <Icon
        style={{
          color: "white",
          fontSize: "medium",
          margin: "10px",
          borderRadius: "25px",
          backgroundColor: "black",
        }}
      >
        arrow_downward
      </Icon>
    ),
    docName: "PDF",
  },
];
export default function MyDocuments() {
  return (
    <>
      {/* <Card>
        <h1 style={{ padding: 8 }}>
          <b>Commentire</b>
        </h1>
        <textarea>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
          mauris cursus mattis molestie. Ligula ullamcorper malesuada proin
          libero nunc consequat interdum.
        </textarea>
      </Card> */}
      <div rowSpacing={1}>
        <motion.div
          className="mb-5 mb-md-0 box-shadow-dash p-5"
          initial={{ y: 50, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          style={{ background: "#FFFFFF", padding: 5, borderRadius: 10 }}
        >
          <h1 style={{ paddingBottom: 5, color: "#272E41" }}>
            <b>Mes documents</b>
          </h1>
          <div className="table-responsive">
            <Table className="h-24">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="sm:table-cell"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {docValues.map((item) => {
                  return (
                    <TableRow key={item.id} hover className="max-h-80">
                      <TableCell className="font-medium">
                        {item.docName}
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.docType}
                      </TableCell>
                      <TableCell className="sm:table-cell">
                        {item.docIcon}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <motion.div
          className="mt-5 mb-md-0 box-shadow-dash dashBoardCard"
          initial={{ y: 50, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
        >
          <h1 style={{ paddingBottom: 5, color: "#272E41" }}>
            <b>Commentire</b>
          </h1>
          <textarea className="w-full resize-none" style={{ height: 140 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh
            mauris cursus mattis molestie. Ligula ullamcorper malesuada proin
            libero nunc consequat interdum.
          </textarea>
        </motion.div>
      </div>
    </>
  );
}
