import React from 'react';

const Home = () => {
    return (
        <div className="landing-container">
            <img src="/landing-page.avif" alt="landing image" className="landing-image" />
            <div className="landing-content">
                <h1 className="landing-title">Welcome home!</h1>
                <p className="landing-text">
                    Allow me to introduce myself: I am Alfred, your dedicated <span className="prefix">react</span>
                    <span className="suffix">butler</span> for all things home-related. With a touch of elegance and efficiency, I
                    am here to simplify your household management. Within these digital walls, you shall find the means to keep a
                    meticulous inventory of your treasures, recording their expiration dates and quantities with the utmost
                    precision. Should you wish to embark upon household endeavors, I offer an integrated to-do list, ready to
                    assist in your noble quests.
                </p>
                <button className="landing-button">Learn More</button>
                <div className="air air1"></div>
                <div className="air air2"></div>
                <div className="air air3"></div>
                <div className="air air4"></div>
            </div>
        </div>
    );
};

export default Home;
