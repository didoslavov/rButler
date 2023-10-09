import CloseIcon from '@mui/icons-material/Close';
import { IconButton, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { menuItemStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';
import { createList } from '../../services/listsService.js';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification.jsx';

const CreateListForm = ({ user, householdId, setIsCreateOpen, handleShowCreateForm, setLists, lists }) => {
    const [listType, setListType] = useState('shopping');
    const { register, handleSubmit } = useForm();
    const [notification, setNotification] = useState('');
    const [severity, setSeverity] = useState('');
    const [notify, setNotify] = useState(false);
    const [open, setOpen] = useState(false);

    const onSelect = (e) => {
        setListType(e.target.value);
    };

    const onCreateList = async ({ title, type }) => {
        try {
            if (!title || !type) {
                throw ['All fields are required!'];
            }

            const res = await createList({ title, type, createdBy: user.id, household: householdId });

            setLists([...lists, res]);

            setIsCreateOpen(false);
        } catch (error) {
            setSeverity('error');
            setNotification(error);
            setOpen(true);
            setNotify(true);
        }
    };

    return (
        <>
            <form className="create-list-form" onSubmit={handleSubmit(onCreateList)}>
                <IconButton aria-label="close" onClick={handleShowCreateForm}>
                    <CloseIcon />
                </IconButton>
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
                    <MenuItem sx={menuItemStyles} value={'shopping'}>
                        Shopping List
                    </MenuItem>
                    <MenuItem sx={menuItemStyles} value={'todo'}>
                        TODO List
                    </MenuItem>
                </Select>
                <input type="submit" name="button" value="CREATE" className="create-button button-action" />
            </form>
            {notify && <Notification open={open} setOpen={setOpen} message={notification} severity={severity} />}
        </>
    );
};

export default CreateListForm;
