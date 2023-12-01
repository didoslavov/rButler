import Sidebar from './Sidebar/Sidebar.jsx';
import EditProfile from './EditProfile/EditProfile.jsx';
import { Route, Routes } from 'react-router-dom';
import ChangePassword from './ChangePassword/ChangePassword.jsx';
import Weather from '../Weather/Weather.jsx';

const Profile = () => {
    return (
        <div className="profile-container">
            <Sidebar />
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="edit" element={<EditProfile />} />
                <Route path="reset-password" element={<ChangePassword />} />
            </Routes>
        </div>
    );
};

export default Profile;
