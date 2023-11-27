import { Link } from 'react-router-dom';
import HouseholdItem from '../HouseholdItem/HouseholdItem.jsx';

const HouseholdList = ({ households }) => {
    return (
        <ul className="households-list" role="list">
            {households.map((household) => (
                <Link
                    key={household._id}
                    to={'/households/details/' + household._id}
                    className="my-household-link"
                    role="listitem">
                    <HouseholdItem household={household} />
                </Link>
            ))}
        </ul>
    );
};

export default HouseholdList;
