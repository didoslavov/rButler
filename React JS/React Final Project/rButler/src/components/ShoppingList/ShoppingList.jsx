import React from 'react';
import { Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingList = () => {
    return (
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
                            <span className="list-span">Bread</span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">Onion</span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">Milk</span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">
                                Perferendis delectus a maiores consectetur unde dicta excepturi illo ad.
                            </span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">
                                Fuga, molestias. Nostrum in expedita ab id perferendis neque laboriosam?
                            </span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">
                                Odio pariatur, et in praesentium aliquid maiores sequi quibusdam aperiam!
                            </span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">
                                Necessitatibus vero labore iure recusandae officia ipsa quas cum ut!
                            </span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">Vel tempora et error quis quae dolorum veritatis eveniet aliquid!</span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">Vel tempora et error quis quae dolorum veritatis eveniet aliquid!</span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">Vel tempora et error quis quae dolorum veritatis eveniet aliquid!</span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                        <li className="list">
                            <span className="list-span">Vel tempora et error quis quae dolorum veritatis eveniet aliquid!</span>
                            <IconButton aria-label="delete" size="large">
                                <Divider orientation="vertical" flexItem sx={{ backgroundColor: 'var(--dark-pink)' }} />
                                <DeleteIcon sx={{ color: 'var(--dark-blue)' }} fontSize="inherit" />
                            </IconButton>
                        </li>
                    </ul>
                </div>
            </div>
            <img src="/list.jpg" alt="list image" className="list-image" />
        </div>
    );
};

export default ShoppingList;
