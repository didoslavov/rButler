import { useState } from 'react';

const usePagination = (data, itemsPerPage = 4) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsForDisplay = data.slice(startIndex, endIndex);

    const paginationHandler = (page) => {
        setCurrentPage(page);
    };

    return { itemsForDisplay, totalPages, paginationHandler };
};

export default usePagination;
