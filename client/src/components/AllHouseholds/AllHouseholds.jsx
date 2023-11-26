import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Chip, Pagination } from '@mui/material';
import { chipStyles, paginationStyles } from '../../styles/muiStyles/muiStyles.js';

import usePagination from '../../hooks/usePagination.js';
import { useLoading } from '../../hooks/useLoading.js';

import MissingHouseholds from '../MissingHouseholds/MissingHouseholds.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';

import { getAllHouseholds } from '../../services/householdsService.js';
import HouseholdList from '../HouseholdList/HouseholdList.jsx';

const AllHouseholds = () => {
    const [households, setHouseholds] = useState([]);
    const [isLoading, handleLoading] = useLoading(true);
    const { itemsForDisplay, totalPages, paginationHandler } = usePagination(households);
    const [query] = useSearchParams();

    const search = query.get('query') || '';

    useEffect(() => {
        handleLoading(async () => {
            const res = await getAllHouseholds(search);

            setHouseholds(res);
        });
    }, [search, handleLoading]);

    return (
        <div className="my-households-container">
            <div className="households">
                <h3 className="my-households-header border-bottom">{!search ? 'All Households' : 'Search households'}</h3>
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
                                role="pagination"
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
