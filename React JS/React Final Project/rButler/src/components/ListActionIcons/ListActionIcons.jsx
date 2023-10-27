import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListActionIcons = ({ handleGoBack, handleClickDelete, user }) => {
    return (
        <div className="icons">
            <Tooltip
                title="Back to Lists"
                placement="top"
                sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                <IconButton aria-label="back" size="large" sx={{ color: 'var(--dark-blue)' }} onClick={handleGoBack}>
                    <ArrowBackIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
            {user && (
                <>
                    <Tooltip
                        title="Delete List"
                        placement="top"
                        sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                        <IconButton
                            aria-label="delete"
                            size="large"
                            sx={{ color: 'var(--dark-pink)' }}
                            onClick={handleClickDelete}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </div>
    );
};

export default ListActionIcons;
