import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);

    const toggleFormsHandler = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <div className={`cont ${showLogin ? '' : 's--signup'}`}>
                <div className="form sign-in">
                    <h2 className="welcome">Your return is a delight!</h2>
                    <form action="post">
                        <label>
                            <span>Email</span>
                            <input type="email" className="input" />
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" className="input" />
                        </label>
                        <Link to="/password-reset">
                            <p className="forgot-pass">Forgot password?</p>
                        </Link>
                        <input type="submit" className="submit button" value={'Sign In'} />
                        <button type="button" className="fb-btn button">
                            Connect with <span>facebook</span>
                        </button>
                    </form>
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
                        <form action="post">
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
                            <input type="submit" className="submit button" value={'Sign Up'} />
                            <button type="button" className="fb-btn button">
                                Join with <span>facebook</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;
