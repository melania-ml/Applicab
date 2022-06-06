import { motion } from "framer-motion";
import { downloadFile } from "app/main/common/functions";

//material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Icon
} from "@mui/material";
import { useTheme } from "@mui/styles";

export default function MyDocuments({ documents, caseData }) {
  const theme = useTheme();
  const onDownload = (documentLink, fileName) => {
    downloadFile(documentLink, fileName);
  };
  return (
    <>
      <div rowSpacing={1}>
        <motion.div
          className="mb-5 mb-md-0 box-shadow-dash p-5 commonBoxShadow"
          initial={{ y: 50, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          style={{ background: "#FFFFFF", padding: 5, borderRadius: 10 }}
        >
          <h1 style={{ paddingBottom: 5, color: theme.palette.primary.main }}>
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
                {documents?.length > 0 ? (
                  documents.map((item) => {
                    return (
                      <TableRow key={item?.id} hover className="max-h-80">
                        <TableCell className="font-medium">
                          {item.file_name}
                        </TableCell>
                        <TableCell className="sm:table-cell">
                          <Icon
                            onClick={() =>
                              onDownload(item.case_document, item.file_name)
                            }
                            color="inherit"
                            size="large"
                          >
                            arrow_downward
                          </Icon>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <h5 style={{ paddingTop: 15, color: "#272E41" }}>
                    No documents
                  </h5>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <motion.div
          className="mt-5 mb-5 mb-md-0 box-shadow-dash dashBoardCard commonBoxShadow"
          initial={{ y: 50, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
        >
          <h1 style={{ paddingBottom: 5, color: theme.palette.primary.main }}>
            <b>Commentaire</b>
          </h1>
          <p className="w-full resize-none" style={{ height: 140 }}>
            {caseData?.shared_comment || "No comments"}
          </p>
        </motion.div>
      </div>
    </>
  );
}
