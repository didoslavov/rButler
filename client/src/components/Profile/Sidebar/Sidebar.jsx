import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-header">
                    <Link to="/profile" className="sidebar-header-link">
                        User Profile
                    </Link>
                </li>
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
