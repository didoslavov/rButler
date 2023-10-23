import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserHouseholdById } from '../../services/householdsService.js';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { AddHomeSharp, ChecklistSharp, HomeSharp, ModeEditSharp, ShareRounded } from '@mui/icons-material';
import { speedDialActionStyles, speedDialStyles } from '../../styles/muiStyles/muiStyles.js';
import CreateListForm from '../CreateListForm/CreateListForm.jsx';
import HouseholdUserForm from '../HouseholdUserForm/HouseholdUserForm.jsx';
import EditHousehold from '../EditHousehold/EditHousehold.jsx';
import Spinner from '../LoadingSpinner/Spinner.jsx';
import Listings from '../Listings/Listings.jsx';
import Notification from '../Notification/Notification.jsx';
import { useSelector } from 'react-redux';

const Details = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const { householdId } = useParams();
    const [household, setHousehold] = useState({});
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [lists, setLists] = useState(household.lists || []);
    const [users, setUsers] = useState(household.users || []);
    const [notification, setNotification] = useState('');
    const [severity, setSeverity] = useState('');
    const [notify, setNotify] = useState(false);
    const [openNotify, setOpenNotify] = useState(false);

    useEffect(() => {
        getUserHouseholdById(householdId).then((res) => {
            if (res.error) {
                navigate('/profile/auth');
            }

            setHousehold(res);
            setLists(res.lists);
            setUsers(res.users);
            setIsLoading(false);
        });
    }, [householdId]);

    const handleShowEditForm = () => {
        setIsEditOpen(!isEditOpen);
        setIsCreateOpen(false);
        setIsAddMemberOpen(false);
    };

    const handleShowCreateForm = () => {
        setIsCreateOpen(!isCreateOpen);
        setIsEditOpen(false);
        setIsAddMemberOpen(false);
    };

    const handleShowAddMemberForm = () => {
        setIsAddMemberOpen(!isAddMemberOpen);
        setIsCreateOpen(false);
        setIsEditOpen(false);
    };

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
                            {!isEditOpen && !isCreateOpen && !isAddMemberOpen ? (
                                <Listings handleShowCreateForm={handleShowCreateForm} lists={lists} />
                            ) : null}
                            {!isEditOpen && !isAddMemberOpen && isCreateOpen ? (
                                <CreateListForm
                                    householdId={householdId}
                                    lists={lists}
                                    setLists={setLists}
                                    setIsCreateOpen={setIsCreateOpen}
                                    handleShowCreateForm={handleShowCreateForm}
                                    setNotification={setNotification}
                                    setSeverity={setSeverity}
                                    setNotify={setNotify}
                                    setOpenNotify={setOpenNotify}
                                />
                            ) : null}
                            {!isEditOpen && !isCreateOpen && isAddMemberOpen ? (
                                <HouseholdUserForm
                                    householdId={householdId}
                                    setUsers={setUsers}
                                    setHousehold={setHousehold}
                                    users={users}
                                    handleShowAddMemberForm={handleShowAddMemberForm}
                                    setNotification={setNotification}
                                    setSeverity={setSeverity}
                                    setNotify={setNotify}
                                    setOpenNotify={setOpenNotify}
                                />
                            ) : null}
                            {!isCreateOpen && !isAddMemberOpen && isEditOpen ? (
                                <EditHousehold
                                    household={household}
                                    handleShowEditForm={handleShowEditForm}
                                    handleUpdateHousehold={handleUpdateHousehold}
                                    setNotification={setNotification}
                                    setSeverity={setSeverity}
                                    setNotify={setNotify}
                                    setOpenNotify={setOpenNotify}
                                />
                            ) : null}
                        </div>
                        {notify && (
                            <Notification open={openNotify} setOpen={setOpenNotify} message={notification} severity={severity} />
                        )}
                    </>
                )}
                <div className="details-speed-dial">
                    {user && (
                        <SpeedDial sx={speedDialStyles} ariaLabel="Household Controls" direction="right" icon={<HomeSharp />}>
                            {user.id === household.master && [
                                <SpeedDialAction
                                    sx={speedDialActionStyles}
                                    key={'Add Household Member'}
                                    icon={
                                        <Link className="details-speed-dial-link" onClick={handleShowAddMemberForm}>
                                            <AddHomeSharp />
                                        </Link>
                                    }
                                    tooltipTitle={'Add Household Member'}
                                />,
                                <SpeedDialAction
                                    onClick={handleShowEditForm}
                                    sx={speedDialActionStyles}
                                    key={'Edit Household'}
                                    icon={
                                        <Link className="details-speed-dial-link">
                                            <ModeEditSharp />
                                        </Link>
                                    }
                                    tooltipTitle={'Edit Household'}
                                />,
                            ]}
                            <SpeedDialAction
                                onClick={handleShowCreateForm}
                                sx={speedDialActionStyles}
                                key={'Create List'}
                                icon={
                                    <Link className="details-speed-dial-link">
                                        <ChecklistSharp />
                                    </Link>
                                }
                                tooltipTitle={'Create List'}
                            />
                            <SpeedDialAction
                                sx={speedDialActionStyles}
                                key={'Share Household'}
                                icon={
                                    <Link className="details-speed-dial-link">
                                        <ShareRounded />
                                    </Link>
                                }
                                tooltipTitle={'Share Household'}
                            />
                        </SpeedDial>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Details;
