import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setUser } from '../../../redux/slices/userSlice.js';
import { setNotification } from '../../../redux/slices/notificationSlice.js';

import { login } from '../../../services/authService.js';

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const { redirectError } = location.state || '';

    const onLogin = async ({ username, password }) => {
        try {
            if (!username || !password) {
                throw ['All fields are required!'];
            }
            const res = await login({ username, password });

            if (res.errors) {
                throw res.errors;
            }

            dispatch(setUser(res));
            navigate('/');
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

    useEffect(() => {
        if (redirectError) {
            dispatch(
                setNotification({
                    notification: [redirectError],
                    severity: 'error',
                    open: true,
                })
            );
        }
    }, [redirectError]);

    return (
        <div className="form sign-in">
            <h2 className="welcome">Your return is a delight!</h2>
            <form action="post" onSubmit={handleSubmit(onLogin)}>
                <label>
                    <span>Username</span>
                    <input type="text" className="input" {...register('username')} />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" className="input" {...register('password')} />
                </label>
                <Link to="/password-reset">
                    <p className="forgot-pass">Forgot password?</p>
                </Link>
                <input type="submit" className="submit button" value={'Sign In'} />
            </form>
        </div>
    );
};

export default Login;
