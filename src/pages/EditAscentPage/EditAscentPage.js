import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Autocomplete, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AttemptSVG, FlashSVG, RedpointSVG, HangdogSVG } from '../../assets/tickTypeIcons/index';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import baseUrl from '../../utils/baseUrl';
import { useSnackbar } from 'notistack';
import Template3 from '../../templates/Template3';
import { getAreas, getRoutes, editAscent } from '../../services/apis';
import {sortAreasAscendingName} from '../../services/dataManipulation';

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
	const [inputRouteAreaName, setInputRouteAreaName] = useState('');
    const [tickType, setTickType] = useState('');
    const [routes, setRoutes] = useState([]);
    const [gradeDisabled, setGradeDisabled] = useState(false);
    const [isInitialRouteFirstAscent, setIsInitialRouteFirstAscent] = useState(false);
    const [initialRouteId, setInitialRouteId] = useState(null);
    const [showFlash, setShowFlash] = useState(false);

	const [areasData, setAreasData] = useState([]);
	useEffect(() => {
		const fetchAreasData = async () => {
			try {
				const areas = await getAreas();
				const sortedAreas = sortAreasAscendingName(areas);
				setAreasData(sortedAreas);
			} catch (error) {
				console.error(error);
			}
		}

		fetchAreasData();
	}, [])

	const handleInputRouteAreaChange = (e, value) => {
        setInputRouteAreaName(value);
    };

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

    // const handleInputRouteGradeChange = (e) => {
    //     setInputRouteGrade(e.target.value);
    // };

    const handleInputRouteColourChange = (e) => {
        setInputRouteColour(e.target.value);
    }

    const handleTickTypeChange = (e, newTickType) => {
        setTickType(newTickType);
    };

    const handleSubmit = async (e) => {
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

		if (inputRouteAreaName && inputRouteAreaName !== '') {
			newAscent.route.area = { name: inputRouteAreaName };
		}

		try {
			await editAscent(id, newAscent);
			navigate('/ascents');
            enqueueSnackbar('Ascent updated successfully', { variant: 'success' });
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Failed to update ascent', { variant: 'error' });
		}

    };

    useEffect(() => {

		// Fetch the ascents data from the server
        const fetchRoutesData = async () => {
            try {
				const data = await getRoutes();
                setRoutes(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchRoutesData()

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

				if (ascent.route.area) {
					setInputRouteAreaName(ascent.route.area.name);
				} else {
					setInputRouteAreaName(null);
				}
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
        <Template3>
            <Paper sx={{ padding: 2, borderRadius: 4, m: 2, bgcolor: 'rgba(254, 250, 250, 0.95)' }}>
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
								inputProps={{
									max: new Date().toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})
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
							{!gradeDisabled && <Autocomplete
								freeSolo
								options={areasData}
								getOptionLabel={(option) => option.name}
								onInputChange={handleInputRouteAreaChange}
								renderInput={(params) => <TextField {...params} label="Route Area" required fullWidth />}
							/>}
							{gradeDisabled && <TextField
								label="Route Area"
								value={inputRouteAreaName ? inputRouteAreaName : ''}
								disabled
								fullWidth
							/>}
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
                            <Button type="submit" variant="contained" fullWidth sx={{borderRadius: 3}}>Save Changes</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Template3>
    );
};

export default EditAscentPage;