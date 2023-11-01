import { Link } from 'react-router-dom';

import DefaultInscription from './DefaultInscription.jsx';
import DefaultInfo from './DefaultInfo.jsx';

const Default = () => {
    return (
        <>
            <div className="center">
                <DefaultInscription />
                <DefaultInfo />
                <Link className="button-action default-button" to="/">
                    Back Home
                </Link>
            </div>
        </>
    );
};

export default Default;
