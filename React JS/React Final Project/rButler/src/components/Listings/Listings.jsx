import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListingsTypes } from '../../shared/propTypes.js';
import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const Listings = ({ lists }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleShowCreateForm = () => {
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: true }));
    };

    return (
        <div className="details-lists-container">
            <h5 className="details-lists-header">Lists</h5>
            <ul className="details-lists">
                {lists.length ? (
                    lists.map((list) => (
                        <Link key={list._id} to={`/lists/${list.type}/${list._id}`}>
                            <li className="details-lists-item">
                                <span className="details-lists-text">{list.title}</span>
                            </li>
                        </Link>
                    ))
                ) : (
                    <div className="no-lists">
                        No new lists
                        {user ? (
                            <button className="button-action" onClick={handleShowCreateForm}>
                                Create List
                            </button>
                        ) : (
                            <Link to="/profile/auth" className="button-action">
                                Sign in to create a list
                            </Link>
                        )}
                    </div>
                )}
            </ul>
        </div>
    );
};

Listings.propTypes = ListingsTypes;

export default Listings;
