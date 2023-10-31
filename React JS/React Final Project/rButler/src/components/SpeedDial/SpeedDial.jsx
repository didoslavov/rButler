import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SpeedDial, SpeedDialAction } from '@mui/material';
import { AddHomeSharp, ChecklistSharp, HomeSharp, ModeEditSharp, ShareRounded } from '@mui/icons-material';
import { speedDialActionStyles, speedDialStyles } from '../../styles/muiStyles/muiStyles.js';

import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const SpeedDialMenu = () => {
    const dispatch = useDispatch();
    const { isHouseholdOwner } = useSelector((state) => state.household);
    const { isEditOpen, isCreateOpen, isAddMemberOpen, isShareOpen } = useSelector((state) => state.formVisibility);

    const handleShowEditForm = () => {
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: !isEditOpen }));
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isShareOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isAddMemberOpen', value: false }));
    };

    const handleShowCreateForm = () => {
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: !isCreateOpen }));
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isShareOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isAddMemberOpen', value: false }));
    };

    const handleShowAddMemberForm = () => {
        dispatch(setFormVisibility({ formType: 'isAddMemberOpen', value: !isAddMemberOpen }));
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isShareOpen', value: false }));
    };

    const handleShowShare = () => {
        dispatch(setFormVisibility({ formType: 'isShareOpen', value: !isShareOpen }));
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isAddMemberOpen', value: false }));
    };

    return (
        <div className="details-speed-dial">
            <SpeedDial sx={speedDialStyles} ariaLabel="Household Controls" direction="right" icon={<HomeSharp />}>
                {isHouseholdOwner && [
                    <SpeedDialAction
                        sx={speedDialActionStyles}
                        key={'Add Household Member'}
                        icon={
                            <Link className="details-speed-dial-link" onClick={handleShowAddMemberForm}>
                                <AddHomeSharp />
                            </Link>
                        }
                        tooltipTitle={'Add Household Member'}
                    />,
                    <SpeedDialAction
                        onClick={handleShowEditForm}
                        sx={speedDialActionStyles}
                        key={'Edit Household'}
                        icon={
                            <Link className="details-speed-dial-link">
                                <ModeEditSharp />
                            </Link>
                        }
                        tooltipTitle={'Edit Household'}
                    />,
                    <SpeedDialAction
                        onClick={handleShowCreateForm}
                        sx={speedDialActionStyles}
                        key={'Create List'}
                        icon={
                            <Link className="details-speed-dial-link">
                                <ChecklistSharp />
                            </Link>
                        }
                        tooltipTitle={'Create List'}
                    />,
                ]}
                <SpeedDialAction
                    onClick={handleShowShare}
                    sx={speedDialActionStyles}
                    key={'Share Household'}
                    icon={
                        <Link className="details-speed-dial-link">
                            <ShareRounded />
                        </Link>
                    }
                    tooltipTitle={'Share Household'}
                />
            </SpeedDial>
        </div>
    );
};

export default SpeedDialMenu;
