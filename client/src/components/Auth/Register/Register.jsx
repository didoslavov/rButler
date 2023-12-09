import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { setUser } from '../../../redux/slices/userSlice.js';
import { setNotification } from '../../../redux/slices/notificationSlice.js';

import { userRegister } from '../../../services/userService.js';
import useSupabase from '../../../hooks/useSupabase.js';
import { useLoading } from '../../../hooks/useLoading.js';

const Register = () => {
    const { uploadAvatar } = useSupabase();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState(null);
    const [isLoading, handleLoading] = useLoading(false);

    const onChangeFile = (e) => setFileName(e.target.files[0].name);
    const handleClearFile = () => setFileName(null);

    const onRegister = async ({ username, email, avatar, password, repass }) => {
        let publicURL = '';

        try {
            await handleLoading(async () => {
                if (!username.trim() || !email.trim() || !password.trim() || !repass.trim()) {
                    throw new Error('All fields are required!');
                }

                if (password.trim().length < 6) {
                    throw new Error('Password must be at least 6 characters long!');
                }

                if (password.trim() !== repass.trim()) {
                    throw new Error("Passwords don't match!");
                }

                if (avatar.length) {
                    const file = avatar[0];
                    publicURL = await uploadAvatar(file);
                }

                const res = await userRegister({ username, email, password, avatar: publicURL });

                if (res.errors) {
                    throw new Error(res.errors);
                }

                dispatch(setUser(res));
                navigate('/');
            });
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
        <div className="form sign-up">
            <h2 className="welcome-sign-up">Step inside, dear newcomer!</h2>
            <form className="form-signup" action="post" onSubmit={handleSubmit(onRegister)}>
                <label>
                    <span>Username</span>
                    <input type="text" className="input" {...register('username')} />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" className="input" {...register('email')} />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" className="input" {...register('password')} />
                </label>
                <label>
                    <span>Repeat Password</span>
                    <input type="password" className="input" {...register('repass')} />
                </label>
                <label htmlFor="avatar" className="file-input-label">
                    <span>Choose Avatar</span>
                    <input type="file" id="avatar" className="file-input" {...register('avatar')} onChange={onChangeFile} />
                </label>
                {fileName && (
                    <div className="file">
                        <p className="label-file-name">
                            <span className="label-text">{fileName}</span>
                            <IconButton className="label-icon" aria-label="close" size="small" onClick={handleClearFile}>
                                <CloseIcon />
                            </IconButton>
                        </p>
                    </div>
                )}
                <input disabled={isLoading} type="submit" className="submit button" value={'Sign Up'} />
            </form>
        </div>
    );
};

export default Register;
