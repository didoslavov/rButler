import React, { useState } from 'react';
import { addUserToHousehold, removeUserFromHousehold } from '../../services/householdsService.js';
import { chipStyles, menuItemStyles, selectStyles } from '../../styles/muiStyles/muiStyles.js';
import { Chip, IconButton, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import Notification from '../Notification/Notification.jsx';

const AddUserForm = ({ setHousehold, householdId, users, setUsers, token, handleShowAddMemberForm }) => {
    const { register, handleSubmit, reset } = useForm();
    const [role, setRole] = useState('Resident');
    const [userListName, setUserListName] = useState('');
    const [error, setError] = useState('');
    const [notify, setNotify] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const onSelectRole = (e) => {
        setRole(e.target.value);
    };

    const onSelectUser = (e) => {
        setUserListName(e.target.value);
    };

    const onAddUser = async ({ user, role }) => {
        const data = await addUserToHousehold(user, role, householdId, token);

        if (typeof data === 'string') {
            setError(data);
            return setNotify(true);
        }

        reset();
        setUsers(data.users);
        setHousehold(data);
    };

    const onRemoveUser = async ({ username }) => {
        const data = await removeUserFromHousehold(username, householdId, token);

        if (typeof data === 'string') {
            setError(data);
            return setNotify(true);
        }

        setUsers(users.filter((u) => u.user.username !== username));
        setUserListName('');
    };

    return (
        <>
            <div className="member-form-container">
                <IconButton aria-label="close" onClick={handleShowAddMemberForm}>
                    <CloseIcon />
                </IconButton>
                <h4 className="border-bottom">Add household member</h4>
                <form className="popup-form" onSubmit={handleSubmit(onAddUser)}>
                    <label className="member-label">
                        <span>Username</span>
                    </label>
                    <input className="member-input" type="text" placeholder="Username to add?" {...register('user')} />
                    <label className="member-label">
                        <span>Roles</span>
                    </label>
                    <Select
                        MenuProps={{ MenuListProps: { disablePadding: true } }}
                        sx={selectStyles}
                        {...register('role')}
                        onChange={onSelectRole}
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
                    <input
                        type="submit"
                        name="button"
                        value="ADD"
                        onClick={handleClick}
                        className="button-action create-button member-button"
                    />
                </form>
                <h4 className="border-bottom remove-header">Remove household member</h4>
                <form className="popup-form" onSubmit={handleSubmit(onRemoveUser)}>
                    <label className="member-label">
                        <span>Users list</span>
                    </label>
                    <Select
                        MenuProps={{ MenuListProps: { disablePadding: false } }}
                        sx={selectStyles}
                        {...register('username')}
                        onChange={onSelectUser}
                        labelId="role-select"
                        id="role-select"
                        value={userListName}
                        label="Role">
                        {users.map((u) => {
                            return (
                                <MenuItem key={u.user._id} sx={menuItemStyles} value={u.user.username}>
                                    {u.user.username} <Chip sx={chipStyles} label={u.role} />
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <input
                        onClick={handleClick}
                        type="submit"
                        name="button"
                        value="REMOVE"
                        className="button-action create-button member-button"
                    />
                </form>
            </div>
            {notify && <Notification open={open} setOpen={setOpen} message={error} />}
        </>
    );
};

export default AddUserForm;
