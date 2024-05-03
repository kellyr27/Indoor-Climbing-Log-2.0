import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../assets/tickTypeIcons/index';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import baseUrl from '../../utils/baseUrl';
import { useSnackbar } from 'notistack';
/**
 * TODO: Remove the word INPUT
 */

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const popularColors = ['black', 'white', 'blue', 'red', 'gray', 'green', 'yellow', 'purple', 'orange', 'pink'];

const EditAscentPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const [date, setDate] = useState(getTodayDate());
    const [notes, setNotes] = useState('');
    const [inputRouteName, setInputRouteName] = useState('');
    const [inputRouteGrade, setInputRouteGrade] = useState('');
    const [inputRouteColour, setInputRouteColour] = useState('');
    const [tickType, setTickType] = useState('');
    const [routes, setRoutes] = useState([]);
    const [gradeDisabled, setGradeDisabled] = useState(false);
    const [isInitialRouteFirstAscent, setIsInitialRouteFirstAscent] = useState(false);
    const [initialRouteId, setInitialRouteId] = useState(null);
    const [showFlash, setShowFlash] = useState(false);

    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleInputRouteNameChange = (e, value) => {
        setInputRouteName(value);
    };

    const handleInputRouteGradeChange = (e) => {
        setInputRouteGrade(e.target.value);
    };

    const handleInputRouteColourChange = (e) => {
        setInputRouteColour(e.target.value);
    }

    const handleTickTypeChange = (e, newTickType) => {
        setTickType(newTickType);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tickType) {
            enqueueSnackbar('Please select a tick type', { variant: 'warning' });
            return;
        }
        
        // Create a new ascent object
        const newAscent = {
            date: new Date(date).toISOString(),
            notes,
            route: {
                name: inputRouteName,
                grade: inputRouteGrade,
                colour: inputRouteColour
            },
            tickType
        }

        const token = localStorage.getItem('token');
        axios.put(`${baseUrl}/ascents/${id}`, newAscent, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                // Handle the response
                navigate('/ascents');
                enqueueSnackbar('Ascent updated successfully', { variant: 'success' });
            })
            .catch((error) => {
                // Handle the error
                console.error('Error:', error);
                enqueueSnackbar('Failed to update ascent', { variant: 'error' });
            });

    };

    useEffect(() => {
        // Fetch routes from API
        const token = localStorage.getItem('token');
        axios.get(`${baseUrl}/routes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${baseUrl}/ascents/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const ascent = response.data;
                setDate(ascent.date.split('T')[0]);
                setNotes(ascent.notes);
                setInitialRouteId(ascent.route._id);
                setInputRouteName(ascent.route.name);
                setIsInitialRouteFirstAscent(ascent.isOnlyAscent);
                setShowFlash(ascent.isOnlyAscent);
                setTickType(ascent.tickType);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    useEffect(() => {
        const route = routes.find(route => route.name === inputRouteName);

        if (route) {
            setInputRouteGrade(route.grade);
            setInputRouteColour(route.colour);
            setGradeDisabled(true);
            if (route._id === initialRouteId) {

                setShowFlash(isInitialRouteFirstAscent)
            } else {
                setShowFlash(false);
            }

        } else {
            setInputRouteGrade('');
            setInputRouteColour('')
            setGradeDisabled(false);
            setShowFlash(true)
        }
    }, [inputRouteName, routes, initialRouteId, isInitialRouteFirstAscent, showFlash]);

    return (
        <Grid container justifyContent="center" sx={{backgroundColor: '#FDFFC2'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    minHeight: '92vh',
                }}
            >
                <Paper sx={{ padding: 2,  maxWidth: { xs: '100%', sm: 500 } }}>
                    <Typography variant="h4" align="center" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}>
                        Edit Ascent
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    freeSolo
                                    options={routes}
                                    getOptionLabel={(option) => option ? option.name : ''}
                                    onInputChange={handleInputRouteNameChange}
                                    value={routes.find(route => route.name === inputRouteName) || ''}
                                    renderInput={(params) => <TextField {...params} label="Route" required fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="number"
                                    label="Grade Number"
                                    value={inputRouteGrade}
                                    onChange={(e) => setInputRouteGrade(e.target.value)}
                                    disabled={gradeDisabled}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required fullWidth >
                                    <InputLabel id="route-colour-label">Route Colour</InputLabel>
                                    <Select
                                        labelId="route-colour-label"
                                        value={inputRouteColour}
                                        onChange={handleInputRouteColourChange}
                                        disabled={gradeDisabled}
                                    >
                                        {popularColors.map((color) => (
                                            <MenuItem value={color} key={color}>
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 20,
                                                        backgroundColor: color,
                                                    }}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    value={tickType}
                                    exclusive
                                    onChange={handleTickTypeChange}
                                    aria-label="tick type"
                                    required
                                    fullWidth
                                >
                                    {!showFlash ? (
                                        <ToggleButton value="redpoint" aria-label="redpoint">
                                            <RedpointSVG />
                                        </ToggleButton>
                                    ) : (
                                        <ToggleButton value="flash" aria-label="flash">
                                            <FlashSVG />
                                        </ToggleButton>
                                    )}
                                    <ToggleButton value="hangdog" aria-label="hangdog">
                                        <HangdogSVG />
                                    </ToggleButton>
                                    <ToggleButton value="attempt" aria-label="attempt">
                                        <AttemptSVG />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Notes"
                                    multiline
                                    rows={3}
                                    value={notes}
                                    onChange={handleNotesChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Grid>
    );
};

export default EditAscentPage;