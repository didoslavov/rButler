import { Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserHouseholds } from '../../../services/householdsService.js';
import MissingHouseholds from './MissingHouseholds.jsx';

const MyHouseholds = ({ user, token }) => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [households, setHouseholds] = useState([]);
    const userId = user?.id;

    useEffect(() => {
        getUserHouseholds(userId, token).then((h) => {
            setHouseholds(h);
            setLoading(false);
        });
    }, [userId, token]);
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
                <h3 className="my-households-header border-bottom">My Households</h3>
                {households.length ? (
                    <>
                        <ul className="households-list">
                            {itemsForDisplay.map((household) => (
                                <Link
                                    key={household._id}
                                    to={'/household/details/' + household._id}
                                    className="my-household-link">
                                    <li className="household">
                                        <h4 className="household-header border-bottom">{household.name}</h4>
                                        <p>{household.presentation}</p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <div>
                            <Pagination
                                shape="rounded"
                                sx={{
                                    pb: 1,
                                    pr: 0,
                                    '& .MuiPaginationItem-root': {
                                        border: '1px solid var(--dark-blue)',
                                        color: 'var(--light-grey)',
                                        backgroundColor: 'var(--dark-blue)',
                                        '&:hover': {
                                            backgroundColor: 'var(--dark-pink)',
                                            color: 'var(--dark-blue)',
                                        },
                                    },
                                    '&& .Mui-selected': {
                                        backgroundColor: 'var(--light-grey)',
                                        color: 'var(--dark-blue)',
                                        '&:hover': {
                                            backgroundColor: 'var(--light-pink)',
                                            color: 'var(--dark-blue)',
                                        },
                                    },
                                }}
                                count={totalPages}
                                onChange={(e, page) => paginationHandler(page)}
                            />
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
