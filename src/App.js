import './App.css';
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
						<AppRoutes />
				</AuthProvider>
			</HoldsBackgroundProvider>
		</SnackbarProvider>
	);
}

export default App;
