import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout, token, user }) => {
    const userId = user?.id;
    const profileLink = token ? `/profile/${userId}` : '/profile/auth';

    return (
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
                <li className="nav-item">
                    <Link to="catalog">All Products</Link>
                </li>
                <li className="nav-item">
                    <Link to={profileLink}>Profile</Link>
                </li>
                {token && (
                    <>
                        <li className="nav-item">
                            <Link to="create">Create Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/households/create">Create Household</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" onClick={onLogout}>
                                Logout
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
