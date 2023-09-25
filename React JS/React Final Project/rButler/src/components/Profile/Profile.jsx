import React, { useEffect, useState } from 'react';
import MyHouseholds from './MyHouseholds/MyHouseholds.jsx';
import Auth from './Auth/Auth.jsx';

const Profile = ({ setUser }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return <>{token ? <MyHouseholds /> : <Auth setToken={setToken} setUser={setUser} />}</>;
};

export default Profile;
