import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../services/userService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import { setUser } from '../../redux/slices/userSlice.js';
import Notification from '../Notification/Notification.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { user } = useSelector((state) => state.user);
    const { notification, open, severity } = useSelector((state) => state.notification);
    const [avatarResponse, setAvatarResponse] = useState('');

    const onEditUser = async ({ username, email, password, repass, avatar }) => {
        try {
            if (avatar.length) {
                const formData = new FormData();
                formData.append('file', avatar[0]);
                formData.append('upload_preset', 'ih54vkhv');
                const response = await fetch(`https://api.cloudinary.com/v1_1/douuebb4d/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw [response.message];
                }
                const avatarUrl = await response.json();

                setAvatarResponse(avatarUrl);
            }

            if (!username || !email) {
                throw ['All fields are required!'];
            }

            if (password !== repass) {
                throw ["Passwords don't match!"];
            }
            const res = await editUser({ username, email, password, avatar: avatarResponse.secure_url }, user._id);

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
                    <img src={user.avatar} alt="user avatar" className="avatar" />
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
                            <input type="file" id="avatar" className="file-input" {...register('avatar')} />
                        </label>
                        <input type="submit" className="submit button" value={'Edit'} />
                    </form>
                </div>
            </div>
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </>
    );
};

export default EditProfile;
