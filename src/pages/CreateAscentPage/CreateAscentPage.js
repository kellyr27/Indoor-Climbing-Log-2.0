import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../assets/tickTypeIcons/index';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../utils/baseUrl';
import { useSnackbar } from 'notistack';
import Template3 from '../../templates/Template3';

const popularColors = ['black', 'white', 'blue', 'red', 'gray', 'green', 'yellow', 'purple', 'orange', 'pink'];

const CreateAscentPage = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [notes, setNotes] = useState('');
    const [inputRouteName, setInputRouteName] = useState('');
    const [inputRouteGrade, setInputRouteGrade] = useState('');
    const [inputRouteColour, setInputRouteColour] = useState('');
    const [tickType, setTickType] = useState('');
    const [gradeDisabled, setGradeDisabled] = useState(false);

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
        axios.post(`${baseUrl}/ascents`, newAscent, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                navigate('/ascents');
                enqueueSnackbar('Ascent created successfully', { variant: 'success'})
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to create ascent', { variant: 'error' });
            });
        
    };

    // Fetch routes from API when loading the page for the Autocomplete component
    const [routesData, setRoutesData] = useState([]);
    useEffect(() => {

        // Fetch the ascents data from the server
        const fetchRoutesData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/routes`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRoutesData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchRoutesData()


    }, []);

    // Fetch the prefill date from the server
    useEffect(() => {
        const fetchPrefillAscentDateData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}/ascents/prefill-ascent-date`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const isoDate = response.data.date;
            setDate(isoDate.split('T')[0]);
        }
        fetchPrefillAscentDateData()

    }, []);

    // Prefill the route grade and colour if the route name is selected
    useEffect(() => {
        const route = routesData.find(route => route.name === inputRouteName);
        if (route) {
            setInputRouteGrade(route.grade);
            setInputRouteColour(route.colour);
            setGradeDisabled(true);
        } else {
            setInputRouteGrade('');
            setInputRouteColour('')
            setGradeDisabled(false);
        }
    }, [inputRouteName, routesData]);

    return (
        <Template3>
            <Paper sx={{ padding: 2,  borderRadius: 4 }}>
                <Typography variant="h4" align="center" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}>
                    Create New Ascent
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
                                options={routesData}
                                getOptionLabel={(option) => option.name}
                                onInputChange={handleInputRouteNameChange}
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
                                inputProps={{min: 10, max: 40}}
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
                                                    width: 80,
                                                    height: 20,
                                                    backgroundColor: color,
                                                    border: '1px solid black',
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
                                {gradeDisabled ? (
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
                            <Button type="submit" variant="contained" fullWidth sx={{borderRadius: 3}}>Create Ascent</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Template3>
    );
};

export default CreateAscentPage;