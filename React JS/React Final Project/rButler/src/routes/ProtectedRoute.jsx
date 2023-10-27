import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/profile/auth" state={{ redirectError: 'Please sign in order to access this recourse!' }} />
    );
};

export default ProtectedRoute;
