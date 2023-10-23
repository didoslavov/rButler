import React, { useState } from 'react';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import Notification from '../Notification/Notification.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../redux/actions/notificationActions.js';

const Auth = () => {
    const dispatch = useDispatch();
    const { notification, severity, open } = useSelector((state) => state.notification);
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const toggleFormsHandler = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <div className={`cont ${isLoginFormVisible ? '' : 's--signup'}`}>
            <Login />

            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h2>Are you a newcomer to these premises?</h2>
                        <p>Enroll now and unlock a wealth of fresh possibilities!</p>
                    </div>
                    <div className="img__text m--in">
                        <h2>Ah, might you be a part of our distinguished company?</h2>
                        <p>
                            Should you be a prior member, a mere sign-in shall suffice. Your presence has been sorely missed, and
                            we extend a warm welcome back to you.
                        </p>
                    </div>
                    <div className="img__btn" onClick={toggleFormsHandler}>
                        <span className="m--up">Sign Up</span>
                        <span className="m--in">Sign In</span>
                    </div>
                </div>

                <Register />
            </div>
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </div>
    );
};

export default Auth;
