import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "@lodash";
import { motion } from "framer-motion";
import { getClientDashboardData } from "app/store/slices/clientDashboardSlice";

//material-ui
import { List, ListItem, ListItemText } from "@mui/material";

const SidebarContent = () => {
  const dispatch = useDispatch();
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const { caseList } = useSelector(({ clientDashboard }) => clientDashboard);

  return (
    <div>
      <motion.div
        className="mb-5 mb-md-0 mt-5 mt-md-0 box-shadow-dash h-full"
        initial={{ y: 50, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
      >
        <h3 className="py-10 font-semibold text-black">Dossier</h3>
        <List dense>
          {caseList?.length > 0 &&
            caseList.map((caseObj, id) => (
              <>
                <ListItem
                  button
                  onClick={() => {
                    setSelectedListIndex(id);
                    dispatch(getClientDashboardData(caseObj?.id));
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
