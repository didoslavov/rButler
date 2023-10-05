import { Link } from 'react-router-dom';

const Listings = ({ lists, handleShowCreateForm, token }) => {
    return (
        <div className="details-lists-container">
            <h5 className="details-lists-header border-bottom">Lists</h5>
            <ul className="details-lists">
                {lists.length ? (
                    lists.map((list) => (
                        <li key={list._id} className="details-lists-item">
                            <Link to={list.type === 'shopping' ? '/lists/shopping/' + list._id : '/lists/todo/' + list._id}>
                                <span className="details-lists-text">{list.title}</span>
                            </Link>
                        </li>
                    ))
                ) : (
                    <div className="no-lists">
                        No new lists
                        {token ? (
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

export default Listings;
