import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="logo">
                    <img src="/nav-logo.jpg" alt="home logo" />
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
                    <Link to="create">Create Product</Link>
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
