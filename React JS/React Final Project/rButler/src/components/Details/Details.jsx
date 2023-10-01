import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addUserToHousehold, getUserHouseholdById } from '../../services/householdsService.js';
import { IconButton, InputLabel, MenuItem, Paper, Popover, Select, SpeedDial, SpeedDialAction } from '@mui/material';
import { AddHomeSharp, Close, ExtensionSharp, HomeSharp, ModeEditSharp, ShareRounded } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import {
    iconButtonStyles,
    menuItemStyles,
    paperStyles,
    selectStyles,
    speedDialActionStyles,
    speedDialStyles,
} from '../../styles/muiStyles/muiStyles.js';
import CreateListForm from '../CreateListForm/CreateListForm.jsx';
import AddUserForm from '../AddUserForm/AddUserForm.jsx';
import EditHousehold from '../EditHousehold/EditHousehold.jsx';
import Spinner from '../LoadingSpinner/Spinner.jsx';
import Listings from '../Listings/Listings.jsx';

const Details = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    const { householdId } = useParams();
    const [household, setHousehold] = useState({});
    const [listings, setListings] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserHouseholdById(householdId, token).then((h) => {
            if (h === 'Unauthorized') {
                navigate('/profile/auth');
            }
            setHousehold(h);
            setIsLoading(false);
        });
    }, [token, householdId]);

    const handlePopupOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setIsPopupOpen(true);
    };

    const handleShowEditForm = () => {
        setIsEditOpen(!isEditOpen);
        setIsCreateOpen(false);
        setIsAddMemberOpen(false);
    };

    const handleShowCreateForm = () => {
        setIsCreateOpen(!isCreateOpen);
        setIsEditOpen(false);
        setIsAddMemberOpen(false);
    };

    const handleShowAddMemberForm = () => {
        setIsAddMemberOpen(!isAddMemberOpen);
        setIsCreateOpen(false);
        setIsEditOpen(false);
    };

    return (
        <div className="details-container">
            <img className="details-image" src="/details-household.jpg" alt="detail-household" />
            <div className="details-content">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <h4 className="details-header border-bottom">{household.name}</h4>
                        <p className="details-text">
                            Welcome back to the sanctuary of your residence. Your return graces us with an air of refinement and
                            harmony. Please allow us to attend to your every need and make your stay as comfortable as a
                            well-tailored suit. How may we serve you today?
                        </p>

                        <div className="listings-container">
                            {!isEditOpen && !isCreateOpen && !isAddMemberOpen ? <Listings /> : null}
                            {!isEditOpen && !isAddMemberOpen && isCreateOpen ? <CreateListForm /> : null}
                            {!isEditOpen && !isCreateOpen && isAddMemberOpen ? <AddUserForm /> : null}
                            {!isCreateOpen && !isAddMemberOpen && isEditOpen ? (
                                <EditHousehold household={household} token={token} />
                            ) : null}
                        </div>
                    </>
                )}
                <div className="details-speed-dial">
                    <SpeedDial sx={speedDialStyles} ariaLabel="Household Controls" direction="right" icon={<HomeSharp />}>
                        {userId === household.master && [
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
                        ]}
                        <SpeedDialAction
                            onClick={handleShowCreateForm}
                            sx={speedDialActionStyles}
                            key={'Create List'}
                            icon={
                                <Link className="details-speed-dial-link">
                                    <ExtensionSharp />
                                </Link>
                            }
                            tooltipTitle={'Create Household'}
                        />
                        <SpeedDialAction
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
            </div>
        </div>
    );
};

export default Details;
