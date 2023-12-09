import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Notification from '../Notification/Notification.jsx';

import { setNotification } from '../../redux/slices/notificationSlice.js';
import { createHousehold } from '../../services/householdsService.js';

const CreateHousehold = () => {
    const dispatch = useDispatch();
    const { notification, severity, open } = useSelector((state) => state.notification);
    const { user } = useSelector((state) => state.user);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onCreateHousehold = async ({ name, presentation }) => {
        try {
            if (!name.trim() || !presentation.trim()) {
                throw new Error('All fields are required!');
            }

            await createHousehold({ name, presentation, master: user.id });

            navigate('/households/' + user.id);
        } catch (error) {
            dispatch(
                setNotification({
                    notification: [error.message],
                    severity: 'error',
                    open: true,
                })
            );
        }
    };

    return (
        <>
            <div className="household-container">
                <div className="create-household-container">
                    <h2 className="welcome welcome-household">
                        Welcome, esteemed guest, to the creation of your digital household.
                    </h2>
                    <div className="form-household-container">
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
                </div>
                <img src="/create-household.webp" alt="Create Household" className="household-image" />
            </div>
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </>
    );
};

export default CreateHousehold;
