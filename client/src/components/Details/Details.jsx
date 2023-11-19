import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CreateList from '../CreateList/CreateList.jsx';
import HouseholdUser from '../HouseholdUser/HouseholdUser.jsx';
import EditHousehold from '../EditHousehold/EditHousehold.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import Listings from '../Listings/Listings.jsx';
import Notification from '../Notification/Notification.jsx';
import SpeedDialMenu from '../SpeedDial/SpeedDial.jsx';
import ShareComponent from '../Share/Share.jsx';

import { getUserHouseholdById } from '../../services/householdsService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import { useLoading } from '../../hooks/useLoading.js';
import { clearFormVisibility } from '../../redux/slices/formVisibilitySlice.js';
import { setIsHouseholdOwner } from '../../redux/slices/householdSlice.js';

const Details = () => {
    const navigate = useNavigate();
    const { householdId } = useParams();
    const dispatch = useDispatch();
    const { isEditOpen, isCreateOpen, isAddMemberOpen, isShareOpen } = useSelector((state) => state.formVisibility);
    const { isHouseholdOwner } = useSelector((state) => state.household);
    const { notification, severity, open } = useSelector((state) => state.notification);
    const { user } = useSelector((state) => state.user);
    const [isLoading, handleLoading] = useLoading(true);

    const [household, setHousehold] = useState({});
    const [lists, setLists] = useState(household.lists || []);
    const [users, setUsers] = useState(household.users || []);

    const url = window.location.href;

    useEffect(() => {
        handleLoading(async () => {
            try {
                const res = await getUserHouseholdById(householdId);

                dispatch(clearFormVisibility());

                setHousehold(res);
                setLists(res.lists);
                setUsers(res.users);

                dispatch(setIsHouseholdOwner(res.users.some((u) => u.role === 'Master' && u.user?._id === user?.id)));
            } catch (error) {
                dispatch(
                    setNotification({
                        notification: [error.message],
                        severity: 'error',
                        open: true,
                    })
                );
                navigate('/profile/auth');
            }
        });
    }, [householdId, handleLoading, dispatch, navigate, user]);

    const handleUpdateHousehold = async () => {
        try {
            const res = await getUserHouseholdById(householdId);

            setHousehold(res);
            setLists(res.lists);
            setUsers(res.users);
        } catch (error) {
            navigate('/profile/auth');
        }
    };

    return (
        <div className="details-container">
            <img className="details-image" src="/details-household.webp" alt="detail-household" />
            <div className="details-content">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <h4 className="details-header border-bottom">{household.name}</h4>
                        <p className="details-text">
                            Welcome back to the sanctuary of your residence. Your return graces us with an air of refinement and
                            harmony. Please allow us to attend to your every need and make your stay as comfortable as a
                            well-tailored suit. How may we serve you today?
                        </p>

                        <div className="listings-container">
                            {!isEditOpen && !isCreateOpen && !isAddMemberOpen && !isShareOpen && (
                                <Listings lists={lists} isHouseholdOwner={isHouseholdOwner} />
                            )}
                            {isCreateOpen && <CreateList householdId={householdId} lists={lists} setLists={setLists} />}
                            {isAddMemberOpen && (
                                <HouseholdUser
                                    householdId={householdId}
                                    setUsers={setUsers}
                                    setHousehold={setHousehold}
                                    users={users}
                                />
                            )}
                            {isEditOpen && <EditHousehold household={household} handleUpdateHousehold={handleUpdateHousehold} />}
                            {isShareOpen && <ShareComponent url={url} />}
                        </div>
                        {notification && <Notification open={open} message={notification} severity={severity} />}
                    </>
                )}
                <div className="details-speed-dial">{user && <SpeedDialMenu isHouseholdOwner={isHouseholdOwner} />}</div>
            </div>
        </div>
    );
};

export default Details;
