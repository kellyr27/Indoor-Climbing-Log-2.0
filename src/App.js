import './App.css';
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext';
import {HoldsBackgroundProvider} from './context/HoldsBackgroundContext';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import theme from './themes';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				autoHideDuration={5000}
			>
				<HoldsBackgroundProvider>
					<AuthProvider>
							<AppRoutes />
					</AuthProvider>
				</HoldsBackgroundProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
