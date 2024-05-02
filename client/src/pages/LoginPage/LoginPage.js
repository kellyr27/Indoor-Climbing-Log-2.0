import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl'
import { useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

            // Redirect to the ascents page using navigate
            navigate('/ascents');

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>LoginPage</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default LoginPage;