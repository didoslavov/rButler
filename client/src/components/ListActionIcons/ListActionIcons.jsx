import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ListActionIconsTypes } from '../../shared/propTypes.js';
import { useSelector } from 'react-redux';

const ListActionIcons = ({ handleGoBack, handleClickDelete }) => {
    const { isHouseholdOwner, isMemberInHousehold } = useSelector((state) => state.household);
    console.log(isHouseholdOwner || isMemberInHousehold);
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
            {(isHouseholdOwner || isMemberInHousehold) && (
                <Tooltip
                    title="Delete List"
                    placement="top"
                    sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                    <IconButton aria-label="delete" size="large" sx={{ color: 'var(--dark-pink)' }} onClick={handleClickDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
};

ListActionIcons.propTypes = ListActionIconsTypes;

export default ListActionIcons;
