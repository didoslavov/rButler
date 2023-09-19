import React, { useState } from 'react';

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);

    const toggleFormsHandler = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <div className={`cont ${showLogin ? '' : 's--signup'}`}>
                <div className="form sign-in">
                    <h2 className="welcome-sign-in">Your return is a delight!</h2>
                    <label>
                        <span>Email</span>
                        <input type="email" className="input" />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" className="input" />
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="button" className="submit button">
                        Sign In
                    </button>
                    <button type="button" className="fb-btn button">
                        Connect with <span>facebook</span>
                    </button>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>Are you a newcomer to these premises?</h2>
                            <p>Enroll now and unlock a wealth of fresh possibilities!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>Ah, might you be a part of our distinguished company?</h2>
                            <p>
                                Should you be a prior member, a mere sign-in shall suffice. Your presence has been sorely missed,
                                and we extend a warm welcome back to you.
                            </p>
                        </div>
                        <div className="img__btn" onClick={toggleFormsHandler}>
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2 className="welcome-sign-up">Step inside, dear newcomer!</h2>
                        <label>
                            <span>Name</span>
                            <input type="text" className="input" />
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="email" className="input" />
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" className="input" />
                        </label>
                        <button type="button" className="submit button">
                            Sign Up
                        </button>
                        <button type="button" className="fb-btn button">
                            Join with <span>facebook</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
