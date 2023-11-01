import { useState, useEffect } from 'react';
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

    const handleQuery = (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
        setShowSuggestions(inputValue.length > 0);
    };

    const onSearch = ({ query }) => {
        navigate({ pathname: '/households', search: query && `?query=${query}` });
        setQuery('');
        setShowSuggestions(false);
    };

    const onSuggestionClick = (value) => {
        setQuery(value);
        setShowSuggestions(false);
        onSearch({ query: value });
    };

    const filteredSuggestions = households.filter((h) => h.name.toLowerCase().includes(query.trim().toLowerCase()));

    useEffect(() => {
        getAllHouseholds().then((data) => setHouseholds(data));
    }, []);

    return (
        <form onSubmit={handleSubmit(onSearch)}>
            <input
                type="text"
                {...register('query')}
                className="search-form"
                placeholder="Search"
                value={query}
                autoComplete="off"
                onChange={handleQuery}
            />
            {showSuggestions > 0 && (
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
