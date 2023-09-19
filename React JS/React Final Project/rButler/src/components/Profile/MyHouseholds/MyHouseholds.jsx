import { Pagination } from '@mui/material';
import React, { useState } from 'react';

const MyHouseholds = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const items = [
        { name: 'Household1', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
        { name: 'Household2', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
        { name: 'Household3', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
        { name: 'Household4', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
        { name: 'Household5', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
        { name: 'Household6', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
        { name: 'Household7', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
        { name: 'Household8', presentation: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt, nostrum?' },
    ];
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsForDisplay = items.slice(startIndex, endIndex);

    const paginationHandler = (val) => {
        setCurrentPage(val);
    };

    return (
        <div className="my-households-container">
            <img src="/my-households.jpg" alt="my-households" />
            <div className="households">
                <ul className="households-list">
                    {itemsForDisplay.map((item, index) => (
                        <li key={index} className="household">
                            <h4>{item.name}</h4>
                            <p>{item.presentation}</p>
                        </li>
                    ))}
                </ul>
                <div>
                    <Pagination count={totalPages} onChange={(e, val) => paginationHandler(val)} />
                </div>
            </div>
        </div>
    );
};

export default MyHouseholds;
