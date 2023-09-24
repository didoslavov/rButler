import React, { useEffect, useState } from 'react';
import MyHouseholds from './MyHouseholds/MyHouseholds.jsx';
import Auth from './Auth/Auth.jsx';

const Profile = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return <>{token ? <MyHouseholds /> : <Auth setToken={setToken} />}</>;
};

export default Profile;
