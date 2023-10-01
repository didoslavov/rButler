import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout, token, user }) => {
    const userId = user?.id;

    return (
        <>
            <nav className="navbar">
                <div className="image-search-container">
                    <Link to="/" className="logo">
                        <img src="/nav-logo.jpg" alt="home logo" className="nav-logo" />
                    </Link>
                    <form action="post">
                        <input type="search" name="search" id="search" placeholder="Search" />
                    </form>
                </div>
                <ul className="nav-links">
                    {token ? (
                        <>
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
                                <Link to={`/households/${userId}`}>
                                    <Avatar alt="user avatar" src="/nav-user-avatar.jpg" />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link to="/profile/auth">Sign</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
