import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserHouseholdById } from '../../services/householdsService.js';

const Details = () => {
    const token = localStorage.getItem('authToken');
    const { householdId } = useParams();
    const [household, setHousehold] = useState({});

    useEffect(() => {
        getUserHouseholdById(householdId, token).then((h) => setHousehold(h));
    }, [householdId, token]);

    return (
        //TODO: Populate with dinamic content
        <div className="details-container">
            <img className="details-image" src="/details-household.jpg" alt="detail-household" />
            <div className="details-content">
                <h4 className="details-header border-bottom">{household.name}</h4>
            </div>
        </div>
    );
};

export default Details;
