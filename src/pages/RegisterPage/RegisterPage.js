import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl'
import { useNavigate} from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import { Box, Grid, Paper, Typography } from '@mui/material';
import {useSnackbar} from 'notistack';

const RegisterPage = () => {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            username,
            password
        };

        try {
            const response = await axios.post(`${baseUrl}/users/register`, payload);
            
            // Get the token and store it in the local storage
            const { token } = response.data;
            console.log('token', token, response.data)
            localStorage.setItem('token', token);
            setIsAuthenticated(true);

            // Redirect to the ascents page using navigate
            navigate('/ascents');
            enqueueSnackbar('User created successfully', { variant: 'success' })

        } catch (error) {
            console.error(error);
            enqueueSnackbar('User creation failed', { variant: 'error' })
        }
    };

    return (
        <Grid container justifyContent="center"  sx={{backgroundColor: '#FDFFC2'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: { xs: 'center', sm: 'center' },
                    minHeight: '92vh',
                }}
            >
                <Paper sx={{ padding: 2,  maxWidth: { xs: '100%', sm: 500 } }}>
                    <Typography variant="h4" align="center" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}>
                        Register
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
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Create new user
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Grid>
    );
}

export default RegisterPage;