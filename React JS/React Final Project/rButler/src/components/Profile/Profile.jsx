import React from 'react';
import Sidebar from './Sidebar.jsx';
import EditProfile from './EditProfile.jsx';

const Profile = () => {
    return (
        <div className="profile-container">
            <Sidebar />
            <EditProfile />
        </div>
    );
};

export default Profile;
