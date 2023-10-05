import React from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { snackbarStyles } from '../../styles/muiStyles/muiStyles.js';

const Notification = ({ open, setOpen, message, severity }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <div>
            <Snackbar
                sx={snackbarStyles}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Notification;
