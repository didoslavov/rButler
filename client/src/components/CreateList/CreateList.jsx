import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, MenuItem, Select } from '@mui/material';
import { menuItemStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';

import { setNotification } from '../../redux/slices/notificationSlice.js';
import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

import { createList } from '../../services/listsService.js';
import { CreateListTypes } from '../../shared/propTypes.js';

const CreateList = ({ householdId, setLists, lists }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [listType, setListType] = useState('shopping');
    const { register, handleSubmit } = useForm();

    const onSelect = (e) => {
        setListType(e.target.value);
    };

    const handleCloseCreateForm = () => {
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: false }));
    };

    const onCreateList = async ({ title, type }) => {
        try {
            if (!title || !type) {
                throw new Error('All fields are required!');
            }

            const res = await createList({ title, type, createdBy: user.id, household: householdId });

            setLists([...lists, res]);

            handleCloseCreateForm();
        } catch (error) {
            dispatch(
                setNotification({
                    notification: [error.message],
                    severity: 'error',
                    open: true,
                })
            );
        }
    };

    return (
        <>
            <form className="create-list-form" onSubmit={handleSubmit(onCreateList)}>
                <IconButton aria-label="close" onClick={handleCloseCreateForm}>
                    <CloseIcon />
                </IconButton>
                <h5 className="create-form-header border-bottom">Create List</h5>
                <label htmlFor="listName" className="create-list-form-label">
                    <span>List Name</span>
                </label>
                <input
                    id="listName"
                    className="create-list-input"
                    type="text"
                    placeholder="List name to add?"
                    {...register('title')}
                />
                <label htmlFor="type-select" className="form-label">
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
                    aria-label="List Type">
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

CreateList.propTypes = CreateListTypes;

export default CreateList;
