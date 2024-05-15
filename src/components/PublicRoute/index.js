import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    if (isAuthenticated) {
      	return <Navigate to="/ascents" />
    }
    return children;
}

export default PublicRoute;
