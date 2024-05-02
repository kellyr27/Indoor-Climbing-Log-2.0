import { Routes, Route, Navigate } from 'react-router-dom';
import AscentPage from '../pages/AscentPage/AscentPage';
import AscentsPage from '../pages/AscentsPage/AscentsPage';
import CreateAscentPage from '../pages/CreateAscentPage/CreateAscentPage';
import EditAscentPage from '../pages/EditAscentPage/EditAscentPage';
import EditRoutePage from '../pages/EditRoutePage/EditRoutePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RoutePage from '../pages/RoutePage/RoutePage';
import RoutesPage from '../pages/RoutesPage/RoutesPage';
import StatsPage from '../pages/StatsPage/StatsPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/routes/:id/edit" exact element={<EditRoutePage />} />
            <Route path="/routes/:id" exact element={<RoutePage />} />
            <Route path="/routes" exact element={<RoutesPage />} />
            <Route path="/ascents/new" exact element={<CreateAscentPage />} />
            <Route path="/ascents/:id/edit" exact element={<EditAscentPage />} />
            <Route path="/ascents/:id" exact element={<AscentPage />} />
            <Route path="/ascents" exact element={<AscentsPage />} />
            <Route path="/stats" exact element={<StatsPage />} />
            <Route path="/" element={<Navigate to="/ascents" />} />
        </Routes>
    );
}

export default AppRoutes;