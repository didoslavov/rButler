import { Link } from 'react-router-dom';
import HouseholdItem from './HouseholdItem.jsx';
import { useSelector } from 'react-redux';

const HouseholdList = ({ households }) => {
    const { user } = useSelector((state) => state.user);

    return (
        <ul className="households-list">
            {households.map((household) => (
                <Link key={household._id} to={'/households/details/' + household._id} className="my-household-link">
                    <HouseholdItem household={household} isMaster={user.id === household.master} />
                </Link>
            ))}
        </ul>
    );
};

export default HouseholdList;
