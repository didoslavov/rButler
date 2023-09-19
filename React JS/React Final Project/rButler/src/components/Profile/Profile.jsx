import React from 'react';
import MyHouseholds from './MyHouseholds/MyHouseholds.jsx';
import Auth from './Auth/Auth.jsx';

const Profile = () => {
    return (
        <>
            <Auth />
            <MyHouseholds />
        </>
    );
};

export default Profile;
