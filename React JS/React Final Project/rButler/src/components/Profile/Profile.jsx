import React, { useEffect, useState } from 'react';
import MyHouseholds from './MyHouseholds/MyHouseholds.jsx';
import Auth from './Auth/Auth.jsx';
import { getToken } from '../../utils/getToken.js';

const Profile = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = getToken(document.cookie);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return <>{token ? <MyHouseholds /> : <Auth setToken={setToken} />}</>;
};

export default Profile;
