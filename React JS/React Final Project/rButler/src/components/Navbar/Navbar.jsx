import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <a href="https://freecodecamp.org" className="logo">
                    <img src="../../../public/Forest-House-Logo-For-Download.jpg" alt="home logo" />
                </a>
                <input type="search" name="search" id="search" placeholder="Search" />
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <a href="#">All Products</a>
                </li>
                <li className="nav-item">
                    <a href="#">Create Product</a>
                </li>
                <li className="nav-item">
                    <a href="#">Sign up</a>
                </li>
                <li className="nav-item">
                    <a href="#">Sign in</a>
                </li>
                <li className="nav-item">
                    <a href="#">Logout</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
