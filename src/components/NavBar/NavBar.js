import React, { useCallback } from 'react'
import { AppBar, Toolbar, Tabs, Tab, Button, Tooltip, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import LogoutIcon from '@mui/icons-material/Logout';
import {useSnackbar} from 'notistack';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
    const theme = useTheme();
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
            borderBottom: "2px solid #888",
            borderLeft: "1px solid #888",
            borderRight: "1px solid #888",
            [theme.breakpoints.down('lg')]: {
                borderLeft: "none",
                borderRight: "none"
            },
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
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
                        <Tooltip title="Logout">
                            <Box>
                                <Button onClick={handleLogout}>
                                    <LogoutIcon/>
                                </Button>
                            </Box>
                        </Tooltip>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;