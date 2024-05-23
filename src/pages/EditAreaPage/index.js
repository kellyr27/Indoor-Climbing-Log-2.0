import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {  Grid, Paper,  TextField, Typography, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import Template3 from "../../templates/Template3";
import { getArea, editArea } from "../../services/apis";
import SaveIcon from '@mui/icons-material/Save';
import MyButton from "../../components/MyButton";
import IconWithText from "../../components/IconWithText";
import SteepnessIcon from "../../components/SteepnessIcon";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const EditAreaPage = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [areaName, setAreaName] = useState('');
	const [areaSteepnessTags, setAreaSteepnessTags] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate();

	const handleSteepnessTagsChange = (e, newSteepnessTags) => {
		setAreaSteepnessTags(newSteepnessTags);
	}

    useEffect(() => {

		const fetchAreaData = async () => {
			try {
				const data = await getArea(id);
				setAreaName(data.name);
				setAreaSteepnessTags(data.steepnessTags);
			} catch (error) {
				console.error(error);
			}
		}

		fetchAreaData();

    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

		// Order the steepnessTags by slab, vertical, overhung, roof
		areaSteepnessTags.sort((a, b) => {
			const order = ['slab', 'vertical', 'overhung', 'roof'];
			return order.indexOf(a) - order.indexOf(b);
		});

        const editedRoute = {
            name: areaName,
			steepnessTags: areaSteepnessTags
        }

		try {
			await editArea(id, editedRoute);
			navigate('/areas');
			enqueueSnackbar('Area updated successfully', { variant: 'success'});
		} catch (error) {
			console.error(error);
			enqueueSnackbar('Failed to update area', { variant: 'error' });
		}
        
    };

    const handleNameChange = (e) => {
        setAreaName(e.target.value);
    }


    return (
        <Template3>
            <Paper sx={{ padding: 2, borderRadius: 4, m: 2, bgcolor: 'rgba(254, 250, 250, 0.95)' }}>
                <Typography variant="h4" align="center" sx={{ mt: 1, mb: 3, fontWeight: 'bold' }}>
                    Edit Area
                </Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							type="text"
							label="Name"
							value={areaName}
							onChange={handleNameChange}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<ToggleButtonGroup
							value={areaSteepnessTags}
							onChange={handleSteepnessTagsChange}
							aria-label="tick type"
							required
							fullWidth
						>
							<Tooltip title="Slab">
								<ToggleButton value="slab" aria-label="slab">
										<SteepnessIcon steepness="slab" />
								</ToggleButton>
							</Tooltip>
							<Tooltip title="Vertical">
								<ToggleButton value="vertical" aria-label="vertical">
									<SteepnessIcon steepness="vertical" />
								</ToggleButton>
							</Tooltip>
							<Tooltip title="Overhung">
								<ToggleButton value="overhung" aria-label="overhung">
									<SteepnessIcon steepness="overhung" />
								</ToggleButton>
							</Tooltip>
							<Tooltip title="Roof">
								<ToggleButton value="roof" aria-label="roof">
									<SteepnessIcon steepness="roof" />
								</ToggleButton>
							</Tooltip>
						</ToggleButtonGroup>
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

export default EditAreaPage;