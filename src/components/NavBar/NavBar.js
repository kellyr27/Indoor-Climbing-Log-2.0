import React, { useCallback } from 'react'
import { AppBar, Toolbar, Tabs, Tab, Button, Tooltip, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import {useSnackbar} from 'notistack';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const {enqueueSnackbar} = useSnackbar();

    const basePath = `/${location.pathname.split('/')[1]}`

    const handleTabClick = useCallback((route) => {
        navigate(route);
    }, [navigate]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
        enqueueSnackbar('Logged out successfully', { variant: 'success' });
    }, [setIsAuthenticated, navigate, enqueueSnackbar]);

    const createTab = (key, label, value) => (
        <Tab key={key} label={label} value={value} onClick={() => handleTabClick(value)} />
    );

    return (
        <AppBar position="sticky" sx={{
            backgroundColor: "#A3D8FF",
            color: "white",
            boxShadow: "none",
            borderBottom: "1px solid #888",
        }}>
            <Toolbar>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: {
                        xs: "space-between",
                        sm: "space-between",
                    }
                }}>
                    <Box>
                        {isAuthenticated !== null && (
                            <Tabs value={basePath}>
                                {isAuthenticated ? [
                                    createTab("ascents", "Ascents", "/ascents"),
                                    createTab("routes", "Routes", "/routes"),
                                    createTab("stats", "Stats", "/stats")
                                ] : [
                                    createTab("login", "Login", "/login"),
                                    createTab("register", "Register", "/register")
                                ]}
                            </Tabs>
                        )}
                    </Box>
                    {isAuthenticated && (
                        <Box>
                            <Button onClick={handleLogout}>
                                <LogoutIcon/>
                            </Button>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;