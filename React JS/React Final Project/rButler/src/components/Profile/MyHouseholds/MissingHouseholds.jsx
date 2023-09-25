import React from 'react';
import { Link } from 'react-router-dom';

const MissingHouseholds = () => {
    return (
        <div className="my-missing-household">
            <p>
                Regrettably, it appears that no households have been created under your esteemed account. Shall I assist you in
                the initiation of this noble endeavor, kindly select below?
            </p>
            <Link to="/create-household" className="button-action">
                Create household
            </Link>
        </div>
    );
};

export default MissingHouseholds;
