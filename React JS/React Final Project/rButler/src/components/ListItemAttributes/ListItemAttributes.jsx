import CheckIcon from '@mui/icons-material/Check';
import { Divider, IconButton } from '@mui/material';

const ListItemAttributes = ({ itemId, handleCheckItem }) => {
    return (
        <>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }} />
            <IconButton aria-label="delete" size="medium" onClick={() => handleCheckItem(itemId)}>
                <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
            </IconButton>
        </>
    );
};

export default ListItemAttributes;
