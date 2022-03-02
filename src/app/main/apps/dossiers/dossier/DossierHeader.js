import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import _ from "@lodash";

function DossierHeader() {
  const theme = useTheme();
  return (
    <div className="flex flex-1 w-full items-center justify-between res-flex-direction">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/dossiers/all"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="sm:flex mx-4 font-medium">Tous les dossier</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            <img
              className="w-32 sm:w-48 rounded"
              src="assets/images/ecommerce/product-image-placeholder.png"
            />
          </motion.div>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                Ajouter un nouveau dossier
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        className="flex mt-3 mt-md-0"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          style={{ borderRadius: 0 }}
        >
          Enregistrer
        </Button>
      </motion.div>
    </div>
  );
}

export default DossierHeader;
