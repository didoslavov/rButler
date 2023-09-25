import { Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserHouseholds } from '../../../services/householdsService.js';
import MissingHouseholds from './MissingHouseholds.jsx';

const MyHouseholds = ({ user }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [households, setHouseholds] = useState([]);
    const userId = user?.id;

    useEffect(() => {
        getUserHouseholds(userId).then((h) => {
            setHouseholds(h);
        });
    }, [userId]);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(households.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsForDisplay = households.slice(startIndex, endIndex);

    const paginationHandler = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="my-households-container">
            <img src="/my-households.jpg" alt="my-households" />
            <div className="households">
                <h3 className="my-households-header">My Households</h3>
                {households.length ? (
                    <>
                        <ul className="households-list">
                            {itemsForDisplay.map((household) => (
                                <Link key={household._id} to={'/households/' + household._id} className="my-household-link">
                                    <li className="household">
                                        <h4 className="household-header">{household.name}</h4>
                                        <p>{household.presentation}</p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <div>
                            <Pagination count={totalPages} onChange={(e, page) => paginationHandler(page)} />
                        </div>
                    </>
                ) : (
                    <MissingHouseholds />
                )}
            </div>
        </div>
    );
};

export default MyHouseholds;
