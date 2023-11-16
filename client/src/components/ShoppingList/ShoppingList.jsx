import { useSelector } from 'react-redux';
import ListItemAttributes from '../ListItemAttributes/ListItemAttributes.jsx';
import ListActionIcons from '../ListActionIcons/ListActionIcons.jsx';
import { ListsTypes } from '../../shared/propTypes.js';

const ShoppingList = ({ handleSubmit, register, onAddItem, items, handleGoBack, handleClickDelete, handleCheckItem }) => {
    const { isHouseholdOwner } = useSelector((state) => state.household);

    return (
        <>
            <div className="shopping-list-container">
                <div className="list-container">
                    <h2 className="welcome-list">Shopping List</h2>
                    <div className="form-container">
                        {isHouseholdOwner && (
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
                        )}
                        <h4>Items</h4>
                        <ul className="lists">
                            {items.length ? (
                                items.map((item) => (
                                    <li className="list" key={item._id}>
                                        <span className="list-span-name">{item.text}</span>
                                        <span className="list-span-qty">{item.qty}</span>
                                        {isHouseholdOwner && (
                                            <ListItemAttributes handleCheckItem={handleCheckItem} itemId={item._id} />
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p>No items</p>
                            )}
                        </ul>
                    </div>
                </div>
                <ListActionIcons handleGoBack={handleGoBack} handleClickDelete={handleClickDelete} />
                <img src="/shopping-list.webp" alt="list image" className="list-image" />
            </div>
        </>
    );
};

ShoppingList.propTypes = ListsTypes;

export default ShoppingList;