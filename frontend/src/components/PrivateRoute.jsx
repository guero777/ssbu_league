import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './PrivateRoute.css';

const PrivateRoute = ({ children }) => {
    const { userRole, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!userRole || userRole === 'ANONYMOUS') {
        // Save the attempted URL for redirecting after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
