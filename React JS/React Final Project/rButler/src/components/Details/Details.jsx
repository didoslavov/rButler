import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CreateListForm from '../CreateListForm/CreateListForm.jsx';
import HouseholdUserForm from '../HouseholdUserForm/HouseholdUserForm.jsx';
import EditHousehold from '../EditHousehold/EditHousehold.jsx';
import Spinner from '../LoadingSpinner/Spinner.jsx';
import Listings from '../Listings/Listings.jsx';
import Notification from '../Notification/Notification.jsx';
import SpeedDialMenu from '../SpeedDial/SpeedDial.jsx';
import ShareComponent from '../Share/Share.jsx';

import { getUserHouseholdById } from '../../services/householdsService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import { useLoading } from '../../hooks/useLoading.js';
import { clearFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const Details = () => {
    const { householdId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isEditOpen, isCreateOpen, isAddMemberOpen, isShareOpen } = useSelector((state) => state.formVisibility);
    const { notification, severity, open } = useSelector((state) => state.notification);
    const { user } = useSelector((state) => state.user);
    const [isLoading, handleLoading] = useLoading(true);

    const [household, setHousehold] = useState({});
    const [lists, setLists] = useState(household.lists || []);
    const [users, setUsers] = useState(household.users || []);
    const [isHouseholdOwner, setIsHouseholdOwner] = useState(false);

    const url = window.location.href;

    useEffect(() => {
        handleLoading(async () => {
            const res = await getUserHouseholdById(householdId);

            if (!user) {
                dispatch(clearFormVisibility());
            }

            if (res.error) {
                dispatch(
                    setNotification({
                        notification: 'Authentication Failed',
                        severity: 'error',
                        open: true,
                    })
                );
                navigate('/profile/auth');
            }

            setHousehold(res);
            setLists(res.lists);
            setUsers(res.users);
            setIsHouseholdOwner(res.users.some((m) => m.role === 'Master' && m.user?._id === user?.id));
        });
    }, [householdId, handleLoading, dispatch, navigate]);

    const handleUpdateHousehold = async () => {
        const updatedHousehold = await getUserHouseholdById(householdId);

        if (updatedHousehold.error) {
            navigate('/profile/auth');
        } else {
            setHousehold(updatedHousehold);
            setLists(updatedHousehold.lists);
            setUsers(updatedHousehold.users);
        }
    };

    return (
        <div className="details-container">
            <img className="details-image" src="/details-household.jpg" alt="detail-household" />
            <div className="details-content">
                {isLoading ? (
                    <Spinner />
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
                            {!isEditOpen && !isAddMemberOpen && isCreateOpen && (
                                <CreateListForm householdId={householdId} lists={lists} setLists={setLists} />
                            )}
                            {!isEditOpen && !isCreateOpen && isAddMemberOpen && (
                                <HouseholdUserForm
                                    householdId={householdId}
                                    setUsers={setUsers}
                                    setHousehold={setHousehold}
                                    users={users}
                                />
                            )}
                            {!isCreateOpen && !isAddMemberOpen && isEditOpen && (
                                <EditHousehold household={household} handleUpdateHousehold={handleUpdateHousehold} />
                            )}
                            {!isCreateOpen && !isAddMemberOpen && !isEditOpen && isShareOpen && <ShareComponent url={url} />}
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
