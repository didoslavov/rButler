import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ token, setToken, user }) => {
    const navigate = useNavigate();

    const handleInfoNavigate = () => {
        navigate('/more-info');
    };

    const handleMyHouseholdsNavigate = () => (token ? navigate('/households/' + user.id) : navigate('/profile/auth'));

    useEffect(() => {
        const localStorageToken = localStorage.getItem('userData')?.token;

        if (localStorageToken) {
            setToken(localStorageToken);
        } else {
            setToken('');
        }
    }, [token]);

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
                    {token && (
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
        </div>
    );
};

export default Home;
