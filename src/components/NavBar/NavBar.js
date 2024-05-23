import React, { useCallback, useState } from 'react'
import { AppBar, Toolbar, Tabs, Tab, Button, Tooltip, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import {useSnackbar} from 'notistack';
import { useTheme } from '@mui/material/styles';
import { Menu, MenuItem } from '@mui/material';
import { ListItemIcon, ListItemText } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import IconWithText from '../IconWithText';
import PlaceIcon from '@mui/icons-material/Place';
import RouteIcon from '@mui/icons-material/Route';
import FlagIcon from '@mui/icons-material/Flag';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


// Import png
import logo from '../../assets/climbinglogo.png';

const NavBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const {enqueueSnackbar} = useSnackbar();

	// Check if screen size is small or less using MUI
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const validPaths = ['/ascents', '/routes', '/areas', '/stats', '/login', '/register'];
	const basePath = validPaths.includes(`/${location.pathname.split('/')[1]}`) ? `/${location.pathname.split('/')[1]}` : false;

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

    const [anchorEl, setAnchorEl] = useState(null);
	const [anchorEl2, setAnchorEl2] = useState(null);
    const open = Boolean(anchorEl);
	const open2 = Boolean(anchorEl2);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (route) => {
        navigate(route);
        handleMenuClose();
    };

	const handleMenu2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleMenuClose2 = () => {
        setAnchorEl2(null);
    };

    const handleMenuClick2 = (route) => {
        navigate(route);
        handleMenuClose2();
    };

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
			opacity: 0.98, 
			zIndex: 1
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
					{!isSmallScreen && <>
						<Box>
							<Tooltip title="Climbing Log">
								<img src={logo} alt="logo" style={{height: 30, width: 30}}/>
							</Tooltip>
						</Box>
						<Box>
							{isAuthenticated !== null && (
								<Tabs value={basePath}>
									{isAuthenticated ? [
										createTab("ascents", <IconWithText icon={<FlagIcon/>} text="Ascents"/>, "/ascents"),
										createTab("routes", <IconWithText icon={<RouteIcon/>} text="Routes"/>, "/routes"),
										createTab("areas", <IconWithText icon={<PlaceIcon/>} text="Areas"/>, "/areas"),
										createTab("stats", <IconWithText icon={<BarChartIcon/>} text="Stats"/>, "/stats")
									] : [
										createTab("login", "Login", "/login"),
										createTab("register", "Register", "/register")
									]}
								</Tabs>
							)}
						</Box>
					</>}
					{isSmallScreen && <>
						<Box>

							<Button onClick={handleMenu2}>
								<MenuIcon/>
							</Button>
							<Menu
								anchorEl={anchorEl2}
								open={open2}
								onClose={handleMenuClose2}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
							>
								<MenuItem onClick={() => handleMenuClick2('/ascents')}>
									<ListItemIcon>
										<FlagIcon/>
									</ListItemIcon>
									<ListItemText primary="Ascents" />
								</MenuItem>
								<MenuItem onClick={() => handleMenuClick2('/routes')}>
									<ListItemIcon>
										<RouteIcon/>
									</ListItemIcon>
									<ListItemText primary="Routes" />
								</MenuItem>
								<MenuItem onClick={() => handleMenuClick2('/areas')}>
									<ListItemIcon>
										<PlaceIcon/>
									</ListItemIcon>
									<ListItemText primary="Areas" />
								</MenuItem>
								<MenuItem onClick={() => handleMenuClick2('/stats')}>
									<ListItemIcon>
										<BarChartIcon/>
									</ListItemIcon>
									<ListItemText primary="Stats" />
								</MenuItem>
							</Menu>
						</Box>
						<Box>
							<Tooltip title="Climbing Log">
								<img src={logo} alt="logo" style={{height: 30, width: 30}}/>
							</Tooltip>
						</Box>
					</>}
					{isAuthenticated && (
						<Box>
							<Tooltip title="Account">
								<Button onClick={handleMenu}>
									<AccountCircleIcon/>
								</Button>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleMenuClose}
								transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
								}}
							>
								<MenuItem onClick={() => handleMenuClick('/user/settings')}>
									<ListItemIcon>
										<SettingsIcon />
									</ListItemIcon>
									<ListItemText primary="Settings" />
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<ListItemIcon>
										<LogoutIcon />
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Box>
			</Toolbar>
		</AppBar>
    );
};

export default NavBar;