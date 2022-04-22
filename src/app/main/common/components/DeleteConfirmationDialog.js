import {
  Dialog,
  AppBar,
  Typography,
  Toolbar,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

export const DeleteConfirmationDialog = (props) => {
  const { open, onClose, onDelete, title, subTitle } = props;
  return (
    <Dialog
      classes={{
        paper: "m-24"
      }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Suppression
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <div>
          {title}
          {title && (
            <>
              <br />
              <br />
            </>
          )}
          {subTitle}
        </div>
        <br />
        <DialogActions className="justify-between p-0">
          <div>
            <Button
              variant="contained"
              style={{ borderRadius: 5, background: "#BABABF" }}
              onClick={onClose}
            >
              Annuler
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: 5 }}
              onClick={onDelete}
            >
              Supprimer
            </Button>
          </div>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteConfirmationDialog;
