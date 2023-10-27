import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Notification from '../Notification/Notification.jsx';

import { setNotification } from '../../redux/slices/notificationSlice.js';

const Home = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { notification, severity, open } = useSelector((state) => state.notification);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const { redirectError } = location.state || '';

    const handleInfoNavigate = () => {
        navigate('/more-info');
    };

    const handleMyHouseholdsNavigate = () => (user ? navigate('/households/' + user.id) : navigate('/profile/auth'));

    useEffect(() => {
        if (redirectError) {
            dispatch(
                setNotification({
                    notification: [redirectError],
                    severity: 'error',
                    open: true,
                })
            );
        }
    }, [redirectError, dispatch, setNotification]);

    return (
        <div className="landing-container">
            <img src="/landing-page.avif" alt="landing image" className="landing-image" />
            <div className="landing-content">
                <h1 className="landing-title">Welcome home!</h1>
                <p className="landing-text">
                    Allow me to introduce myself: I am Alfred, your dedicated <span className="landing-text-prefix">react</span>
                    <span className="landing-text-suffix">butler</span> for all things home-related. With a touch of elegance and
                    efficiency, I am here to simplify your household management. Within these digital walls, you shall find the
                    means to keep a meticulous inventory of your treasures, recording their expiration dates and quantities with
                    the utmost precision. Should you wish to embark upon household endeavors, I offer an integrated to-do list,
                    ready to assist in your noble quests.
                </p>
                <div className="landing-buttons">
                    <button className="button-action" onClick={handleInfoNavigate}>
                        Learn More
                    </button>
                    {user && (
                        <button className="button-action" onClick={handleMyHouseholdsNavigate}>
                            My households
                        </button>
                    )}
                </div>
                <div className="air air1"></div>
                <div className="air air2"></div>
                <div className="air air3"></div>
                <div className="air air4"></div>
            </div>
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </div>
    );
};

export default Home;
