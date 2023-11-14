import { subContentTypes } from '../../shared/propTypes.js';

const SubContent = ({ toggleFormsHandler }) => {
    return (
        <div className="img">
            <div className="img__text m--up">
                <h2>Are you a newcomer to these premises?</h2>
                <p>Enroll now and unlock a wealth of fresh possibilities!</p>
            </div>
            <div className="img__text m--in">
                <h2>Ah, might you be a part of our distinguished company?</h2>
                <p>
                    Should you be a prior member, a mere sign-in shall suffice. Your presence has been sorely missed, and we
                    extend a warm welcome back to you.
                </p>
            </div>
            <div className="img__btn" onClick={toggleFormsHandler}>
                <span className="m--up">Sign Up</span>
                <span className="m--in">Sign In</span>
            </div>
        </div>
    );
};

SubContent.propTypes = subContentTypes;

export default SubContent;
