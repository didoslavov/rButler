import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SearchSharp } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Search = () => {
    const [query, setQuery] = useState('');
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const handleQuery = (e) => {
        setQuery(e.target.value);
    };

    const onSearch = async () => {
        navigate({ pathname: '/households', search: query && `?query=${query}` });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSearch)}>
            <input type="text" {...register('query')} className="search-form" placeholder="Search" onChange={handleQuery} />
            <IconButton type="submit" aria-label="delete">
                <SearchSharp sx={{ color: 'var(--dark-blue)' }} />
            </IconButton>
        </form>
    );
};

export default Search;
