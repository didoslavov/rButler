import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SearchSharp } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { getAllHouseholds } from '../../services/householdsService.js';

const Search = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [households, setHouseholds] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    const filteredSuggestions = households?.filter((h) => h.name.toLowerCase().includes(query.trim().toLowerCase()));

    const handleQuery = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        setShowSuggestions(inputValue.length > 0);
    };

    const onSearch = () => {
        navigate({ pathname: '/households', search: query && `?query=${query}` });
        setQuery('');
        setShowSuggestions(false);
    };

    const onSuggestionClick = (value) => {
        setQuery(value);
        setShowSuggestions(false);

        if (searchRef.current) {
            searchRef.current.focus();
        }
    };

    useEffect(() => {
        getAllHouseholds().then((data) => setHouseholds(data));
    }, []);

    return (
        <form onSubmit={handleSubmit(onSearch)} data-testid="search-component">
            <input
                type="text"
                {...register('query')}
                className="search-form"
                placeholder="Search"
                value={query}
                autoComplete="off"
                onChange={handleQuery}
                ref={searchRef}
            />
            {showSuggestions > 0 && filteredSuggestions.length > 0 && (
                <div className="suggestions">
                    {filteredSuggestions.map((suggestion) => (
                        <div className="suggestion" key={suggestion._id} onClick={() => onSuggestionClick(suggestion.name)}>
                            {suggestion.name}
                        </div>
                    ))}
                </div>
            )}
            <IconButton type="submit" aria-label="delete">
                <SearchSharp sx={{ color: 'var(--dark-blue)' }} />
            </IconButton>
        </form>
    );
};

export default Search;
