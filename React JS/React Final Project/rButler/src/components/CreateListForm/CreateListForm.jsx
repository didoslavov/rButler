import CloseIcon from '@mui/icons-material/Close';
import { IconButton, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { menuItemStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';
import { createList } from '../../services/listsService.js';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const CreateListForm = ({ householdId, setIsCreateOpen, setLists, lists }) => {
    const dispatch = useDispatch();
    const { isCreateOpen } = useSelector((state) => state.formVisibility);
    const { user } = useSelector((state) => state.user);
    const [listType, setListType] = useState('shopping');
    const { register, handleSubmit } = useForm();

    const onSelect = (e) => {
        setListType(e.target.value);
    };

    const handleShowCreateForm = () => {
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: !isCreateOpen }));
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isAddMemberOpen', value: false }));
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
            dispatch(
                setNotification({
                    notification: error,
                    severity: 'error',
                    open: true,
                })
            );
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
        </>
    );
};

export default CreateListForm;
