import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { menuItemStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';
import { createList } from '../../services/listsService.js';
import { useNavigate } from 'react-router-dom';

const CreateListForm = ({ userId, householdId, token, setIsCreateOpen }) => {
    const [listType, setListType] = useState('Shopping List');
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSelect = (e) => {
        setListType(e.target.value);
    };

    const onCreateList = async ({ title, type }) => {
        try {
            if (!title || !type) {
                throw new Error('All fields are required!');
            }

            const res = await createList({ title, type, createdBy: userId, household: householdId, token });

            if (res === 'Unauthorized') {
                navigate('/profile/auth');
            }

            setIsCreateOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="create-list-form" onSubmit={handleSubmit(onCreateList)}>
            <h5 className="create-form-header border-bottom">Create List</h5>
            <label htmlFor="listName" className="create-list-form-label">
                <span>List Name</span>
            </label>
            <input className="create-list-input" type="text" placeholder="List name to add?" {...register('title')} />
            <label htmlFor="type" className="form-label">
                <span>List Type</span>
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
