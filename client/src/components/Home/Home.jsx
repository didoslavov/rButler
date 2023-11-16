import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import LandingWaves from './LandingWaves.jsx';

const Home = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleInfoNavigate = () => {
        navigate('/more-info');
    };

    const handleMyHouseholdsNavigate = () => (user ? navigate('/households/' + user.id) : navigate('/profile/auth'));

    return (
        <div className="landing-container">
            <img src="/landing-page.webp" alt="landing image" className="landing-image" />
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
                    <Link className="button-action" to="/learn-more">
                        Learn More
                    </Link>
                    {user && (
                        <button className="button-action" onClick={handleMyHouseholdsNavigate}>
                            My households
                        </button>
                    )}
                </div>
                <LandingWaves />
            </div>
        </div>
    );
};

export default Home;
