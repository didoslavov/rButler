import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserHouseholdById } from '../../services/householdsService.js';
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

const Details = () => {
    const token = localStorage.getItem('authToken');
    const { householdId } = useParams();
    const { register, handleSubmit } = useForm();
    const [household, setHousehold] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [role, setRole] = useState('Resident');

    useEffect(() => {
        getUserHouseholdById(householdId, token).then((h) => setHousehold(h));
    }, [token]);

    const handlePopupOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setAnchorEl(null);
        setIsPopupOpen(false);
    };

    const onSelect = (e) => {
        setRole(e.target.value);
    };

    const onAddUserToHousehold = ({ username, role }) => {
        console.log(username, role);
    };

    return (
        <div className="details-container">
            <img className="details-image" src="/details-household.jpg" alt="detail-household" />
            <div className="details-content">
                <h4 className="details-header border-bottom">{household.name}</h4>
                <p className="details-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt exercitationem ratione suscipit porro nihil
                    beatae doloremque ullam, nobis voluptate perferendis!
                </p>
                <div className="details-speed-dial">
                    <SpeedDial sx={speedDialStyles} ariaLabel="Household Controls" direction="right" icon={<HomeSharp />}>
                        <SpeedDialAction
                            sx={speedDialActionStyles}
                            key={'Add Household Member'}
                            icon={
                                <Link className="details-speed-dial-link" onClick={(event) => handlePopupOpen(event)}>
                                    <AddHomeSharp />
                                </Link>
                            }
                            tooltipTitle={'Add Household Member'}
                        />
                        <SpeedDialAction
                            sx={speedDialActionStyles}
                            key={'Edit Household'}
                            icon={
                                <Link className="details-speed-dial-link">
                                    <ModeEditSharp />
                                </Link>
                            }
                            tooltipTitle={'Edit Household'}
                        />
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
                <Popover
                    open={isPopupOpen}
                    anchorEl={anchorEl}
                    onClose={handlePopupClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    <Paper sx={paperStyles}>
                        <IconButton aria-label="close" onClick={handlePopupClose} sx={iconButtonStyles}>
                            <Close />
                        </IconButton>
                        <div className="popup-form-container"></div>
                        <h4 className="border-bottom">Add household member</h4>
                        <form className="popup-form" onSubmit={handleSubmit(onAddUserToHousehold)}>
                            <label htmlFor="username">Username</label>
                            <input
                                className="details-popup-input"
                                type="text"
                                placeholder="Username to add?"
                                {...register('username')}
                            />
                            <InputLabel sx={{ color: 'var(--dark-blue)' }}>Roles</InputLabel>
                            <Select
                                MenuProps={{ MenuListProps: { disablePadding: true } }}
                                sx={selectStyles}
                                {...register('role')}
                                onChange={onSelect}
                                labelId="role-select"
                                id="role-select"
                                value={role}
                                label="Role">
                                <MenuItem sx={menuItemStyles} value={'Master'}>
                                    Master
                                </MenuItem>
                                <MenuItem sx={menuItemStyles} value={'Resident'}>
                                    Resident
                                </MenuItem>
                            </Select>
                            <input type="submit" name="button" value="ADD" className="button-action add-button" />
                        </form>
                    </Paper>
                </Popover>
            </div>
        </div>
    );
};

export default Details;
