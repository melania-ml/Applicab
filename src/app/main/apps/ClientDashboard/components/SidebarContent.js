import { useState } from "react";
import _ from "@lodash";
import { motion } from "framer-motion";

//material-ui
import { List, ListItem, ListItemText } from "@mui/material";

const SidebarContent = ({ caseList, getCallClientDashboard }) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  return (
    <div>
      <motion.div
        className="mb-5 mb-md-0 mt-5 mt-md-0 box-shadow-dash h-full"
        initial={{ y: 50, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
      >
        <h3 className="py-10 font-semibold">Dossier</h3>
        <List dense>
          {caseList?.length > 0 &&
            caseList.map((caseObj, id) => (
              <>
                <ListItem
                  button
                  onClick={() => {
                    setSelectedListIndex(id);
                    getCallClientDashboard(caseObj?.id);
                  }}
                  style={{ background: id === selectedListIndex && "#C4C4C4" }}
                >
                  <ListItemText primary={caseObj.case_name} />
                </ListItem>
              </>
            ))}
        </List>
      </motion.div>
    </div>
  );
};

export default SidebarContent;
