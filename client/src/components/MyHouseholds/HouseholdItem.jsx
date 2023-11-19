import { Chip } from '@mui/material';
import { chipStyles } from '../../styles/muiStyles/muiStyles.js';

const HouseholdItem = ({ household, isMaster }) => {
    return (
        <li className="household">
            <div className="chip-container">
                <Chip sx={chipStyles} label={isMaster ? 'master' : 'resident'} />
            </div>
            <h4 className="household-header border-bottom">{household.name}</h4>
            <p>{household.presentation}</p>
        </li>
    );
};

export default HouseholdItem;
