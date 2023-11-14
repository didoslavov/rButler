import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
