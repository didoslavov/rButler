import React, { useState } from 'react';
import { addUserToHousehold } from '../../services/householdsService.js';
import { iconButtonStyles, menuItemStyles, paperStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';
import { IconButton, InputLabel, MenuItem, Paper, Popover, Select } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddUserForm = ({ anchorEl, setAnchorEl, setIsPopupOpen, isPopupOpen, householdId, token }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [role, setRole] = useState('Resident');

    const handlePopupClose = () => {
        setAnchorEl(null);
        setIsPopupOpen(false);
    };

    const onSelect = (e) => {
        setRole(e.target.value);
    };

    const onAddUserToHousehold = async ({ username, role }) => {
        await addUserToHousehold(username, role, householdId, token);
        setIsPopupOpen(false);
        reset();
        navigate('/households/details/' + householdId);
    };
    return (
        <>
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
                        <input type="submit" name="button" value="ADD" className="button-action create-button" />
                    </form>
                </Paper>
            </Popover>
        </>
    );
};

export default AddUserForm;
