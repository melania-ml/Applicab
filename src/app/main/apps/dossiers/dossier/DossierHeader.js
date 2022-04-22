import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getWholeCaseName } from "app/main/common/functions";

//material-ui
import { Icon, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function DossierHeader() {
  const theme = useTheme();
  const {
    editDossierData: { data, type }
  } = useSelector(({ dossiers }) => dossiers);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
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
          ></motion.div>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 ml-24 truncate font-semibold">
                {type === "edit"
                  ? getWholeCaseName(
                      data.case_name,
                      data.procedure.procedure_type,
                      data.created_date,
                      data.unique_code
                    )
                  : "Ajouter un nouveau dossier"}
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DossierHeader;
