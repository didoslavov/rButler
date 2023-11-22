import { useDispatch, useSelector } from 'react-redux';

import { SpeedDial, SpeedDialAction } from '@mui/material';
import { AddHomeSharp, ChecklistSharp, HomeSharp, ModeEditSharp, ShareRounded } from '@mui/icons-material';
import { speedDialActionStyles, speedDialStyles } from '../../styles/muiStyles/muiStyles.js';

import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const SpeedDialMenu = () => {
    const dispatch = useDispatch();
    const { isHouseholdOwner, isMemberInHousehold } = useSelector((state) => state.household);
    const formVisibility = useSelector((state) => state.formVisibility);

    const handleShowForm = (formType) => {
        const formTypes = ['isEditOpen', 'isCreateOpen', 'isAddMemberOpen', 'isShareOpen'];
        formTypes.forEach((type) => {
            dispatch(setFormVisibility({ formType: type, value: false }));
        });

        dispatch(setFormVisibility({ formType, value: !formVisibility[formType] }));
    };

    return (
        <div className="details-speed-dial">
            <SpeedDial sx={speedDialStyles} ariaLabel="Household Controls" direction="up" icon={<HomeSharp />}>
                {isHouseholdOwner && [
                    <SpeedDialAction
                        sx={speedDialActionStyles}
                        key={'Add Household Member'}
                        icon={
                            <div className="details-speed-dial-link" onClick={() => handleShowForm('isAddMemberOpen')}>
                                <AddHomeSharp />
                            </div>
                        }
                        tooltipTitle={'Manage Household Members'}
                    />,
                    <SpeedDialAction
                        onClick={() => handleShowForm('isEditOpen')}
                        sx={speedDialActionStyles}
                        key={'Edit Household'}
                        icon={
                            <div className="details-speed-dial-link">
                                <ModeEditSharp />
                            </div>
                        }
                        tooltipTitle={'Edit Household'}
                    />,
                ]}
                {isMemberInHousehold && (
                    <SpeedDialAction
                        onClick={() => handleShowForm('isCreateOpen')}
                        sx={speedDialActionStyles}
                        key={'Create List'}
                        icon={
                            <div className="details-speed-dial-link">
                                <ChecklistSharp />
                            </div>
                        }
                        tooltipTitle={'Create List'}
                    />
                )}
                <SpeedDialAction
                    onClick={() => handleShowForm('isShareOpen')}
                    sx={speedDialActionStyles}
                    key={'Share Household'}
                    icon={
                        <div className="details-speed-dial-link">
                            <ShareRounded />
                        </div>
                    }
                    tooltipTitle={'Share Household'}
                />
            </SpeedDial>
        </div>
    );
};

export default SpeedDialMenu;
