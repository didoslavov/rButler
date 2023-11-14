import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h4 className="sidebar-header">User Profile</h4>
            <ul className="sidebar-list">
                <li>
                    <Link to="edit">Edit Profile</Link>
                </li>
                <li>
                    <Link to="reset-password">Change Password</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
