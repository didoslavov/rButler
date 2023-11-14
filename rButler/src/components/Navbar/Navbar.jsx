import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@mui/material';

import Search from '../Search/Search.jsx';

import { logoutUser } from '../../redux/slices/userSlice.js';
import { logout } from '../../services/userService.js';

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userId = user?.id;

    const onLogout = async () => {
        const { success } = await logout();

        if (success) {
            dispatch(logoutUser());
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="image-search-container">
                    <Link to="/" className="logo">
                        <img src="/nav-logo.jpg" alt="home logo" className="nav-logo" />
                    </Link>
                    <Search />
                </div>
                <ul className="nav-links">
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link to="/households">Households</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/households/${userId}`}>My Households</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/households/create">Create Household</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" onClick={onLogout}>
                                    Logout
                                </Link>
                            </li>
                            <div className="avatar-container">
                                <span className="navbar-username">{user.username}</span>
                                <Link to={`/profile`}>
                                    <Avatar
                                        src={user.avatar}
                                        alt="user avatar"
                                        sx={{
                                            bgcolor: 'var(--dark-blue)',
                                            color: 'var(--light-grey)',
                                            '&& .MuiAvatar-img': { objectFit: 'fill' },
                                        }}>
                                        {!user.avatar && user.username[0]}
                                    </Avatar>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/households">Households</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile/auth">Sign</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
