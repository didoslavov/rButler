import { InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { menuItemStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';

const CreateListForm = () => {
    const [listType, setListType] = useState('Shopping List');
    const { register, handleSubmit } = useForm();

    const onSelect = (e) => {
        setListType(e.target.value);
    };

    return (
        <form className="create-list-form" onSubmit={handleSubmit}>
            <h5 className="create-form-header border-bottom">Create List</h5>
            <label htmlFor="listName" className="form-label">
                List Name
            </label>
            <input className="create-list-input" type="text" placeholder="List name to add?" {...register('name')} />
            <label htmlFor="type" className="form-label">
                List Type
            </label>
            <Select
                MenuProps={{ MenuListProps: { disablePadding: true } }}
                sx={selectStyles}
                {...register('type')}
                onChange={onSelect}
                labelId="type-select"
                id="type-select"
                value={listType}
                label="type">
                <MenuItem sx={menuItemStyles} value={'Shopping List'}>
                    Shopping List
                </MenuItem>
                <MenuItem sx={menuItemStyles} value={'TODO List'}>
                    TODO List
                </MenuItem>
            </Select>
            <input type="submit" name="button" value="CREATE" className="create-button button-action" />
        </form>
    );
};

export default CreateListForm;
