import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import {
  setDossiersSearchText,
  setNewDossierData,
  setIsCaseAdded,
  setEtapeTabFromAction
} from "app/store/slices/dossiersSlice";
import Filters from "./Filters";

//material-ui
import { Icon, Button, Input, Paper } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function DossiersHeader() {
  const dispatch = useDispatch();
  const { searchText } = useSelector(({ dossiers }) => dossiers);
  const mainTheme = useSelector(selectMainTheme);

  return (
    <div className="flex-1 items-center justify-between p-4 for-full-scren-flex">
      <Filters />
      <div className="flex for-res-flex-direction full-screen-secondwidth">
        <div className="flex flex-1 items-center full-screen-justify-end">
          <ThemeProvider theme={mainTheme}>
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex p-4 items-center max-w-300 h-48 px-16 py-4 shadow search-bar-dossier"
            >
              <Icon color="action">search</Icon>

              <Input
                placeholder="Recherche"
                className="flex flex-1 px-16"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search"
                }}
                onChange={(ev) => dispatch(setDossiersSearchText(ev))}
              />
            </Paper>
          </ThemeProvider>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => {
              dispatch(setNewDossierData());
              dispatch(setIsCaseAdded(false));
              dispatch(setEtapeTabFromAction(false));
            }}
            component={Link}
            to="/apps/dossiers/new"
            variant="contained"
            color="secondary"
            className="w-full rounded linkButton"
          >
            Nouveau dossier
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DossiersHeader;
