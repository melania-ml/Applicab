import { motion } from "framer-motion";

//material-ui
import { Typography } from "@mui/material";

export default function DashboardHeader() {
  return (
    <div className="bgm-10 flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      >
        <Typography
          color="inherit"
          className="text-32 font-bold tracking-tight"
        >
          Mon espace client
        </Typography>
      </motion.div>
    </div>
  );
}
