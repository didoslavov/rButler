import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../../services/authService.js';

const Register = ({ setToken, setUser, setNotification, setSeverity, setOpen, setNotify }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onRegister = async ({ username, email, password, repass }) => {
        try {
            if (!username || !email || !password || !repass) {
                throw ['All fields are required!'];
            }
            const res = await userRegister({ username, email, password });

            if (res.errors) {
                throw res.errors;
            }

            localStorage.setItem('userData', JSON.stringify(res.userData));

            setToken(res.userData?.token);
            setUser(res.userData);
            navigate('/');
        } catch (error) {
            setSeverity('error');
            setNotification(error.join('\n'));
            setOpen(true);
            setNotify(true);
        }
    };

    return (
        <div className="form sign-up">
            <h2 className="welcome-sign-up">Step inside, dear newcomer!</h2>
            <form action="post" onSubmit={handleSubmit(onRegister)}>
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
                <input type="submit" className="submit button" value={'Sign Up'} />
                <button type="button" className="fb-btn button">
                    Join with <span>facebook</span>
                </button>
            </form>
        </div>
    );
};

export default Register;
