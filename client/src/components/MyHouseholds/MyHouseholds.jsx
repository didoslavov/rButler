import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination } from '@mui/material';
import { paginationStyles } from '../../styles/muiStyles/muiStyles.js';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import MissingHouseholds from '../MissingHouseholds/MissingHouseholds.jsx';

import usePagination from '../../hooks/usePagination.js';
import { useLoading } from '../../hooks/useLoading.js';

import { getUserHouseholds } from '../../services/householdsService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import HouseholdList from '../HouseholdList/HouseholdList.jsx';
import { clearUser } from '../../redux/slices/userSlice.js';

const MyHouseholds = () => {
    const dispatch = useDispatch();
    const [isLoading, handleLoading] = useLoading(true);
    const [households, setHouseholds] = useState([]);
    const { itemsForDisplay, totalPages, paginationHandler } = usePagination(households);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const userId = user?.id;
    const token = user?.token;

    useEffect(() => {
        handleLoading(async () => {
            try {
                const res = await getUserHouseholds(userId, token);

                if (res.message) {
                    dispatch(clearUser());
                    navigate('/profile/auth');
                    throw new Error(res.message);
                }

                setHouseholds(res);
            } catch (error) {
                dispatch(
                    setNotification({
                        notification: [error.message],
                        severity: 'error',
                        open: true,
                    })
                );
            }
        });
    }, [userId, token, navigate, dispatch, handleLoading]);

    return (
        <div className="my-households-container">
            <img src="/my-households.webp" alt="My Households" />
            <div className="households">
                <h3 className="my-households-header border-bottom">My Households</h3>
                {isLoading ? (
                    <LoadingSpinner />
                ) : households?.length ? (
                    <>
                        <HouseholdList households={itemsForDisplay} />
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
