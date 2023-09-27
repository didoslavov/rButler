import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserHouseholdById } from '../../services/householdsService.js';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { AddHomeSharp, ExtensionSharp, HomeSharp, ModeEditSharp, ShareRounded } from '@mui/icons-material';

const Details = () => {
    const token = localStorage.getItem('authToken');
    const { householdId } = useParams();
    const [household, setHousehold] = useState({});

    const actions = [
        {
            icon: (
                <Link to="/" className="details-speed-dial-link">
                    <AddHomeSharp />
                </Link>
            ),
            name: 'Add Household Member',
        },
        {
            icon: (
                <Link className="details-speed-dial-link">
                    <ModeEditSharp />
                </Link>
            ),
            name: 'Edit Household',
        },
        {
            icon: (
                <Link className="details-speed-dial-link">
                    <ExtensionSharp />
                </Link>
            ),
            name: 'Household Extras',
        },
        {
            icon: (
                <Link className="details-speed-dial-link">
                    <ShareRounded />
                </Link>
            ),
            name: 'Share Household',
        },
    ];

    useEffect(() => {
        getUserHouseholdById(householdId, token).then((h) => setHousehold(h));
    }, [token]);

    return (
        <div className="details-container">
            <img className="details-image" src="/details-household.jpg" alt="detail-household" />
            <div className="details-content">
                <h4 className="details-header border-bottom">{household.name}</h4>
                <p className="details-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt exercitationem ratione suscipit porro nihil
                    beatae doloremque ullam, nobis voluptate perferendis!
                </p>
                <div className="details-speed-dial">
                    <SpeedDial
                        sx={{
                            '& .MuiFab-primary': {
                                backgroundColor: 'var(--light-grey)',
                                color: 'var(--dark-blue)',
                                border: '1px solid var(--dark-blue)',
                                '&:hover': {
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'var(--light-grey)',
                                },
                            },
                        }}
                        ariaLabel="Household Controls"
                        direction="right"
                        icon={<HomeSharp />}>
                        {actions.map((action) => (
                            <SpeedDialAction
                                sx={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'var(--light-grey)',
                                    '&:hover': { backgroundColor: 'var(--light-grey)', color: 'var(--dark-blue)' },
                                }}
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                            />
                        ))}
                    </SpeedDial>
                </div>
            </div>
        </div>
    );
};

export default Details;
