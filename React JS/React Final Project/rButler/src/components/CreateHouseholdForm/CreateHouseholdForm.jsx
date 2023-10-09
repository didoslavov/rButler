import React, { useState } from 'react';
import { createHousehold } from '../../services/householdsService.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification.jsx';

const CreateHouseholdForm = ({ user }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [notification, setNotification] = useState('');
    const [severity, setSeverity] = useState('');
    const [notify, setNotify] = useState(false);
    const [open, setOpen] = useState(false);

    const onCreateHousehold = async ({ name, presentation }) => {
        try {
            if (!name || !presentation) {
                throw ['All fields are required!'];
            }

            await createHousehold({ name, presentation, master: user.id });

            navigate('/households/' + user.id);
        } catch (error) {
            setSeverity('error');
            setNotification(error);
            setOpen(true);
            setNotify(true);
        }
    };

    return (
        <>
            <div className="household-container">
                <div className="create-household-container">
                    <h2 className="welcome welcome-household">
                        Welcome, esteemed guest, to the creation of your digital household.
                    </h2>
                    <form className="form-household" onSubmit={handleSubmit(onCreateHousehold)}>
                        <label>
                            <span>Household name</span>
                            <input type="text" className="input" {...register('name')} />
                        </label>
                        <label>
                            <span>Presentation</span>
                            <input type="text" className="input" {...register('presentation')} />
                        </label>
                        <input type="submit" className="submit button" value={'Create Household'} />
                    </form>
                </div>
                <img src="/create-household.jpg" alt="landing image" className="household-image" />
            </div>
            {notify && <Notification open={open} setOpen={setOpen} message={notification} severity={severity} />}
        </>
    );
};

export default CreateHouseholdForm;
