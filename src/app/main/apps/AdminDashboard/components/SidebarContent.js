import _ from "@lodash";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { cloneElement, memo } from "react";
import { motion } from "framer-motion";

function SidebarContent() {
  function generate(element) {
    return _(5).times((value) =>
      cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <div className="h-full">
      <motion.div
        className="mb-5 mb-md-0 box-shadow-dash h-full"
        initial={{ y: 50, opacity: 0.8 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
        style={{ background: "#FFFFFF", padding: 15, borderRadius: 10 }}
      >
        <h1 className="py-16 font-semibold">Dossier</h1>
        <List dense>
          {generate(
            <ListItem button>
              <ListItemText primary="Tous Altata" />
            </ListItem>
          )}
        </List>
      </motion.div>
    </div>
  );
}

export default memo(SidebarContent);
