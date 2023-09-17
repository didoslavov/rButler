import React from 'react';

const Home = () => {
    return (
        <div className="landing-container">
            <img src="../../../public/landing-page.avif" alt="" className="landing-image" />
            <div className="landing-content">
                <h1 className="landing-title">Welcome to our page!</h1>
                <p className="landing-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sequi, magni modi consectetur aspernatur a dicta
                    error dolorem soluta earum beatae natus hic incidunt consequatur nihil? Consequuntur, consectetur corrupti
                    autem incidunt veritatis deleniti.
                </p>
                <button className="landing-button">Learn More</button>
                <div class="air air1"></div>
                <div class="air air2"></div>
                <div class="air air3"></div>
                <div class="air air4"></div>
            </div>
        </div>
    );
};

export default Home;
