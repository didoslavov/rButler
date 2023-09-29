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
} from '../../../public/styles/muiStyles/details.js';
import CreateListForm from '../CreateListForm/CreateListForm.jsx';
import AddUserForm from '../AddUserForm/AddUserForm.jsx';
import EditHousehold from '../EditHousehold/EditHousehold.jsx';

const Details = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const userId = JSON.parse(localStorage.getItem('userInfo')).id;
    const { householdId } = useParams();
    const [household, setHousehold] = useState({});
    const [listings, setListings] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        getUserHouseholdById(householdId, token).then((h) => {
            if (h === 'Unauthorized') {
                navigate('/profile/auth');
            }
            setHousehold(h);
        });
    }, [token, householdId]);

    const handlePopupOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setIsPopupOpen(true);
    };

    const handleEdit = () => {
        setIsEditOpen(!isEditOpen);
    };

    return (
        <div className="details-container">
            <img className="details-image" src="/details-household.jpg" alt="detail-household" />
            <div className="details-content">
                <h4 className="details-header border-bottom">{household.name}</h4>
                <p className="details-text">
                    Welcome back to the sanctuary of your residence. Your return graces us with an air of refinement and harmony.
                    Please allow us to attend to your every need and make your stay as comfortable as a well-tailored suit. How
                    may we serve you today?
                </p>
                <div className="listings-container">
                    {listings.length !== 0 ? <CreateListForm /> : null} {isEditOpen && <EditHousehold household={household} />}
                </div>
                <div className="details-speed-dial">
                    <SpeedDial sx={speedDialStyles} ariaLabel="Household Controls" direction="right" icon={<HomeSharp />}>
                        {userId === household.master && [
                            <SpeedDialAction
                                sx={speedDialActionStyles}
                                key={'Add Household Member'}
                                icon={
                                    <Link className="details-speed-dial-link" onClick={(event) => handlePopupOpen(event)}>
                                        <AddHomeSharp />
                                    </Link>
                                }
                                tooltipTitle={'Add Household Member'}
                            />,
                            <SpeedDialAction
                                onClick={handleEdit}
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
                            sx={speedDialActionStyles}
                            key={'Household Extras'}
                            icon={
                                <Link className="details-speed-dial-link">
                                    <ExtensionSharp />
                                </Link>
                            }
                            tooltipTitle={'Household Extras'}
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
                <AddUserForm
                    anchorEl={anchorEl}
                    setIsPopupOpen={setIsPopupOpen}
                    isPopupOpen={isPopupOpen}
                    setAnchorEl={setAnchorEl}
                    householdId={householdId}
                    token={token}
                />
            </div>
        </div>
    );
};

export default Details;
