import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Chip, Pagination } from '@mui/material';
import { chipStyles, paginationStyles } from '../../styles/muiStyles/muiStyles.js';

import Spinner from '../LoadingSpinner/Spinner.jsx';
import MissingHouseholds from '../MissingHouseholds/MissingHouseholds.jsx';

import usePagination from '../../hooks/usePagination.js';
import { useLoading } from '../../hooks/useLoading.js';

import { getUserHouseholds } from '../../services/householdsService.js';

const MyHouseholds = () => {
    const [isLoading, handleLoading] = useLoading(true);
    const [households, setHouseholds] = useState([]);
    const { itemsForDisplay, totalPages, paginationHandler } = usePagination(households);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const userId = user?.id;
    const token = user?.token;

    useEffect(() => {
        handleLoading(async () => {
            const res = await getUserHouseholds(userId, token);

            if (res.error) {
                dispatch(
                    setNotification({
                        notification: 'Authentication Failed',
                        severity: 'error',
                        open: true,
                    })
                );
                navigate('/profile/auth');
            }

            setHouseholds(res);
        });
    }, [userId, token]);

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
                    <MissingHouseholds user={user} />
                )}
            </div>
        </div>
    );
};

export default MyHouseholds;
