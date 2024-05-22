import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#dc004e',
		},
		error: {
			main: '#f44336',
		},
		warning: {
			main: '#ff9800',
		},
		info: {
			main: '#2196f3',
		},
		success: {
			main: '#4caf50',
		},
	},
	typography: {
		fontFamily: [
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','), 
	},
});

export default theme;