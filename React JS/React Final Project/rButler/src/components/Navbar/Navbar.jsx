import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="logo">
                    <img src="/nav-logo.jpg" alt="home logo" />
                </Link>
                <input type="search" name="search" id="search" placeholder="Search" />
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="#">All Products</Link>
                </li>
                <li className="nav-item">
                    <Link to="#">Create Product</Link>
                </li>
                <li className="nav-item">
                    <Link to="/auth">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="#">Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
