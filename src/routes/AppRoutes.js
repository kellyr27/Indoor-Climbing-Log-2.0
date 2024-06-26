import { Routes, Route, Navigate } from 'react-router-dom';
import AscentPage from '../pages/AscentPage/AscentPage';
import AscentsPage from '../pages/AscentsPage/AscentsPage';
import CreateAscentPage from '../pages/CreateAscentPage/CreateAscentPage';
import EditAscentPage from '../pages/EditAscentPage/EditAscentPage';
import EditRoutePage from '../pages/EditRoutePage/EditRoutePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import RoutePage from '../pages/RoutePage/RoutePage';
import RoutesPage from '../pages/RoutesPage/RoutesPage';
import StatsPage from '../pages/StatsPage/StatsPage';
import { useAuthContext } from '../context/AuthContext';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import AreasPage from '../pages/AreasPage';
import EditAreaPage from '../pages/EditAreaPage';
import AreaPage from '../pages/AreaPage';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated !== null && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    if (isAuthenticated !== null && isAuthenticated) {
      return <Navigate to="/ascents" />; // or wherever you want to redirect authenticated users
    }
    return children;
};

const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/routes/:id/edit" element={<ProtectedRoute><EditRoutePage /></ProtectedRoute>} />
            <Route path="/routes/:id" element={<ProtectedRoute><RoutePage /></ProtectedRoute>} />
            <Route path="/routes" element={<ProtectedRoute><RoutesPage /></ProtectedRoute>} />
            <Route path="/ascents/new" element={<ProtectedRoute><CreateAscentPage /></ProtectedRoute>} />
            <Route path="/ascents/:id/edit" element={<ProtectedRoute><EditAscentPage /></ProtectedRoute>} />
            <Route path="/ascents/:id" element={<ProtectedRoute><AscentPage /></ProtectedRoute>} />
            <Route path="/ascents" element={<ProtectedRoute><AscentsPage /></ProtectedRoute>} />
            <Route path="/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />
			<Route path="/areas/:id/edit" element={<ProtectedRoute><EditAreaPage /></ProtectedRoute>} />
			<Route path="/areas/:id" element={<ProtectedRoute><AreaPage /></ProtectedRoute>} />
			<Route path="/areas" element={<ProtectedRoute><AreasPage /></ProtectedRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path="/user/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )

}

export default AppRoutes;