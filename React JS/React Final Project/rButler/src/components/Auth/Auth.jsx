import React, { useState } from 'react';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import Notification from '../Notification/Notification.jsx';

const Auth = ({ setUser }) => {
    const [showLogin, setShowLogin] = useState(true);
    const [notification, setNotification] = useState('');
    const [severity, setSeverity] = useState('');
    const [notify, setNotify] = useState(false);
    const [open, setOpen] = useState(false);

    const toggleFormsHandler = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className={`cont ${showLogin ? '' : 's--signup'}`}>
            <Login
                setUser={setUser}
                setNotification={setNotification}
                setSeverity={setSeverity}
                setNotify={setNotify}
                setOpen={setOpen}
            />

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

                <Register
                    setUser={setUser}
                    setNotification={setNotification}
                    setSeverity={setSeverity}
                    setNotify={setNotify}
                    setOpen={setOpen}
                />
            </div>
            {notify && <Notification open={open} setOpen={setOpen} message={notification} severity={severity} />}
        </div>
    );
};

export default Auth;
