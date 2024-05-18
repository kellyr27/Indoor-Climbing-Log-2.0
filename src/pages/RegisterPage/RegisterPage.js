import React, { useState, useEffect } from 'react';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import { Grid, Paper, Typography } from '@mui/material';
import {useSnackbar} from 'notistack';
import Template3 from '../../templates/Template3';
import { registerUser } from '../../apis/users/index';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const validateUsername = (username) => {
    return username.length < 6 ? "Username must be at least 6 characters long" : null;
}


const validatePassword = (password) => {

    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    if (!/\d/.test(password)) {
        return "Password must contain a number";
    }
    if (!/[a-zA-Z]/.test(password)) {
        return "Password must contain a character";
    }
    return null;
};

const validateConfirmPassword = (password, confirmPassword) => {

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return null;
}

const RegisterPage = () => {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuthContext();


    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
        const usernameError = username.length < 6;
    
        setIsFormValid(!(passwordError || confirmPasswordError || usernameError));
    }, [username, password, confirmPassword]);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords do not match', { variant: 'error' });
            setPassword('')
            setConfirmPassword('')
            setShowPassword(false)
            return;
        }

        try {
            const {token} = await registerUser(username, password)
            localStorage.setItem('token', token);
            setIsAuthenticated(true);

            navigate('/ascents');
            enqueueSnackbar('User created successfully', { variant: 'success' })

        } catch (error) {
            const errorMessage = error.response.data.message
            enqueueSnackbar(errorMessage, { variant: 'error' })
        }
    };

    return (
        <Template3>
            <Paper sx={{ p: 2, m: 2, borderRadius: 4 }}>
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
                                error={username.length > 0 && validateUsername(username)}
                                helperText={username.length > 0 && validateUsername(username)}
                                required
                                fullWidth
								autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={password.length > 0 && validatePassword(password)}
                                helperText={password.length > 0 && validatePassword(password)}
                                required
                                fullWidth
								autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                fullWidth
                                error={confirmPassword.length > 0 && validateConfirmPassword(password, confirmPassword)}
                                helperText={confirmPassword.length > 0 && validateConfirmPassword(password, confirmPassword)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
								autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{borderRadius: 3}} disabled={!isFormValid}>
                                Create new user
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Template3>
    );
}

export default RegisterPage;