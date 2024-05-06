import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext';
import {HoldsBackgroundProvider} from './context/HoldsBackgroundContext';
import { SnackbarProvider } from 'notistack';

function App() {
	return (
		<SnackbarProvider
			autoHideDuration={5000}
		>
			<HoldsBackgroundProvider>
				<AuthProvider>
					<Router>
						<AppRoutes />
					</Router>
				</AuthProvider>
			</HoldsBackgroundProvider>
		</SnackbarProvider>
	);
}

export default App;
