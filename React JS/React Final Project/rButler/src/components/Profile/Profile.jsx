import React, { useEffect, useState } from 'react';
import MyHouseholds from './MyHouseholds/MyHouseholds.jsx';
import Auth from './Auth/Auth.jsx';

const Profile = ({ setUser, user, setLoading }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <>
            {token ? (
                <MyHouseholds user={user} token={token} setLoading={setLoading} />
            ) : (
                <Auth setToken={setToken} setUser={setUser} />
            )}
        </>
    );
};

export default Profile;
