import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../../services/authService.js';
import { useForm } from 'react-hook-form';

const Login = ({ setToken, setUser }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onLogin = async ({ username, password }) => {
        try {
            if (!username || !password) {
                throw new Error('All fields are required!');
            }
            const res = await login({ username, password });

            localStorage.setItem('authToken', res.userInfo.token);
            localStorage.setItem('userInfo', JSON.stringify(res.userInfo));

            setToken(res.userInfo.token);
            setUser(res.userInfo);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

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
                <button type="button" className="fb-btn button">
                    Connect with <span>facebook</span>
                </button>
            </form>
        </div>
    );
};

export default Login;
