import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { setUser } from '../../../redux/slices/userSlice.js';
import { setNotification } from '../../../redux/slices/notificationSlice.js';

import { userRegister } from '../../../services/userService.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

const Register = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState(null);

    const onChangeFile = (e) => setFileName(e.target.files[0].name);
    const handleClearFile = () => setFileName(null);

    const onRegister = async ({ username, email, avatar, password, repass }) => {
        let publicURL = '';

        try {
            if (!username || !email || !password || !repass) {
                throw ['All fields are required!'];
            }

            if (password.length < 6) {
                throw ['Password must be at least 6 characters long!'];
            }

            if (password !== repass) {
                throw ["Passwords don't match!"];
            }

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

            const res = await userRegister({ username, email, password, avatar: publicURL });

            if (res.errors) {
                throw res.errors;
            }

            dispatch(setUser(res));
            navigate('/');
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
        <div className="form sign-up">
            <h2 className="welcome-sign-up">Step inside, dear newcomer!</h2>
            <form className="form-signup" action="post" onSubmit={handleSubmit(onRegister)}>
                <label>
                    <span>Name</span>
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
                    <span>Upload Avatar</span>
                    <input type="file" id="avatar" className="file-input" {...register('avatar')} onChange={onChangeFile} />
                </label>
                {fileName && (
                    <div className="file">
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
                <input type="submit" className="submit button" value={'Sign Up'} />
            </form>
        </div>
    );
};

export default Register;
