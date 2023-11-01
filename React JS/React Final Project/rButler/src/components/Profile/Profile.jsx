import Sidebar from './Sidebar.jsx';
import EditProfile from './EditProfile.jsx';
import { Route, Routes } from 'react-router-dom';
import ChangePassword from './ChangePassword.jsx';

const Profile = () => {
    return (
        <div className="profile-container">
            <Sidebar />
            <Routes>
                <Route path="edit" element={<EditProfile />} />
                <Route path="reset-password" element={<ChangePassword />} />
            </Routes>
        </div>
    );
};

export default Profile;
