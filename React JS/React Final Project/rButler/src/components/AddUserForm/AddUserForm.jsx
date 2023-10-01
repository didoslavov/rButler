import React, { useState } from 'react';
import { addUserToHousehold } from '../../services/householdsService.js';
import { menuItemStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';
import { MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddUserForm = ({ householdId, token }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [role, setRole] = useState('Resident');

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
        <div className="add-member-form-container">
            <h4 className="border-bottom">Add household member</h4>
            <form className="popup-form" onSubmit={handleSubmit(onAddUserToHousehold)}>
                <label className="add-member-label">
                    <span>Username</span>
                </label>
                <input className="add-member-input" type="text" placeholder="Username to add?" {...register('username')} />
                <label className="add-member-label">
                    <span>Roles</span>
                </label>
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
                <input type="submit" name="button" value="ADD" className="button-action create-button add-member-button" />
            </form>
        </div>
    );
};

export default AddUserForm;
