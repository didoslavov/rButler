import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Notification from '../Notification/Notification.jsx';

import { editUser } from '../../services/userService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import { setUser } from '../../redux/slices/userSlice.js';

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { user } = useSelector((state) => state.user);
    const { notification, open, severity } = useSelector((state) => state.notification);
    const [fileName, setFileName] = useState(null);

    const onChangeFile = (e) => setFileName(e.target.files[0].name);
    const handleClearFile = () => setFileName(null);

    const onEditUser = async ({ username, email, avatar }) => {
        let publicURL = '';

        try {
            if (avatar.length) {
                const file = avatar[0];
                const { data, error } = await supabase.storage.from('avatars').upload(`/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

                if (error) {
                    throw [error.message];
                }

                publicURL = SUPABASE_URL + SUPABASE_BUCKET + data.path;
            }

            if (!username || !email) {
                throw ['All fields are required!'];
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
            navigate('/profile');
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
            <div className="profile-container">
                <div className="edit-profile-container">
                    <h2 className="profile-header">Edit Profile</h2>
                    {user.avatar && <img src={user.avatar} alt="user avatar" className="avatar" />}
                    <form className="form-household" onSubmit={handleSubmit(onEditUser)}>
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
                            <input
                                type="file"
                                id="avatar"
                                className="file-input"
                                {...register('avatar')}
                                onChange={onChangeFile}
                            />
                        </label>
                        {fileName && (
                            <div>
                                <p className="label-file-name">
                                    <IconButton
                                        aria-label="close"
                                        style={{ position: 'absolute', top: 0, right: 0, color: 'var(--dark-blue)' }}
                                        size="small"
                                        onClick={handleClearFile}>
                                        <CloseIcon />
                                    </IconButton>
                                    {fileName}
                                </p>
                            </div>
                        )}
                        <input type="submit" className="submit button" value={'Edit'} />
                    </form>
                </div>
            </div>
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </>
    );
};

export default EditProfile;
