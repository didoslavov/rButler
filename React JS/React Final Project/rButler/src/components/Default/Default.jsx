import React from 'react';
import { Link } from 'react-router-dom';

const Default = () => {
    return (
        <>
            <div className="center">
                <div className="error">
                    <div className="number">4</div>
                    <div className="illustration">
                        <div className="circle"></div>
                        <div className="clip">
                            <div className="paper">
                                <div className="face">
                                    <div className="eyes">
                                        <div className="eye eye-left"></div>
                                        <div className="eye eye-right"></div>
                                    </div>
                                    <div className="rosyCheeks rosyCheeks-left"></div>
                                    <div className="rosyCheeks rosyCheeks-right"></div>
                                    <div className="mouth"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="number">4</div>
                </div>

                <div className="text">
                    <h4>Ah, it appears you've taken a detour into uncharted territory.</h4>
                    <p>
                        Fear not, dear guest, for even in the land of <span>404</span> your digital butler shall guide you with
                        utmost decorum and wit. Please pardon the interruption, as we prepare a suitable diversion for your
                        journey back home.
                    </p>
                </div>
                <Link className="button-404" to="/">
                    Back Home
                </Link>
            </div>
        </>
    );
};

export default Default;
