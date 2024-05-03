import React from 'react'
import { AppBar, Toolbar, Tabs, Tab, Button, Tooltip, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, setIsAuthenticated } = useAuthContext(); // Get the authentication status from the context

    const basePath = `/${location.pathname.split('/')[1]}`;

    const handleTabClick = (route) => {
        navigate(route);
    };

    return (
        <AppBar position="sticky" sx={{
            backgroundColor: "#bbb",
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
                    {isAuthenticated && (
                        <Box>
                            <Tooltip title="Add an ascent">
                                <Button onClick={() => navigate('/ascents/new')} sx={{
                                    borderRadius: "15%",
                                    backgroundColor: 'rgb(0, 0, 0, 0.15)',
                                }}>
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        </Box>

                    )}
                    <Box>
                        <Tabs value={basePath}>
                            {isAuthenticated ? (
                                <>
                                    <Tab label="Ascents" value="/ascents" onClick={() => handleTabClick('/ascents')} />
                                    <Tab label="Routes" value="/routes" onClick={() => handleTabClick('/routes')} />
                                    <Tab label="Stats" value="/stats" onClick={() => handleTabClick('/stats')} />
                                </>
                            ) : (
                                <>
                                    <Tab label="Login" value="/login" onClick={() => handleTabClick('/login')} />
                                    <Tab label="Register" value="/register" onClick={() => handleTabClick('/register')} />
                                </>
                            )}
                        </Tabs>
                    </Box>
                    {isAuthenticated && (
                        <Box>
                            <Button onClick={() => {
                                localStorage.removeItem('token');
                                setIsAuthenticated(false);
                                navigate('/login');
                            }}>
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