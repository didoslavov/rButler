import { Chip } from '@mui/material';
import { chipStyles } from '../../styles/muiStyles/muiStyles.js';

const HouseholdItem = ({ household }) => {
    return (
        <li className="household">
            <div className="chip-container">
                <Chip sx={chipStyles} label={'Owner: ' + household.master.username} />
            </div>
            <h4 className="border-bottom">{household.name}</h4>
            <p>{household.presentation}</p>
        </li>
    );
};

export default HouseholdItem;
