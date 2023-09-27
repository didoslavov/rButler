import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserHouseholdById } from '../../services/householdsService.js';
import { IconButton, Paper, Popover, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import { AddHomeSharp, Close, ExtensionSharp, HomeSharp, ModeEditSharp, ShareRounded } from '@mui/icons-material';

const Details = () => {
    const token = localStorage.getItem('authToken');
    const { householdId } = useParams();
    const [household, setHousehold] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const actions = [
        {
            icon: (
                <Link className="details-speed-dial-link" onClick={(event) => handlePopupOpen(event)}>
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

    const handlePopupOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setAnchorEl(null);
        setIsPopupOpen(false);
    };

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
                <Popover
                    open={isPopupOpen}
                    anchorEl={anchorEl}
                    onClose={handlePopupClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    <Paper
                        sx={{
                            padding: '20px',
                            border: '1px solid var(--dark-blue)',
                            backgroundColor: 'var(--light-grey)',
                            color: 'var(--dark-blue)',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            '& h4': {
                                textAlign: 'center',
                            },
                            '& label': {
                                marginTop: '5px',
                                marginBottom: '5px',
                            },
                            '& .details-popup-input': {
                                border: '1px solid var(--dark-blue)',
                                padding: '5px',
                                color: 'var(--dark-blue)',
                                '&::placeholder': {
                                    textAlign: 'center',
                                },
                            },
                            '& .add-button': {
                                marginTop: '5px',
                                fontSize: '12px',
                                padding: '6px',
                            },
                        }}>
                        <IconButton
                            aria-label="close"
                            onClick={handlePopupClose}
                            sx={{
                                position: 'absolute',
                                top: '2px',
                                right: '0',
                                '& .css-i4bv87-MuiSvgIcon-root': {
                                    fontSize: '1rem',
                                    color: 'var(--dark-blue)',
                                },
                            }}>
                            <Close />
                        </IconButton>
                        <div className="popup-form-container"></div>
                        <h4 className="border-bottom">Add household member</h4>
                        <form className="popup-form">
                            <label htmlFor="username">Username</label>
                            <input className="details-popup-input" type="text" name="username" placeholder="Username to add?" />
                            <label htmlFor="role">Role</label>
                            <input className="details-popup-input" type="text" name="role" placeholder="Add user role" />
                            <input type="submit" name="button" value="ADD" className="button-action add-button" />
                        </form>
                    </Paper>
                </Popover>
            </div>
        </div>
    );
};

export default Details;
