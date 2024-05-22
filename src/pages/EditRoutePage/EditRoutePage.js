import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Grid, InputLabel, Autocomplete, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import baseUrl from "../../utils/baseUrl";
import { useSnackbar } from "notistack";
import Template3 from "../../templates/Template3";
import { getAreas } from "../../apis/areas";

const popularColors = ['black', 'white', 'blue', 'red', 'gray', 'green', 'yellow', 'purple', 'orange', 'pink'];

const EditRoutePage = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [routeName, setRouteName] = useState('');
    const [routeGrade, setRouteGrade] = useState('');
    const [routeColour, setRouteColour] = useState('');
	const [routeAreaName, setRouteAreaName] = useState(null);
    const { id } = useParams()
    const navigate = useNavigate();

	const handleRouteAreaChange = (e, value) => {
		setRouteAreaName(value)
	}


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${baseUrl}/routes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setRouteName(response.data.name);
                setRouteGrade(response.data.grade);
                setRouteColour(response.data.colour);

				if (response.data.area) {
					setRouteAreaName(response.data.area.name);
				}
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

	const [areasData, setAreasData] = useState([]);
	useEffect(() => {
		const fetchAreasData = async () => {
			try {
				const areas = await getAreas();
				setAreasData(areas);
			} catch (error) {
				console.error(error);
			}
		}

		fetchAreasData();
	}, [])

    const handleSubmit = (e) => {
        e.preventDefault();


        const editedRoute = {
            name: routeName,
            grade: routeGrade,
            colour: routeColour,
        }

		if (routeAreaName && routeAreaName !== '') {
			editedRoute.area = { name: routeAreaName};
		}

        const token = localStorage.getItem('token');
        axios.put(`${baseUrl}/routes/${id}`, editedRoute, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                navigate('/routes');
                enqueueSnackbar('Route updated successfully', { variant: 'success'});
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to update route', { variant: 'error' });
            });

		
        
    };

    const handleNameChange = (e) => {
        setRouteName(e.target.value);
    }

    const handleGradeChange = (e) => {
        setRouteGrade(e.target.value);
    }

    const handleColourChange = (e) => {
        setRouteColour(e.target.value);
    }

    return (
        <Template3>
            <Paper sx={{ padding: 2, borderRadius: 4, m: 2, bgcolor: 'rgba(254, 250, 250, 0.95)' }}>
                <Typography variant="h4" align="center" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}>
                    Edit Route
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                label="Name"
                                value={routeName}
                                onChange={handleNameChange}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                label="Grade"
                                value={routeGrade}
                                onChange={handleGradeChange}
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
                                    value={routeColour}
                                    onChange={handleColourChange}
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
								<Autocomplete
									freeSolo
									options={areasData}
									getOptionLabel={(option) => option ? option.name : ''}
									onInputChange={handleRouteAreaChange}
									value={areasData.find(route => route.name === routeAreaName) || ''}
									renderInput={(params) => <TextField {...params} label="Route" fullWidth />}
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
}

export default EditRoutePage;