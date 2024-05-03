import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar';
import { AuthProvider } from './context/AuthContext';

function App() {
	return (
		<AuthProvider>
			<Router>
				<NavBar />
				<AppRoutes />
			</Router>
		</AuthProvider>
	);
}

export default App;
