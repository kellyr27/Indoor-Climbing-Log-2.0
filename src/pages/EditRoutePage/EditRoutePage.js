import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Box,  FormControl, Grid, InputLabel, Autocomplete, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import Template3 from "../../templates/Template3";
import { editRoute, getRoute, getAreas } from "../../services/apis";
import SaveIcon from '@mui/icons-material/Save';
import MyButton from "../../components/MyButton";
import IconWithText from "../../components/IconWithText";
import {sortAreasAscendingName} from '../../services/dataManipulation';
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

		const fetchRouteData = async () => {
			try {
				const data = await getRoute(id);
				setRouteName(data.name);
                setRouteGrade(data.grade);
                setRouteColour(data.colour);

				if (data.area) {
					setRouteAreaName(data.area.name);
				}
			} catch (error) {
				console.error(error);
			}
		}

		fetchRouteData();

    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();


        const editedRoute = {
            name: routeName,
            grade: routeGrade,
            colour: routeColour,
        }

		if (routeAreaName && routeAreaName !== '') {
			editedRoute.area = { name: routeAreaName};
		}

		try {
			await editRoute(id, editedRoute);
			navigate('/routes');
			enqueueSnackbar('Route updated successfully', { variant: 'success'});
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Failed to update route', { variant: 'error' });
		}
        
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
						<MyButton
							buttonText={
								<IconWithText 
									icon={<SaveIcon/>}
									text="Save Changes"
								/>
							}
							color="primary"
							handleClick={handleSubmit}
							fullWidth
						/>
					
					</Grid>
				</Grid>
            </Paper>
        </Template3>
    );
}

export default EditRoutePage;