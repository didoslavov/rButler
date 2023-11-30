import { useDispatch } from 'react-redux';

import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { snackbarStyles } from '../../styles/muiStyles/muiStyles.js';

import { NotificationTypes } from '../../shared/propTypes.js';
import { clearNotification } from '../../redux/slices/notificationSlice.js';

const Notification = ({ open, message = [], severity }) => {
    const dispatch = useDispatch();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(clearNotification());
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
                autoHideDuration={5000}
                onClose={handleClose}
                action={action}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={severity}>
                    {message.map((m, i) => (
                        <p key={i}>{m}</p>
                    ))}
                </Alert>
            </Snackbar>
        </div>
    );
};

Notification.propTypes = NotificationTypes;

export default Notification;
