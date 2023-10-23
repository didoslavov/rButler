import { Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllHouseholds } from '../../services/householdsService.js';
import MissingHouseholds from '../MissingHouseholds/MissingHouseholds.jsx';
import Spinner from '../LoadingSpinner/Spinner.jsx';
import { paginationStyles } from '../../styles/muiStyles/muiStyles.js';

const AllHouseholds = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [households, setHouseholds] = useState([]);
    const [query] = useSearchParams();

    const search = query.get('query') || '';

    useEffect(() => {
        getAllHouseholds(search).then((res) => {
            if (!res.length) {
                return setHouseholds([{ _id: 1, name: 'Sorry', presentation: 'No households found!' }]);
            }

            setHouseholds(res);
            setIsLoading(false);
        });
    }, [search]);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(households?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsForDisplay = households?.slice(startIndex, endIndex);

    const paginationHandler = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="my-households-container">
            <div className="households">
                <h3 className="my-households-header border-bottom">{!search ? 'All Households' : 'Search households'}</h3>
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
                    <MissingHouseholds />
                )}
            </div>
        </div>
    );
};

export default AllHouseholds;
