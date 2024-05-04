import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import baseUrl from "../../utils/baseUrl";
import { useSnackbar } from "notistack";

const popularColors = ['black', 'white', 'blue', 'red', 'gray', 'green', 'yellow', 'purple', 'orange', 'pink'];

const EditRoutePage = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [routeName, setRouteName] = useState('');
    const [routeGrade, setRouteGrade] = useState('');
    const [routeColour, setRouteColour] = useState('');
    const { id } = useParams()
    const navigate = useNavigate();


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
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const editedRoute = {
            name: routeName,
            grade: routeGrade,
            colour: routeColour,
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
                                <Button type="submit" variant="contained" fullWidth>Save Changes</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Grid>
    );
}

export default EditRoutePage;