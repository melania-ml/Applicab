import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import { motion } from "framer-motion";
import { getCaseList } from "app/store/slices/clientDashboardSlice";

//material-ui
import { List, ListItem, ListItemText } from "@mui/material";

const SidebarContent = () => {
  const dispatch = useDispatch();
  const {
    data: { id }
  } = useSelector(({ auth }) => auth.user);
  const { caseList } = useSelector(({ clientDashboard }) => clientDashboard);

  useEffect(() => {
    dispatch(getCaseList(id));
  }, []);

  return (
    <div className="h-full">
      <motion.div
        className="mb-5 mb-md-0 mt-5 mt-md-0 box-shadow-dash h-full"
        initial={{ y: 50, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
      >
        <h3 className="py-10 font-semibold text-black">Dossier</h3>
        <List dense>
          {caseList?.length > 0 &&
            caseList.map((caseObj) => (
              <>
                <ListItem button>
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
