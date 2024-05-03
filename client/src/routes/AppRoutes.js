import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import { useEffect } from 'react';

const AppRoutes = () => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/ascents');
        } else {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/routes/:id/edit" element={<EditRoutePage />} />
            <Route path="/routes/:id" element={<RoutePage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/ascents/new" element={<CreateAscentPage />} />
            <Route path="/ascents/:id/edit" element={<EditAscentPage />} />
            <Route path="/ascents/:id" element={<AscentPage />} />
            <Route path="/ascents" element={<AscentsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/ascents" : "/login"} replace />} />
        </Routes>
    );
}

export default AppRoutes;