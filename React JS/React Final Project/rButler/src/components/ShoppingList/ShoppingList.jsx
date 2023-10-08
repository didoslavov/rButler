import React, { useEffect, useState } from 'react';
import { Divider, IconButton, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from '../ConfirmModal/AlertDialog.jsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addListItem, getListById, removeList, removeListItem } from '../../services/listsService.js';

const ShoppingList = ({ token }) => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const [open, setOpenDialog] = useState(false);
    const [items, setItems] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const handleClickDelete = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const onAddItem = async ({ text, qty }) => {
        const list = await addListItem(listId, { text, qty, token });
        reset();
        setItems(list.items);
    };

    const handleCheckItem = async (itemId) => {
        const list = await removeListItem(itemId, listId, token);
        setItems(list.items);
    };

    const handleDelete = async () => {
        await removeList(listId, token);
        navigate(-1);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        getListById(listId).then((list) => setItems(list?.items));
    }, []);

    return (
        <>
            {open && (
                <AlertDialog
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                    open={open}
                    message={'You are about to delete the list.'}
                />
            )}
            <div className="shopping-list-container">
                <div className="list-container">
                    <h2 className="welcome-list">Shopping List</h2>
                    <div className="form-container">
                        <form className="form-list" onSubmit={handleSubmit(onAddItem)}>
                            <label className="list-form-label">
                                <span>Item</span>
                            </label>
                            <input type="text" className="input item-input" {...register('text')} />
                            <label className="list-form-label">
                                <span>Qty.</span>
                            </label>
                            <input type="number" className="input qty-input" {...register('qty')} />
                            <input type="submit" className="submit button list-submit" value={'Add item'} />
                        </form>
                        <h4>Items</h4>
                        <ul className="lists">
                            {items.length ? (
                                items.map((item) => (
                                    <li className="list" key={item._id}>
                                        <span className="list-span-name">{item.text}</span>
                                        <span className="list-span-qty">{item.qty}</span>
                                        <Divider
                                            orientation="vertical"
                                            flexItem
                                            sx={{ backgroundColor: 'var(--dark-pink)', margin: '6px 0 0 8px' }}
                                        />
                                        <IconButton aria-label="delete" size="medium" onClick={() => handleCheckItem(item._id)}>
                                            <CheckIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                                        </IconButton>
                                    </li>
                                ))
                            ) : (
                                <p>No items</p>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="icons">
                    <Tooltip
                        title="Back to Lists"
                        placement="top"
                        sx={{ color: 'var(--dark-blue)', backgroundColor: 'var(--light-grey)' }}>
                        <IconButton aria-label="back" size="large" sx={{ color: 'var(--dark-blue)' }} onClick={handleGoBack}>
                            <ArrowBackIcon fontSize="inherit" />
                        </IconButton>
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
                <img src="/shopping-list.jpg" alt="list image" className="list-image" />
            </div>
        </>
    );
};

export default ShoppingList;
