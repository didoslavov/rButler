import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Notification from '../Notification/Notification.jsx';

import { editUser } from '../../services/userService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import { setUser } from '../../redux/slices/userSlice.js';

import { useState } from 'react';
import useSupabase from '../../hooks/useSupabase.js';
import { useLoading } from '../../hooks/useLoading.js';

const EditProfile = () => {
    const { uploadAvatar } = useSupabase();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { user } = useSelector((state) => state.user);
    const { notification, open, severity } = useSelector((state) => state.notification);
    const [fileName, setFileName] = useState(null);
    const [isLoading, handleLoading] = useLoading(false);

    const onChangeFile = (e) => setFileName(e.target.files[0].name);
    const handleClearFile = () => setFileName(null);

    const onEditUser = async ({ username, email, avatar }) => {
        let publicURL = '';

        try {
            await handleLoading(async () => {
                if (!username || !email) {
                    throw ['All fields are required!'];
                }

                if (avatar.length) {
                    const file = avatar[0];
                    publicURL = await uploadAvatar(file);
                }

                const res = await editUser({ username, email, avatar: publicURL }, user.id);

                if (res.errors) {
                    throw res.errors;
                }

                dispatch(setUser(res.userData));
                dispatch(
                    setNotification({
                        notification: [res.success],
                        severity: 'success',
                        open: true,
                    })
                );
                navigate('/profile/edit');
            });
        } catch (error) {
            console.log(error);
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
        <div className="edit-profile-container">
            <h2 className="profile-header">Edit Profile</h2>
            {user.avatar && <img src={user.avatar} alt="user avatar" className="avatar" />}
            <form className="form-household profile-form" onSubmit={handleSubmit(onEditUser)}>
                <label>
                    <span>Name</span>
                    <input type="text" className="input" {...register('username')} defaultValue={user.username} />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" className="input" {...register('email')} defaultValue={user.email} />
                </label>
                <label htmlFor="avatar" className="file-input-label">
                    <span>Upload Avatar</span>
                    <input type="file" id="avatar" className="file-input" {...register('avatar')} onChange={onChangeFile} />
                </label>
                {fileName && (
                    <div>
                        <p className="label-file-name">
                            <span className="label-text">{fileName}</span>
                            <IconButton className="label-icon" aria-label="close" size="small" onClick={handleClearFile}>
                                <CloseIcon />
                            </IconButton>
                        </p>
                    </div>
                )}
                <input disabled={isLoading} type="submit" className="submit button" value={'Edit'} />
            </form>
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </div>
    );
};

export default EditProfile;
