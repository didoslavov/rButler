import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { confirmDialogStyles } from '../../styles/muiStyles/muiStyles.js';

import { AlertDialogPropTypes } from '../../shared/propTypes.js';

const AlertDialog = ({ open, handleClose, handleDelete, message }) => {
    return (
        <Dialog
            sx={confirmDialogStyles}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Are you sure you want to do this ?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDelete}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

AlertDialog.propTypes = AlertDialogPropTypes;

export default AlertDialog;
