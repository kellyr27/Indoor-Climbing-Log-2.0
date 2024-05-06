import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl'
import { useNavigate} from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import { Grid, Paper, Typography, Alert } from '@mui/material';
import {useSnackbar} from 'notistack';
import Template3 from '../../templates/Template3';


const LoginPage = () => {

    const {enqueueSnackbar} = useSnackbar();

    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuthContext();

    const [username, setUsername] = useState('kelly');
    const [password, setPassword] = useState('password1?');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            username,
            password
        };

        try {
            const response = await axios.post(`${baseUrl}/users/login`, payload);
            
            // Get the token and store it in the local storage
            const { token } = response.data;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);

            // Redirect to the ascents page using navigate
            navigate('/ascents');
            enqueueSnackbar('Login successful', { variant: 'success' })

        } catch (error) {
            enqueueSnackbar('Login failed', { variant: 'error' })
            console.error(error);
        }
    };

    return (
        <Template3>
            <Alert variant="filled" severity="info" sx={{ borderRadius: 2, m: 2}}>
                    Use the username "kelly" and password "password1?" to login
            </Alert>
            <Paper sx={{ p: 2, borderRadius: 4, m: 2 }}>
                <Typography variant="h4" align="center" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{borderRadius: 3}}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Template3>
    );
}

export default LoginPage;