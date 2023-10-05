import { Chip, Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserHouseholds } from '../../services/householdsService.js';
import MissingHouseholds from '../MissingHouseholds/MissingHouseholds.jsx';
import Spinner from '../LoadingSpinner/Spinner.jsx';
import { chipStyles, paginationStyles } from '../../styles/muiStyles/muiStyles.js';

const MyHouseholds = ({ user, token }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [households, setHouseholds] = useState([]);
    const userId = user?.id;

    useEffect(() => {
        getUserHouseholds(userId, token).then((h) => {
            if (h === 'Unauthorized') {
                navigate('/profile/auth');
            }

            setHouseholds(h);
            setIsLoading(false);
        });
    }, [userId, token]);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(households?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsForDisplay = households?.slice(startIndex, endIndex);

    const paginationHandler = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="my-households-container">
            <img src="/my-households.jpg" alt="my-households" />
            <div className="households">
                <h3 className="my-households-header border-bottom">My Households</h3>
                {isLoading ? (
                    <Spinner />
                ) : households?.length ? (
                    <>
                        <ul className="households-list">
                            {itemsForDisplay.map((household) => (
                                <Link
                                    key={household._id}
                                    to={'/households/details/' + household._id}
                                    className="my-household-link">
                                    <li className="household">
                                        <div className="chip-container">
                                            <Chip sx={chipStyles} label={userId === household.master ? 'master' : 'resident'} />
                                        </div>
                                        <h4 className="household-header border-bottom">{household.name}</h4>
                                        <p>{household.presentation}</p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <div>
                            <Pagination
                                shape="rounded"
                                sx={paginationStyles}
                                count={totalPages}
                                onChange={(e, page) => paginationHandler(page)}
                            />
                        </div>
                    </>
                ) : (
                    <MissingHouseholds token={token} />
                )}
            </div>
        </div>
    );
};

export default MyHouseholds;
