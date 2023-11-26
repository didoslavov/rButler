import { useState } from 'react';
import { useSelector } from 'react-redux';

import Login from './Login/Login.jsx';
import SubContent from './SubContent/SubContent.jsx';
import Register from './Register/Register.jsx';
import Notification from '../Notification/Notification.jsx';

const Auth = () => {
    const { notification, severity, open } = useSelector((state) => state.notification);
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    const toggleFormsHandler = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    return (
        <div className={`cont ${isLoginFormVisible ? '' : 's--signup'}`}>
            <Login />

            <div className="sub-cont">
                <SubContent toggleFormsHandler={toggleFormsHandler} />

                <Register />
            </div>
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </div>
    );
};

export default Auth;
