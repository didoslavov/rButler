import React, { useState } from 'react';

const Login = () => {
    const [login, setLogin] = useState(true);

    const isLoginClicked = () => {
        setLogin(!login);
        console.log(login);
    };

    return (
        <>
            <div className={`cont ${login ? '' : 's--signup'}`}>
                <div className="form sign-in">
                    <h2>Welcome back,</h2>
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
                            <h2>New here?</h2>
                            <p>Sign up and discover great amount of new opportunities!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>If you already has an account, just sign in. We've missed you!</p>
                        </div>
                        <div className="img__btn" onClick={isLoginClicked}>
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2>Time to feel like home,</h2>
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

export default Login;
