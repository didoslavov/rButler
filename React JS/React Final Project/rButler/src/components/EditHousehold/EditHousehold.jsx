import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { menuItemStyles, selectStyles } from '../../../public/styles/muiStyles/details.js';

const EditHousehold = () => {
    const [role, setRole] = useState('Resident');

    const onSelect = (e) => {
        setRole(e.target.value);
    };

    return (
        <>
            <div className="edit-household-container">
                <form className="form-household">
                    <label>
                        <span>Household name</span>
                    </label>
                    <input type="text" className="input" />
                    <label>
                        <span>Presentation</span>
                    </label>
                    <input type="text" className="input" />
                    <label>Roles</label>
                    <Select
                        MenuProps={{ MenuListProps: { disablePadding: true } }}
                        sx={selectStyles}
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
                    <div className="buttons-form">
                        <input type="submit" className="button-action edit-button" value={'Edit Household'} />
                        <button className="button-action delete-button">Delete</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditHousehold;
