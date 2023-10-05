import React, { useState } from 'react';
import { Divider, IconButton, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from '../ConfirmModal/AlertDialog.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const ShoppingList = () => {
    const [open, setOpenDialog] = useState(false);

    const handleClickDelete = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            {open && <AlertDialog handleClose={handleClose} open={open} message={'You are about to delete the list.'} />}
            <div className="shopping-list-container">
                <div className="list-container">
                    <h2 className="welcome-list">Shopping List</h2>
                    <div className="form-container">
                        <form className="form-list">
                            <label className="list-form-label">
                                <span>Item</span>
                            </label>
                            <input type="text" className="input item-input" />
                            <label className="list-form-label">
                                <span>Qty.</span>
                            </label>
                            <input type="number" className="input qty-input" />
                            <input type="submit" className="submit button list-submit" value={'Add item'} />
                        </form>
                        <h4>Items</h4>
                        <ul className="lists">
                            <li className="list">
                                <span className="list-span-name">Bread</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Onion</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Milk</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Salt</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Apples</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Oranges</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Lemons</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Sugar</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Coffee</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Beer</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                            <li className="list">
                                <span className="list-span-name">Peanuts</span>
                                <span className="list-span-qty">2</span>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                />
                                <IconButton aria-label="delete" size="medium">
                                    <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="icons">
                    <Tooltip
                        title="Back to Lists"
                        placement="top"
                        sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                        <Link to={'/households/details/'}>
                            <IconButton aria-label="back" size="large" sx={{ color: 'var(--dark-blue)' }}>
                                <ArrowBackIcon fontSize="inherit" />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip
                        title="Delete List"
                        placement="top"
                        sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                        <IconButton
                            aria-label="delete"
                            size="large"
                            sx={{ color: 'var(--dark-pink)' }}
                            onClick={handleClickDelete}>
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </div>
                <img src="/list.jpg" alt="list image" className="list-image" />
            </div>
        </>
    );
};

export default ShoppingList;
