import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar/NavBar';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';

function App() {
	return (
		<SnackbarProvider
			autoHideDuration={5000}
		>
			<AuthProvider>
				<Router>
					<NavBar />
					<AppRoutes />
				</Router>
			</AuthProvider>
		</SnackbarProvider>
	);
}

export default App;