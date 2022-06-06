import { useState } from "react";
import _ from "@lodash";
import { motion } from "framer-motion";
import { CustomTooltip } from "app/main/common/components";

//material-ui
import { List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SidebarContent = ({ caseList, getCallClientDashboard }) => {
  const theme = useTheme();
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  return (
    <div>
      <motion.div
        className="mb-5 mb-md-0 mt-5 mt-md-2 box-shadow-dash h-3/6 sidebarContent commonBoxShadow"
        initial={{ y: 50, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
      >
        <h3
          className="font-semibold"
          style={{ color: theme.palette.primary.main }}
        >
          Dossier
        </h3>
        <List dense className="-mb-8">
          {caseList?.length > 0 &&
            caseList.map((caseObj, id) => (
              <>
                <ListItem
                  className="max-h-40 -mb-1"
                  button
                  onClick={() => {
                    setSelectedListIndex(id);
                    getCallClientDashboard(caseObj?.id);
                  }}
                  style={{
                    background: id === selectedListIndex && "#C4C4C4"
                  }}
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
