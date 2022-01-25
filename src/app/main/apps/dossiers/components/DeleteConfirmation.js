import { Dialog, AppBar, Typography, Toolbar, DialogContent, DialogActions, Button } from "@mui/material";

function DeleteConfirmation(props) {
    return (
        <Dialog
            classes={{
                paper: "m-24",
            }}
            open={props.open}
            onClose={props.onClose}
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
                    Voulez-vous vraiment supprimer ce dossier ?<br /><br />
                    TOUTES LES ÉTAPES, MESSAGES, DOCUMENTS ET NOTIFICATIONS SERONT EFFACÉS.
                </div><br />
                <DialogActions className="justify-between p-0">
                    <div>
                        <Button
                            variant="contained"
                            style={{ borderRadius: 5, background: '#BABABF' }}
                            onClick={props.onClose}
                        >
                            Annuler
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ borderRadius: 5 }}
                        >
                            Supprimer
                        </Button>
                    </div>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
export default DeleteConfirmation;
