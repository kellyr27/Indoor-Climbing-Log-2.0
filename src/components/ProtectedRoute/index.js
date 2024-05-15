import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;