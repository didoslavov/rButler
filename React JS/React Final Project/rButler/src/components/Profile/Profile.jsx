import React from 'react';
import Sidebar from './Sidebar.jsx';
import EditProfile from './EditProfile.jsx';
import { Outlet, Route, Routes } from 'react-router-dom';
import ResetPassword from './ResetPassword.jsx';

const Profile = () => {
    return (
        <div className="profile-container">
            <Sidebar />
            <Routes>
                <Route path="edit" element={<EditProfile />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Routes>
        </div>
    );
};

export default Profile;
